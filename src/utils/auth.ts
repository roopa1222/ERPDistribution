import jwt from 'jsonwebtoken';
import { IUser } from '../types/user';
import userModel from '../db/models/user';
import bcrypt from 'bcrypt';




export const generateToken = (user: any) => {
  const secretKey = process.env.ACCESS_TOKEN_SECRET as string; // Type assertion
  const accessToken = jwt.sign({ id: user.id, email: user.email, role: user.role, branchId: user.branchId }, secretKey, {
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
  const users = await userModel.aggregate([
    {
      $lookup: {
        from: 'branches',        // The name of the collection you are joining with (should be plural of the model name)
        localField: 'branchId',   // The field in your user model
        foreignField: '_id',      // The field in the branch model
        as: 'branchDetails'       // The alias for the resulting array of joined documents
      }
    },
    {
      $unwind: '$branchDetails'  // Unwind the branchDetails array to merge the data into the user document
    },
    {
      $project: {
        _id: 1,
        firstName: 1,
        lastName: 1,
        email: 1,
        mobileNo: 1,
        userName: 1,
        role: 1,
        branchId: 1,
        branchName: '$branchDetails.branchName',  // Include branchName from the branchDetails
        createdAt: 1,
        updatedAt: 1
      }
    }
  ]);

  return users;
};


