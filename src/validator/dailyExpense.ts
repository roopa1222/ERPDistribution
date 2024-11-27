import Joi from "joi";

export const addDailyExpenceSchema = Joi.object({
  expenseName: Joi.string().optional(),
  expenseAmount: Joi.number().optional(),
  openingBalance: Joi.number().optional(),
  closingBalance: Joi.number().optional(),
  branchId: Joi.string().optional(),
});

export const updateDailyExpenceSchema = Joi.object({
  expenseName: Joi.string().optional(),
  expenseAmount: Joi.number().optional(),
  openingBalance: Joi.number().optional(),
  closingBalance: Joi.number().optional(),
  branchId: Joi.string().optional(),
  id: Joi.string().required(),
});