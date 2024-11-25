import Joi from "joi";

export const addDailyexpenseSchema = Joi.object({
  expenseNarration: Joi.string().optional(),
  expenseAmount: Joi.number().optional(),
  openingBalance: Joi.number().optional(),
  closingBalance: Joi.number().optional(),
  branchId: Joi.string().optional(),
});

export const updateDailyexpenseSchema = Joi.object({
  expenseNarration: Joi.string().optional(),
  expenseAmount: Joi.number().optional(),
  openingBalance: Joi.number().optional(),
  closingBalance: Joi.number().optional(),
  branchId: Joi.string().optional(),
  id: Joi.string().required(),
});