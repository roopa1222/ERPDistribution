import { Request, Response, NextFunction } from "express";
import { addDailyExpenceSchema, updateDailyExpenceSchema } from "../validator/dailyExpence";
import { getBranchById } from "../utils/branch";
import ApiError from "../utils/api-error";
import { createDailyExpence, updateDailyExpence } from "../utils/dailyExpence";

export default class DailyExpenceController {

  static addDailyExpence = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await addDailyExpenceSchema.validateAsync(req.body);

      const branch = await getBranchById(result.branchId);
      if (!branch) return next(ApiError.customError(404, 'Branch Not Found'));

      const addExpence = await createDailyExpence(result);
      if(!addExpence) return next(ApiError.customError(422, 'Daily Expense Not Created'));

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

      const dailyExpence = await updateDailyExpence(result.id, result);
      if (!dailyExpence) return next(ApiError.customError(422, 'Daily Expence Not Updated'));

      return res.status(200).json({ status: 200, data: { message: 'updated successfully' }, error: null });

    } catch(e){
      return next(e);
    }
  };
}