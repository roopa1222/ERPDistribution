import mongoose, { Schema, Document, Types } from 'mongoose';
import { ICategoryType, IDsrInvoice, IPaymentDetail, IPaymentMode } from "../../types/dsrInvoice";

// Define the schema for payment details
const paymentDetailSchema = new Schema<IPaymentDetail>({
  mode: { type: String, enum: Object.values(IPaymentMode), required: true },
  amount: { type: Number, required: true },
});

// Define the main schema for invoices
const dsrInvoiceSchema = new Schema<IDsrInvoice>({
  productName: { type: String, required: true },
  paymentMode: { type: [String], enum: IPaymentMode, required: true },
  paymentDetails: { type: [paymentDetailSchema], required: true }, // Use the embedded schema
  customerName: { type: String },
  customerMobileNo: { type: String},
  financeDetails: { type: [String]},
  totalAmount: { type: Number, required: true },
  serialNo: { type: String},
  categoryType: { type: String, enum : ICategoryType, required: true },
  branchId: { type: mongoose.Schema.Types.ObjectId, ref: 'branch' },
}, { timestamps: true });

// Define the model
const dsrInvoiceModel = mongoose.model<IDsrInvoice>('dsrInvoice', dsrInvoiceSchema);

export default dsrInvoiceModel;
