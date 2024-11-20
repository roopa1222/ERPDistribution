import mongoose, { Schema } from "mongoose";
import { IDailyExpence } from "../../types/dailyExpence";


export const dailyExpenceSchema = new Schema<IDailyExpence>({
  expenceNarration: { type: String}, 
  expenceAmount: { type: Number},
  openingBalance: { type: Number },
  closingBalance: { type: Number },
  branchId: { type: mongoose.Schema.Types.ObjectId, ref: 'branch' }

}, { timestamps: true });
  
const dailyExpenceModel = mongoose.model<IDailyExpence>('dailyExpence', dailyExpenceSchema);

export default dailyExpenceModel;
  