import { Types } from "mongoose";

export interface IDsrInvoice {
  productName: string;
  serialNo: string
  paymentMode: IPaymentMode[]
  paymentDetails: IPaymentDetail[];
  customerName: string;
  customerMobileNo: string;
  totalAmount: number;
  branchId: string | Types.ObjectId;
  financeDetails: IFinanceDetail[];
  category: ICategoryType
}

export enum IPaymentMode {
    UPI = "UPI",
    Debit = "Debit",
    Credit = "Credit",
    Cash = "Cash",
    Pending = "Pending",
    '1Finance' = "1Finance",
    '2Finance' = "2Finance",
    BuyBack = "BuyBack",
  }

export interface IPaymentDetail {
  mode:IPaymentMode;
  amount: number;
}

export interface IFinanceDetail {
  financeName:string;
  amount: number;
}

export enum ICategoryType {
  MOBILE = "MOBILE",
  ACCESSORIES = "ACCESSORIES",
  ELECTRONICS = "ELECTRONICS",
}
