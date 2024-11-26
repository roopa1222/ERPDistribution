import { Request, Response, NextFunction } from "express";
import { addDailyexpenseSchema, updateDailyexpenseSchema } from "../validator/dailyExpense";
import { getBranchById } from "../utils/branch";
import ApiError from "../utils/api-error";
import { createDailyexpense, updateDailyexpense } from "../utils/dailyExpense";
import { IRoles, IUser } from "../types/user";

export default class DailyexpenseController {

  static addDailyexpense = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await addDailyexpenseSchema.validateAsync(req.body);

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
      const result = await updateDailyexpenseSchema.validateAsync(req.body);
        
      const branch = await getBranchById(result.branchId);
      if (!branch) return next(ApiError.customError(404, 'Branch Not Found'));

      const dailyexpense = await updateDailyexpense(result.id, result);
      if (!dailyexpense) return next(ApiError.customError(422, 'Daily Expense Not Updated'));

      return res.status(200).json({ status: 200, data: { message: 'updated successfully' }, error: null });

    } catch(e){
      return next(e);
    }
  };
}