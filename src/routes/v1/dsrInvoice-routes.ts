import { Router } from "express";
import DsrInvoiceController from "../../controller/dsrInvoice";
import authenticateToken from "../../middlewares/auth";
import { IRoles } from "../../types/user";

const router = Router();

router.post('/add-dsr-invoice',authenticateToken([IRoles.SUPER_ADMIN, IRoles.ADMIN, IRoles.SALESMAN]), DsrInvoiceController.createDsrInvoice);

router.put('/edit-dsr-invoice', authenticateToken([IRoles.SUPER_ADMIN, IRoles.ADMIN]), DsrInvoiceController.updateDsrInvoice);

router.get('/dsr-invoice', authenticateToken([IRoles.SUPER_ADMIN, IRoles.ADMIN, IRoles.SALESMAN]), DsrInvoiceController.getDsrInvoiceDetails)

router.get('/dashboard-count', authenticateToken([IRoles.SUPER_ADMIN, IRoles.ADMIN, IRoles.SALESMAN]), DsrInvoiceController.getDashBoardCountData)

router.get('/dsr-invoice-excel-data', 
    // authenticateToken([IRoles.SUPER_ADMIN, IRoles.ADMIN, IRoles.SALESMAN]), 
    DsrInvoiceController.getDSRInvoiceExcelData);

export default router;