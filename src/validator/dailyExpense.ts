import Joi from "joi";
import { IExpense } from "../types/dailyExpense";

export const addDailyExpenceSchema = Joi.object({
  expenseName: Joi.string().optional(),
  expenseAmount: Joi.number().optional(),
  openingBalance: Joi.number().optional(),
  closingBalance: Joi.number().optional(),
  branchId: Joi.string().optional(),
  expenseType: Joi.string().valid(...Object.values(IExpense)).required(),
});

export const updateDailyExpenceSchema = Joi.object({
  expenseName: Joi.string().optional(),
  expenseAmount: Joi.number().optional(),
  openingBalance: Joi.number().optional(),
  closingBalance: Joi.number().optional(),
  branchId: Joi.string().optional(),
  id: Joi.string().required(),
  expenseType: Joi.string().valid(...Object.values(IExpense)).required(),
});