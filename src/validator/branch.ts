import Joi from "joi";

export const addBranchSchema = Joi.object({
  branchName: Joi.string().required(),
});

export const bulkBranchSchema = Joi.array().items(addBranchSchema).required();