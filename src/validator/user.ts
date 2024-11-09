import Joi from 'joi';
import { IRoles } from '../types/user';

export const registerSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email({ tlds: { allow: false } }).regex(/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/).required(),
    password: Joi.string().required(),
    userName: Joi.string().required(),
    role: Joi.string().required().valid(...Object.values(IRoles)),
    branchId:Joi.number().optional(),

})