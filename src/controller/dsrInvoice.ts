import { Request, Response, NextFunction } from "express";
import { createDsrInvoiceSchema, getDashBoardCountSchema, getDsrInvoiceSchema, updateDsrInvoiceSchema } from "../validator/dsrInvoice";
import { createDsrInvoice, getAccessoriesCount, getAllDsrInvoice, getElectronicCount, getMobileCount, updateDsrInvoice } from "../utils/dsrInvoice";
import ApiError from "../utils/api-error";
import { getBranchById } from "../utils/branch";
import { IRoles, IUser } from "../types/user";
import jsonToExcel from '../utils/excel';


export default class DsrInvoiceController {

  static createDsrInvoice = async (req: Request, res: Response, next: NextFunction) => {
    try{
      const result = await createDsrInvoiceSchema.validateAsync(req.body);

       const user = req.user as IUser;
       
     // Check if the user has the role of SALESMAN, and handle branchId from token if necessary
     if (user?.role === IRoles.SALESMAN) {
      const branchIdFromToken = user.branchId;
      result.branchId = branchIdFromToken;
    } else { 
      if (!req.body.branchId) return next(ApiError.customError(422, 'branch is required'));
      const branch = await getBranchById(result.branchId);
      if (!branch) return next(ApiError.customError(404, 'Branch Not Found'));
    }
      console.log('result', result)
      const addDsrInvoice = await createDsrInvoice(result);
      if (!addDsrInvoice) return next(ApiError.customError(422, 'DSR Invoice Not Created'));

      return res.status(200).json({ status: 200, data: { message: 'DSR Invoice Created Successfully.' }, error: null });

    } catch (e) {
      next(e);
    }
  };

  static updateDsrInvoice = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await updateDsrInvoiceSchema.validateAsync(req.body);
    
      const user = req.user as IUser;
      // Check if the user has the role of SALESMAN, and handle branchId from token if necessary
      if (user?.role === IRoles.SALESMAN) {
       const branchIdFromToken = user.branchId;
       result.branchId = branchIdFromToken;
     } else {
      if (!req.body.branchId) return next(ApiError.customError(422, 'branch is required'));
      const branch = await getBranchById(result.branchId);
      if (!branch) return next(ApiError.customError(404, 'Branch Not Found'));
     }
 
      const dsrInvoice = await updateDsrInvoice(result.id, result);
      if (!dsrInvoice) return next(ApiError.customError(422, 'DSR Invoice Not Updated'));

      return res.status(200).json({ status: 200, data: {message: 'DSR Invoice Updated Successfully.'}, error: null});

    } catch(e) {
      return next(e);
    }
  };

   static getDsrInvoiceDetails = async (req: Request, res: Response, next: NextFunction) => {
    try {
      
        const result = await getDsrInvoiceSchema.validateAsync(req.query);
        const user = req.user as IUser;

        if (user?.role === IRoles.SALESMAN) {
          const branchIdFromToken = user.branchId;
          result.branchId = branchIdFromToken;
        } 

        const dsrData = await getAllDsrInvoice(result.branchId, result.startDate, result.endDate,parseInt(result.limit,10),parseInt(result.offset,10))
        
        return res.status(200).json({ status: 200, dsrData, error: null});
      } catch(e) {
      return next(e);
    }
   }

  static getDSRInvoiceExcelData = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await getDashBoardCountSchema.validateAsync(req.query);

      const user = req.user as IUser;;
      if (user?.role === IRoles.SALESMAN) {
        const branchIdFromToken = user.branchId;
        result.branchId = branchIdFromToken;
      }

      const dsrData = await getAllDsrInvoice(result.branchId, result.startDate, result.endDate);
    
      const formattedData = dsrData?.dsrData?.flatMap(item => {
        const baseData = {
          productName: item.productName,
          serialNo: item.serialNo,
          category: item.category,
          totalAmount: item.totalAmount,
          branchName: item.branchName,
          createdAt: item.createdAt,
          customerName: item.customerName,
          customerMobileNo: item.customerMobileNo,
        };

  // Flatten paymentDetails
  const paymentColumns: any = {};
  if (Array.isArray(item.paymentDetails)) {
    item.paymentDetails.forEach((payment: any, index:any) => {
      paymentColumns[`paymentMode_${index + 1}`] = payment.mode || null;
      paymentColumns[`paymentAmount_${index + 1}`] = payment.amount || null;
    });
  }

  // Flatten financeDetails
  const financeColumns: any = {};
  if (Array.isArray(item.financeDetails)) {
    item.financeDetails.forEach((finance: any, index: any) => {
      financeColumns[`financeType_${index + 1}`] = finance.financeName || null;
      financeColumns[`financeAmount_${index + 1}`] = finance.amount || null;
    });
  }

  // Merge all data
  return {
    ...baseData,
    ...paymentColumns,
    ...financeColumns,
  };
});

console.log('Formatted Data:', formattedData);
      
      const excelBuffer = jsonToExcel(formattedData);

      res.set('Content-Disposition', `attachment; filename=DSR_DATA.xlsx`);
      res.type('application/octet-stream');
      return res.send(excelBuffer);

    } catch (e) {
      next(e);
    }
  };

  static getDashBoardCountData = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await getDashBoardCountSchema.validateAsync(req.query);
      const user = req.user as IUser;

      if (user?.role === IRoles.SALESMAN) {
        const branchIdFromToken = user.branchId;
        result.branchId = branchIdFromToken;
      }

      const mobileCount = await getMobileCount(result.branchId, result.from, result.to);
      const accessoriesCount = await getAccessoriesCount(result.branchId, result.startDate, result.endDate);
      const electronicCount = await getElectronicCount(result.branchId, result.from, result.to);

      const dashBoardCount = {
       mobileCount,
       accessoriesCount,
       electronicCount,
      }
      
      return res.status(200).json({ status: 200, dashBoardCount, error: null});
    } catch (e) {
      return next(e);
    }
  }
}