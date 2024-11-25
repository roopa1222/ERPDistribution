import { Router } from "express";
import DailyexpenseController from "../../controller/dailyexpense";

const router = Router();

router.post('/add-expense', DailyexpenseController.addDailyexpense);

router.put('/edit-expense', DailyexpenseController.updateDailyExepnce);

export default router;