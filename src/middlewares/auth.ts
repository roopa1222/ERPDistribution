import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { IRoles } from '../types/user'; // Ensure the correct import path
import ApiError from '../utils/api-error';

interface JwtPayload {
  id: string;
  email: string;
  role: IRoles;
  branchId: string;
}

const authenticateToken = (roles: IRoles[]) => async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return next(ApiError.forbidden());  // No token, forbidden access
  }

  try {
    const secret = process.env.ACCESS_TOKEN_SECRET as string;

    // Directly use jwt.verify as it's already asynchronous, return a promise automatically
    const decoded = await new Promise<JwtPayload>((resolve, reject) => {
      jwt.verify(token, secret, (err, decoded) => {
        if (err) {
          return reject(err);  // Reject the promise if verification fails
        }
        resolve(decoded as JwtPayload);  // Resolve the promise with decoded JWT payload
      });
    });

    // Attach user details to req.user if decoding is successful
    req.user = {
      email: decoded.email,
      id: decoded.id,
      role: decoded.role,
      token: token,
      branchId: decoded.branchId, 
    };

    // Check if the user's role is authorized
    if (!roles.includes(decoded.role)) {
      return next(ApiError.forbidden());  // Forbidden, user doesn't have the right role
    }

    return next();  // Continue to the next middleware or route handler
  } catch (err) {
    return next(ApiError.badRequest());  // Catch JWT errors, such as invalid token
  }
};

export default authenticateToken;
