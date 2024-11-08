import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { IRoles } from '../types/user';

export interface CustomRequest extends Request {
  user?: {
    email: string;
    id: number;
    role: IRoles;
    token: string;
  };
}

interface JwtPayload {
  _id: number;
  email: string;
  role: IRoles;
}

const authenticateToken = (roles: IRoles[]) => async (req: CustomRequest, res: Response, next: NextFunction) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ message: 'Access denied, token missing!' });
  }

  try {
    const secret = process.env.JWT_SECRET as string;
    const decoded = jwt.verify(token, secret) as JwtPayload;

    // Attach user details to req.user
    req.user = {
      email: decoded.email,
      id: decoded._id,
      role: decoded.role,
      token: token,
    };

    if (!roles.includes(decoded.role)) {
      return res.status(403).json({ message: 'Access denied' });
    }

    next();
  } catch (err) {
    return res.status(403).json({ message: 'Invalid token!' });
  }
};

export default authenticateToken;
