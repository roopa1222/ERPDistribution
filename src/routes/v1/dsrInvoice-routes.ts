import { Router } from "express";
import DsrInvoiceController from "../../controller/dsrInvoice";

const router = Router();

router.post('/add-dsr-invoice', DsrInvoiceController.createDsrInvoice);

export default router;