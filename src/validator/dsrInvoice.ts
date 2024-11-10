import Joi from "joi";
import { IPaymentMode } from "../types/dsrInvoice";

export const createDsrInvoiceSchema = Joi.object({
  productName: Joi.string().required(),
  productCode: Joi.string().optional(),
  paymentMode: Joi.array().items(Joi.string().valid(...Object.values(IPaymentMode))).required(), // This allows an array of payment modes
  amount: Joi.number().optional(),
  customerName: Joi.string().optional(),
  customerMobileNo: Joi.number().optional(),
  total: Joi.number().optional(),
  branchId: Joi.string().required(),
});

export const updateDsrInvoiceSchema = Joi.object({
  id: Joi.string().required(),
  productName: Joi.string().required(),
  productCode: Joi.string().optional(),
  paymentMode: Joi.array().items(Joi.string().valid(...Object.values(IPaymentMode))).required(), // This allows an array of payment modes
  amount: Joi.number().optional(),
  customerName: Joi.string().optional(),
  customerMobileNo: Joi.number().optional(),
  total: Joi.number().optional(),
  branchId: Joi.string().required(),
});

export const getDsrInvoiceSchema = Joi.object({
  branchId: Joi.string().required(),
  from: Joi.string().optional(),
  to: Joi.string().optional(),
});