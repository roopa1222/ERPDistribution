import { Request, Response, NextFunction } from "express";
import { addDailyExpenceSchema, updateDailyExpenceSchema } from "../validator/dailyExpense";
import { getBranchById } from "../utils/branch";
import ApiError from "../utils/api-error";
import { createDailyexpense, updateDailyexpense } from "../utils/dailyExpense";

export default class DailyexpenseController {

  static addDailyexpense = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await addDailyExpenceSchema.validateAsync(req.body);

      const branch = await getBranchById(result.branchId);
      if (!branch) return next(ApiError.customError(404, 'Branch Not Found'));

      const addexpense = await createDailyexpense(result);
      if(!addexpense) return next(ApiError.customError(422, 'Daily Expense Not Created'));

      return res.status(200).json({ status: 200, data: { message: 'Created Successfully.' }, error: null });

        
    } catch (error) {
      return next(error);
    }
  };

  static updateDailyExepnce = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await updateDailyExpenceSchema.validateAsync(req.body);
        
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