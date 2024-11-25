import { Types } from "mongoose";

export interface IDailyexpense {
  expenseNarration: string;
  expenseAmount: number;
  openingBalance: number;
  closingBalance: number;
  branchId: string | Types.ObjectId;
}