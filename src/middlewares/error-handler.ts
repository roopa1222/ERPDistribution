import { NextFunction, Request, Response } from 'express';
import Joi from 'joi';
import { AxiosError } from 'axios';
import multer from 'multer';
import { IApiErrors, jwtError } from '../types/error';
import ApiError from '../utils/api-error';
import logger from '../utils/winston';
import jwt from 'jsonwebtoken';

function errorHandlingMiddleWare(err: unknown, req: Request, res: Response, next: NextFunction) {
  // Logging Error
  logger.error(err);

  // API Error
  // if (err instanceof ApiError) {
  //   return res.status(err.code).json({ status: err.code, data: null, error: err.message });
  // }

  const sanitizeMessage = (message: string): string => message.replace(/\x1b\[[0-9;]*m/g, '');

  // API Error
  if (err instanceof ApiError) {
    // Sanitize the message
    const cleanMessage = sanitizeMessage(err.message);
    return res.status(err.code).json({ status: err.code, data: null, error: cleanMessage });
  }

  // JOI Error
  if (err instanceof Joi.ValidationError) {
    type Obj = {
      label:string | number,
      msg:string
    };
    const error:Array<Obj> = [];
    err.details.forEach((e) => {
      const data = {
        label: e.path[0],
        msg: e.message,
      };
      error.push(data);
    });
    return res.status(422).json({ status: 422, data: null, error: { message: 'Validation Error', errors: error } });
  }

  // General JWT errors
  if (err instanceof jwt.JsonWebTokenError || err instanceof jwt.TokenExpiredError) {
    const statusCode = 401; // Default to 401 Unauthorized for JWT errors
    const errorMessage = jwtError.get(statusCode) || 'Unauthorized';
    return res.status(statusCode).json({ status: statusCode, error: errorMessage, data: null });
  }
  // multer errors
  if (err instanceof multer.MulterError) {
    return res.status(500).json({ status: err.code, error: err.message, data: null });
  }

  // Send Internal Sever Error
  return res.status(500).json({ status: 500, error: IApiErrors.INTERNAL_SERVER_ERROR });
}
export default errorHandlingMiddleWare;
