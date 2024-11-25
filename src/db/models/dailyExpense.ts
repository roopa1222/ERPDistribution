import mongoose, { Schema } from "mongoose";
import { IDailyexpense } from "../../types/dailyExpense";


export const dailyexpenseSchema = new Schema<IDailyexpense>({
  expenseNarration: { type: String}, 
  expenseAmount: { type: Number},
  openingBalance: { type: Number },
  closingBalance: { type: Number },
  branchId: { type: mongoose.Schema.Types.ObjectId, ref: 'branch' }

}, { timestamps: true });
  
const dailyexpenseModel = mongoose.model<IDailyexpense>('dailyexpense', dailyexpenseSchema);

export default dailyexpenseModel;
  