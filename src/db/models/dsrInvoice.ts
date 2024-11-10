import mongoose, { Schema } from "mongoose";
import { IDsrInvoice , IPaymentMode} from "../../types/dsrInvoice";


export const dsrInvoiceSchema = new Schema<IDsrInvoice>({
  productName: { type: String, required: true },
  paymentMode: { type: String, enum: IPaymentMode, required: true },
  customerName: { type: String, required: true },
  CustomerMobileNo: { type: String, required: true },
  amount: { type: Number, required: true },
  total: { type: Number, required: true },
  expence: { type: String, required: true }, 
  expenceAmount: { type: Number, required: true },
  productCode: { type: String, required: true, unique: true },
  branchId: { type: String, required: true }
}, { timestamps: true });
  
const dsrInvoiceModel = mongoose.model<IDsrInvoice>('dsrInvoice', dsrInvoiceSchema);

export default dsrInvoiceModel;
  