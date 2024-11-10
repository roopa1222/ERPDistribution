import Joi from "joi";

export const addDailyExpenceSchema = Joi.object({
  expenceNarration: Joi.string().optional(),
  expenceAmount: Joi.number().optional(),
  openingBalance: Joi.number().optional(),
  closingBalance: Joi.number().optional(),
  branchId: Joi.string().optional(),
});

export const updateDailyExpenceSchema = Joi.object({
  expenceNarration: Joi.string().optional(),
  expenceAmount: Joi.number().optional(),
  openingBalance: Joi.number().optional(),
  closingBalance: Joi.number().optional(),
  branchId: Joi.string().optional(),
  id: Joi.string().required(),
});