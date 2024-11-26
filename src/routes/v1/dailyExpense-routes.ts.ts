import { Router } from "express";
import DailyexpenseController from "../../controller/dailyExpense";
import authenticateToken from "../../middlewares/auth";
import { IRoles } from "../../types/user";

const router = Router();

router.post('/add-expense', authenticateToken([IRoles.SUPER_ADMIN, IRoles.ADMIN, IRoles.SALESMAN]), DailyexpenseController.addDailyexpense);

router.put('/edit-expense',authenticateToken([IRoles.SUPER_ADMIN, IRoles.ADMIN, IRoles.SALESMAN]), DailyexpenseController.updateDailyExepnce);

export default router;