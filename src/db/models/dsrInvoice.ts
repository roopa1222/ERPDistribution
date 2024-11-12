import mongoose, { Schema } from "mongoose";
import { IDsrInvoice , IPaymentMode} from "../../types/dsrInvoice";


export const dsrInvoiceSchema = new Schema<IDsrInvoice>({
  productName: { type: String, required: true },
  paymentMode: { type: [String], enum: IPaymentMode, required: true },
  customerName: { type: String, required: true },
  CustomerMobileNo: { type: String, required: true },
  amount: { type: Number, required: true },
  total: { type: Number, required: true },
  expence: { type: String, required: true }, 
  expenceAmount: { type: Number, required: true },
  productCode: { type: String, required: true},
  branchId: { type: mongoose.Schema.Types.ObjectId, ref: 'branch' }}, { timestamps: true });
  
const dsrInvoiceModel = mongoose.model<IDsrInvoice>('dsrInvoice', dsrInvoiceSchema);
console.log('DSR Invoice Model Created Successfully');

export default dsrInvoiceModel;
  