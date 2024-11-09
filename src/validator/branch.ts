import Joi from "joi";

export const addBranchSchema = Joi.object({
  branchName: Joi.array().items(Joi.string()).required(),
});