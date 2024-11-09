import { NextFunction, Request, Response } from 'express';
import { registerSchema } from "../validator/user";
import { addUser, getUserByEmail, hash } from "../utils/auth";
import ApiError from "../utils/api-error";

export default class UserController { 
 
  static  registerAPi = async (req: Request, res: Response, next: NextFunction) => {
      try {
        const result = await registerSchema.validateAsync(req.body);

        const  checkUserExist = await getUserByEmail(result.email);
        if (!checkUserExist) return next(ApiError.customError(422, 'User already exist'));

        result.password = await hash(result.password);

        const createUSer = await addUser(result);
        if(!createUSer) return next(ApiError.customError(422, 'User not created'));

        return res.status(200).json({ status: 200, data: { message: 'User Created Successfully.' }, error: null });
        } catch (e) {
          return next(e);
        }
    }

};