import Joi from "joi";
import { IPaymentMode } from "../types/dsrInvoice";

const paymentDetailSchema = Joi.object({
  paymentMode: Joi.string().valid(...Object.values(IPaymentMode)).required(), // Enum validation for payment mode
  amount: Joi.number().required(), // Amount is required
});

export const createDsrInvoiceSchema = Joi.object({
  productName: Joi.string().required(),
  productCode: Joi.string().optional(),
  paymentMode: Joi.array().items(Joi.string().valid(...Object.values(IPaymentMode))).required(), // This allows an array of payment modes
  paymentDetails: Joi.array().items(paymentDetailSchema).required(), // Array of payment details
  financeName: Joi.string().optional(),
  customerName: Joi.string().optional(),
  customerMobileNo: Joi.number().optional(),
  total: Joi.number().optional(),
  branchId: Joi.string().optional(),
});

export const updateDsrInvoiceSchema = Joi.object({
  id: Joi.string().required(),
  productName: Joi.string().required(),
  productCode: Joi.string().optional(),
  paymentMode: Joi.array().items(Joi.string().valid(...Object.values(IPaymentMode))).required(), // This allows an array of payment modes
  paymentDetails: Joi.array().items(paymentDetailSchema).required(), // Array of payment details
  financeName: Joi.string().optional(),
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