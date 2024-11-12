import { Types } from "mongoose";

export interface IDailyExpence {
  expenceNarration: string;
  expenceAmount: number;
  openingBalance: number;
  closingBalance: number;
  branchId: string | Types.ObjectId;
}