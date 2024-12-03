import { Types } from "mongoose";

export interface IDailyExpence {
  expenseName: string;
  expenseAmount: number;
  openingBalance: number;
  closingBalance: number;
  branchId: string | Types.ObjectId;
  expenseType: string
}

export enum IExpense {
  EXPENSE = 'expense',
  BALANCE = 'Balance',
}