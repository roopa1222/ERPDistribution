import { Router } from "express";
import DsrInvoiceController from "../../controller/dsrInvoice";
import authenticateToken from "../../middlewares/auth";
import { IRoles } from "../../types/user";

const router = Router();

router.post('/add-dsr-invoice',authenticateToken([IRoles.SUPER_ADMIN, IRoles.ADMIN, IRoles.SALESMAN]), DsrInvoiceController.createDsrInvoice);

router.put('/edit-dsr-invoice', authenticateToken([IRoles.SUPER_ADMIN, IRoles.ADMIN]), DsrInvoiceController.updateDsrInvoice);

router.get('/dsr-invoice', DsrInvoiceController.getDsrInvoiceDetails)

router.get('/dashboard-count', DsrInvoiceController.getDashBoardCountData)

export default router;