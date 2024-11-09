import mongoose, { Schema } from "mongoose";
import { IRoles, IUser } from "../../types/user";

export const userSchema = new Schema<IUser>({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  mobileNo: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  userName: { type: String, required: true },
  role: { type: String, enum: IRoles, required: true },
  branchId: {type: Number},
}, { timestamps: true });
  
const userModel = mongoose.model<IUser>('User', userSchema);

export default userModel;
  