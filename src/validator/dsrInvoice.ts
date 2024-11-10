import Joi from "joi";
import { IPaymentMode } from "../types/dsrInvoice";

export const createDsrInvoiceSchema = Joi.object({
  productName: Joi.string().required(),
  productCode: Joi.string().optional(),
  paymentMode: Joi.string().valid(...Object.values(IPaymentMode)).required(),
  amount: Joi.number().optional(),
  customerName: Joi.string().optional(),
  CustomerMobileNo: Joi.number().optional(),
  total: Joi.number().optional(),
  expence: Joi.number().optional(),
  expenceAmount: Joi.number().optional(),
  branchId: Joi.string().required(),
});

export const updateDsrInvoiceSchema = Joi.object({
  id: Joi.number().required(),
  productName: Joi.string().required(),
  productCode: Joi.string().optional(),
  paymentMode: Joi.string().valid(...Object.values(IPaymentMode)).required(),
  amount: Joi.number().optional(),
  customerName: Joi.string().optional(),
  CustomerMobileNo: Joi.number().optional(),
  total: Joi.number().optional(),
  expence: Joi.number().optional(),
  expenceAmount: Joi.number().optional(),
  branchId: Joi.string().required(),
});

export const getDsrInvoiceSchema = Joi.object({
  branchId: Joi.string().required(),
  from: Joi.string().optional(),
  to: Joi.string().optional(),
});