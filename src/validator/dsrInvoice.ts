import Joi from "joi";
import { IPaymentMode } from "../types/dsrInvoice";

export const createDsrInvoiceSchema = Joi.object({
   productName: Joi.string().required(),
   productCode: Joi.string().optional(),
   paymentMode: Joi.string().valid(...Object.values(IPaymentMode)).required(),
   

});