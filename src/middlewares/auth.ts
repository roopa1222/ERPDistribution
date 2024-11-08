import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { IRoles, IUser } from '../types/user';
import User from '../db/models/user';

export interface CustomRequest extends Request {
    user?: IUser
  }
// Define the structure of the decoded JWT to include the user _id
    interface JwtPayload {
        _id: string;
      }

// Modified authenticateToken to accept an array of roles
const authenticateToken = (roles: IRoles[]) => async (req: CustomRequest, res: Response, next: NextFunction) => {
    const token = req.header('Authorization')?.replace('Bearer ', '')

    if (!token) {
      return res.status(401).json({ message: 'Access denied, token missing!' });
    }

    try {
      const secret = process.env.JWT_SECRET as string;
      const decoded = jwt.verify(token, secret) as JwtPayload;

      const user = await User.findOne({ _id: decoded._id });
  
      if (!user) {
        throw new Error('Authentication failed. User not found.')
      }
  

      // Attach decoded token to `req.user`
      req.user = user
      const userRole = req.user.role as IRoles; 

      // If specific roles are provided, check if user's role is allowed
      if (roles.length && !roles.includes(userRole)) {
        return res.status(403).json({ message: 'Access denied: insufficient permissions' });
      }

      next();
    } catch (err) {
      return res.status(403).json({ message: 'Invalid token!' });
    }
  };

export default authenticateToken;
