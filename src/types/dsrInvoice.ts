export interface IDsrInvoice {
  productName: string;
  productCode: string
  paymentMode: IPaymentMode;
  customerName: string;
  mobileNo: string;
  total: number;
  expense: number;
}

export enum IPaymentMode {
    UPI = "UPI",
    Debit = "Debit",
    Credit = "Credit",
    Cash = "Cash",
    Pending = "Pending",
    TwoFinance = "2Finance",
  }