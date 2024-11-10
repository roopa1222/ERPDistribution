import { Request, Response, NextFunction } from "express";
import { createDsrInvoiceSchema, updateDsrInvoiceSchema } from "../validator/dsrInvoice";
import { createDsrInvoice, updateDsrInvoice } from "../utils/dsrInvoice";
import ApiError from "../utils/api-error";
import { getBranchById } from "../utils/branch";


export default class DsrInvoiceController {

  static createDsrInvoice = async (req: Request, res: Response, next: NextFunction) => {
    try{
      const result = await createDsrInvoiceSchema.validateAsync(req.body);

      const branch = await getBranchById(result.branchId);
      if (!branch) return next(ApiError.customError(404, 'Branch Not Found'));

      const addDsrInvoice = await createDsrInvoice(result);
      if (!addDsrInvoice) return next(ApiError.customError(422, 'DSR Invoice Not Created'));

      return res.status(200).json({ status: 200, data: { message: 'User Created Successfully.' }, error: null });

    } catch (e) {
      next(e);
    }
  };

  static updateDsrInvoice = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await updateDsrInvoiceSchema.validateAsync(req.body);

      const branch = await getBranchById(result.branchId);
      if (!branch) return next(ApiError.customError(404, 'Branch Not Found'));

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