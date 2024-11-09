import mongoose, { Schema } from "mongoose";
import { IDsrInvoice , IPaymentMode} from "../../types/dsrInvoice";


export const dsrInvoiceSchema = new Schema<IDsrInvoice>({
    productName: { type: String, required: true },
    paymentMode: { type: String, enum: IPaymentMode, required: true },
    customerName: { type: String, required: true },
    mobileNo: { type: String, required: true },
    total: { type: Number, required: true },
    expense: { type: Number, required: true },
    productCode: { type: String, required: true, unique: true },
}, { timestamps: true });
  
const dsrInvoiceModel = mongoose.model<IDsrInvoice>('dsrInvoice', dsrInvoiceSchema);

export default dsrInvoiceModel;
  