import jwt from 'jsonwebtoken';
import { IUser } from '../types/user';
import userModel from '../db/models/user';
import bcrypt from 'bcrypt';




export const generateToken = (user: any) => {
  const secretKey = process.env.ACCESS_TOKEN_SECRET as string; // Type assertion
  const accessToken = jwt.sign({ id: user.id, email: user.email }, secretKey, {
    // You can specify the expiration time if needed
    expiresIn: '7d',
  });

  return accessToken;
};

export const getUserByEmail = async (email: string) => {
  const user = await userModel.findOne({ email });
  return user;

};

export const addUser =  async (data: object) => {
  const addUser =  await userModel.create(data);
  return addUser;
};

export const hash = async (value: string) => {
  const hashedValue = await bcrypt.hash(value, 12);
  return hashedValue;
};

export const comparePassword = async (value: string, hashedValue: string) => {
  const matched = await bcrypt.compare(value, hashedValue);
  return matched;
};

export const getAllUsers = async () => {
  const users = await userModel.find({});
  return users;
};

