import Joi from "joi";
import { ICategoryType, IPaymentMode } from "../types/dsrInvoice";

const paymentDetailSchema = Joi.object({
  mode: Joi.string().valid(...Object.values(IPaymentMode)).required(), // Enum validation for payment mode
  amount: Joi.number().required(), // Amount is required
});

const financeDetailSchema = Joi.object({
  financeName: Joi.string().optional().allow('').allow(null), // Enum validation for payment mode
  amount: Joi.number().required(), // Amount is required
});

export const createDsrInvoiceSchema = Joi.object({
  productName: Joi.string().required(),
  serialNo: Joi.string().optional().allow('').allow(null),
  paymentMode: Joi.array().items(Joi.string().valid(...Object.values(IPaymentMode))).required(), // This allows an array of payment modes
  paymentDetails: Joi.array().items(paymentDetailSchema).required(), // Array of payment details
  financeDetails: Joi.array().items(financeDetailSchema).optional().allow(null).allow(''),
  customerName: Joi.string().optional().allow(null).allow(''),
  customerMobileNo: Joi.number().optional().allow(null).allow(''),
  totalAmount: Joi.number().optional(),
  categoryType: Joi.string().valid(...Object.values(ICategoryType)).required(),
  branchId: Joi.string().optional().allow(null).allow('')
});

export const updateDsrInvoiceSchema = Joi.object({
  id: Joi.string().required(),
  productName: Joi.string().required(),
  productCode: Joi.string().optional(),
  paymentMode: Joi.array().items(Joi.string().valid(...Object.values(IPaymentMode))).required(), // This allows an array of payment modes
  paymentDetails: Joi.array().items(paymentDetailSchema).required(), // Array of payment details
  financeDetails: Joi.array().items(paymentDetailSchema).optional().allow(null).allow(''),
  customerName: Joi.string().optional(),
  customerMobileNo: Joi.number().optional(),
  totalAmount: Joi.number().optional(),
  categoryType: Joi.string().valid(...Object.values(ICategoryType)).required(),
  branchId: Joi.string().required(),
});

export const getDsrInvoiceSchema = Joi.object({
  branchId: Joi.string().required(),
  from: Joi.string().optional(),
  to: Joi.string().optional(),
});