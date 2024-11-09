import { Request, Response, NextFunction } from "express";


export default class DsrInvoiceController {

    static createDsrInvoice = async (req: Request, res: Response, next: NextFunction) => {
        try{

        } catch (e) {
            next(e);
        }
    }
}