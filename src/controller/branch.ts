import { Request, Response, NextFunction } from "express";
import { createBranches, getAllBranches } from "../utils/branch";
import ApiError from "../utils/api-error";
import { addBranchSchema, bulkBranchSchema } from "../validator/branch";

export default class BranchController {

  static getAllBranch = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const getBranches = await getAllBranches();
      if (!getBranches) return next(ApiError.customError(422, 'Branches not found.'));
      return res.status(200).json({ status: 200, data: getBranches, error: null });

    } catch (e) {
      return next(e);
    }
  };

  static addBraches = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await bulkBranchSchema.validateAsync(req.body);
      for (let i = 0; i < result.length; i += 1) {
        const createBranch = await createBranches({ branchName: result[i].branchName });
        if (!createBranch) return next(ApiError.customError(422, 'Branch not created.'));
      }
      return res.status(200).json({ status: 200, data: { message: 'Branch Created Successfully.' }, error: null });
    }  catch (e) {
      return next(e);
    }

  };
}