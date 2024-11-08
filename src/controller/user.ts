import { Request, Response, NextFunction } from "express";

export default class UserController { 

 
    static  registerAPi = async (req: Request, res: Response, next: NextFunction) => {
        try {
            
          
        } catch (e) {
          next(e);
        }
    }

};