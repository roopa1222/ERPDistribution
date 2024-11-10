export interface IDsrInvoice {
  productName: string;
  productCode: string
  paymentMode: IPaymentMode;
  customerName: string;
  CustomerMobileNo: string;
  total: number;
  expence: string;
  expenceAmount: number;
  amount: number;
  branchId: string;
}

export enum IPaymentMode {
    UPI = "UPI",
    Debit = "Debit",
    Credit = "Credit",
    Cash = "Cash",
    Pending = "Pending",
    TwoFinance = "2Finance",
  }