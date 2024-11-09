import mongoose, { Schema } from "mongoose";
import { IBranch } from "../../types/branch";


export const branchSchema = new Schema<IBranch>({
  branchName: { type: String, required: true },
}, { timestamps: true });
  
const branchModel = mongoose.model<IBranch>('branch', branchSchema);

export default branchModel;
  