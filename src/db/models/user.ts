import mongoose, { Schema } from "mongoose";
import { IRoles, IUser } from "../../types/user";

export const userSchema = new Schema<IUser>({
    branchId: {type: Number, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    userName: { type: String, required: true },
    role: { type: String, enum: IRoles, required: true },
  }, { timestamps: true });
  
 const userModel = mongoose.model<IUser>('User', userSchema)

 export default userModel;
  