import mongoose, { Schema } from "mongoose";
import { IDailyExpence } from "../../types/dailyExpence";


export const dailyExpenceSchema = new Schema<IDailyExpence>({
  expenceNarration: { type: String, required: true }, 
  expenceAmount: { type: Number, required: true },
  openingBalance: { type: Number, required: true },
  closingBalance: { type: Number, required: true },
  branchId: { type: mongoose.Schema.Types.ObjectId, ref: 'branch' }

}, { timestamps: true });
  
const dailyExpenceModel = mongoose.model<IDailyExpence>('dailyExpence', dailyExpenceSchema);

export default dailyExpenceModel;
  