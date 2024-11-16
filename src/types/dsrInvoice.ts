import { Types } from "mongoose";

export interface IDsrInvoice {
  productName: string;
  productCode: string
  paymentMode: IPaymentMode[]
  paymentDetails: IPaymentDetail[];
  customerName: string;
  CustomerMobileNo: string;
  totalAmount: number;
  expence: string;
  expenceAmount: number;
  amount: number;
  branchId: string | Types.ObjectId;
  financeName: string;
}

export enum IPaymentMode {
    UPI = "UPI",
    Debit = "Debit",
    Credit = "Credit",
    Cash = "Cash",
    Pending = "Pending",
    Finance = "Finance",
  }

export interface IPaymentDetail {
  mode:IPaymentMode;
  amount: number;
}