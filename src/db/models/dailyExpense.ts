import mongoose, { Schema } from "mongoose";
import { IDailyExpence } from "../../types/dailyExpense"


export const dailyexpenseSchema = new Schema<IDailyExpence>({
  expenseName: { type: String}, 
  expenseAmount: { type: Number},
  openingBalance: { type: Number },
  closingBalance: { type: Number },
  branchId: { type: mongoose.Schema.Types.ObjectId, ref: 'branch' }

}, { timestamps: true });
  
const dailyexpenseModel = mongoose.model<IDailyExpence>('dailyExpense', dailyexpenseSchema);

export default dailyexpenseModel;
  