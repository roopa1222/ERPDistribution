import { Request, Response, NextFunction } from 'express';
import { loginSchema, registerSchema } from "../validator/user";
import { addUser, comparePassword, generateToken, getAllUsers, getUserByEmail, hash } from "../utils/auth";
import ApiError from "../utils/api-error";

export default class UserController { 
  static registerUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await registerSchema.validateAsync(req.body);

      const checkUserExist = await getUserByEmail(result.email);
      if (checkUserExist) {
        return next(ApiError.customError(400, 'User already exists'));
      }       
      result.password = await hash(result.password);

      const createUser = await addUser(result);
      if (!createUser) return next(ApiError.customError(422, 'User not created'));

      return res.status(200).json({ status: 200, data: { message: 'User Created Successfully.' }, error: null });
    } catch (e) {
      return next(e);
    }
  };
  static loginUser = async (req: Request, res: Response, next: NextFunction) => {
    try{
      const result = await loginSchema.validateAsync(req.body);
      const user = await getUserByEmail(result.email);
      if (!user) return next(ApiError.customError(404, 'User not found'));
      const isPasswordMatch = await comparePassword(result.password, user.password);
      if (!isPasswordMatch) return next(ApiError.customError(400, 'Incorrect Password'));

      const token = generateToken(user);
      
      return res.status(200).json({
        status: 200,
        data: { message: 'Login successful', token },
        error: null
      });
    } catch (e) {
      return next(e);
    }
  };

  static getAllUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const users = await getAllUsers();
      if (!users) return next(ApiError.customError(404, 'No users found'));
      return res.status(200).json({ status: 200, data: users, error: null });
    } catch (e) {
      return next(e);
    }
  };

}
