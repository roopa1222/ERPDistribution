import { Request, Response, NextFunction } from "express";
import { createDsrInvoiceSchema, getDsrInvoiceSchema, updateDsrInvoiceSchema } from "../validator/dsrInvoice";
import { createDsrInvoice, getAccessoriesCount, getAllDsrInvoice, getElectronicCount, getMobileCount, updateDsrInvoice } from "../utils/dsrInvoice";
import ApiError from "../utils/api-error";
import { getBranchById } from "../utils/branch";
import { IRoles, IUser } from "../types/user";
import jsonToExcel from '../utils/excel';


export default class DsrInvoiceController {

  static createDsrInvoice = async (req: Request, res: Response, next: NextFunction) => {
    try{
      const result = await createDsrInvoiceSchema.validateAsync(req.body);

       const user = req.user as IUser;;
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
        const dsrData = await getAllDsrInvoice(result.branchId, result.startDate, result.endDate)
        
        return res.status(200).json({ status: 200, data: {dsrData}, error: null});
      } catch(e) {
      return next(e);
    }
   }

  static getDSRInvoiceExcelData = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await getDsrInvoiceSchema.validateAsync(req.query);

      const user = req.user as IUser;;
      if (user?.role === IRoles.SALESMAN) {
        const branchIdFromToken = user.branchId;
        result.branchId = branchIdFromToken;
      }

      const dsrData = await getAllDsrInvoice(result.branchId, result.startDate, result.endDate);
      
      // Format the data for Excel with separate rows for each payment detail
      const formattedData = dsrData.flatMap(item => {
        // Create base data without payment details
        const baseData = {
          productName: item.productName,
          customerName: item.customerName,
          customerMobileNo: item.customerMobileNo,
          totalAmount: item.totalAmount,
          serialNo: item.serialNo,
          category: item.category,
          branchName: item.branchName,
          createdAt: item.createdAt,
          financeDetails: JSON.stringify(item.financeDetails)
        };

        // Create a separate row for each payment detail
      //   return item.paymentDetails.map((payment: { mode: any; amount: any; }) => ({
      //     ...baseData,
      //     paymentMode: payment.mode,
      //     paymentAmount: payment.amount
      //   }));
      });

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
      const result = await getDsrInvoiceSchema.validateAsync(req.query);
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