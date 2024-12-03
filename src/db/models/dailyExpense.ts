import mongoose, { Schema } from "mongoose";
import { IDailyExpence, IExpense } from "../../types/dailyExpense"


export const dailyexpenseSchema = new Schema<IDailyExpence>({
  expenseName: { type: String}, 
  expenseAmount: { type: Number},
  openingBalance: { type: Number },
  closingBalance: { type: Number },
  expenseType: {type: String, enum: IExpense},
  branchId: { type: mongoose.Schema.Types.ObjectId, ref: 'branch' }

}, { timestamps: true });
  
const dailyexpenseModel = mongoose.model<IDailyExpence>('dailyExpense', dailyexpenseSchema);

export default dailyexpenseModel;
  