import { Request, Response, NextFunction } from "express";
import {  addDailyExpenceSchema, updateDailyExpenceSchema } from "../validator/dailyExpense";
import { getBranchById } from "../utils/branch";
import ApiError from "../utils/api-error";
import { createDailyexpense, updateDailyexpense, getDailyExpenseDetails } from "../utils/dailyExpense";
import { IRoles, IUser } from "../types/user";
import { getDsrInvoiceSchema } from "../validator/dsrInvoice";

export default class DailyexpenseController {

  static addDailyexpense = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await addDailyExpenceSchema.validateAsync(req.body);
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
 

      const addexpense = await createDailyexpense(result);
      if(!addexpense) return next(ApiError.customError(422, 'Daily Expense Not Created'));

      return res.status(200).json({ status: 200, data: { message: 'Created Successfully.' }, error: null });

        
    } catch (error) {
      return next(error);
    }
  };

  static updateDailyExepnce = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await updateDailyExpenceSchema.validateAsync(req.query);
        
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

      const dailyexpense = await updateDailyexpense(result.id, result);
      if (!dailyexpense) return next(ApiError.customError(422, 'Daily Expense Not Updated'));

      return res.status(200).json({ status: 200, data: { message: 'updated successfully' }, error: null });

    } catch(e){
      return next(e);
    }
  };

  static getDailyExpenseDetails = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await getDsrInvoiceSchema.validateAsync(req.query);
        console.log('srep-2', result)
        const user = req.user as IUser;
        // Check if the user has the role of SALESMAN, and handle branchId from token if necessary
        if (user.role === IRoles.SALESMAN) {
         const branchIdFromToken = user.branchId;
         result.branchId = branchIdFromToken;
       } else {
        if (!req.body.branchId) return next(ApiError.customError(422, 'branch is required'));
        const branch = await getBranchById(result.branchId);
        if (!branch) return next(ApiError.customError(404, 'Branch Not Found'));
       }
       console.log('step01')
       const getDailyExpense = await getDailyExpenseDetails(result.branchId, result.from, result.to);
       if (!getDailyExpense) return next(ApiError.customError(404, 'Daily Expense Not Found'));

       return res.status(200).json({ status: 200, data: getDailyExpense, error: null });
    } catch (e) {
      next(e);
        }
  }
}