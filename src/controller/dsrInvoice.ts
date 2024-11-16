import { Request, Response, NextFunction } from "express";
import { createDsrInvoiceSchema, getDsrInvoiceSchema, updateDsrInvoiceSchema } from "../validator/dsrInvoice";
import { createDsrInvoice, updateDsrInvoice } from "../utils/dsrInvoice";
import ApiError from "../utils/api-error";
import { getBranchById } from "../utils/branch";
import { IRoles, IUser } from "../types/user";
import { CustomRequest } from "../middlewares/auth";


export default class DsrInvoiceController {

  static createDsrInvoice = async (req: CustomRequest, res: Response, next: NextFunction) => {
    try{
      const result = await createDsrInvoiceSchema.validateAsync(req.body);

       const user = req.user

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

  static updateDsrInvoice = async (req: CustomRequest, res: Response, next: NextFunction) => {
    try {
      const result = await updateDsrInvoiceSchema.validateAsync(req.body);
    
      const user = req.user
      // Check if the user has the role of SALESMAN, and handle branchId from token if necessary
      if (user?.role === IRoles.SALESMAN) {
       const branchIdFromToken = user.branchId;
       result.branchId = branchIdFromToken;
     } else {
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

  //  static getDsrInvoiceDetails = async (req: Request, res: Response, next: NextFunction) => {
  //   try {
  //       const result = await getDsrInvoiceSchema.validateAsync(req.query);
  //       const branch = await getBranchById(result.branchId);
  //       if (!branch) return next(ApiError.customError(404, 'Branch Not Found'));
        
  //       return res.status(200).json({ status: 200, data: {message: 'DSR Invoice Updated Successfully.'}, error: null});
  //     } catch(e) {
  //     return next(e);
  //   }
  //  }

  static getDSRInvoiceExcelData = async (req: Request, res: Response, next: NextFunction)=>{

    try {
      // const result = await getDsrInvoiceSchema.validateAsync(req.query);
      //       const branch = await getBranchById(result.branchId);
      //       if (!branch) return next(ApiError.customError(404, 'Branch Not Found'));
    } catch (e){
      next (e);
    }
  };
}