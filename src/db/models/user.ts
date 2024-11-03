import mongoose, { Schema } from "mongoose";
import { IUser } from "../../types/user";

export const userSchema = new Schema<IUser>({
    branchId: {type: Number, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    userName: { type: String, required: true }
  }, { timestamps: true });
  
  export const userModel = mongoose.model<IUser>('User', userSchema)
  