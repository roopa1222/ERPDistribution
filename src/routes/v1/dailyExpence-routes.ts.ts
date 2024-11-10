import { Router } from "express";
import DailyExpenceController from "../../controller/dailyExpence";

const router = Router();

router.post('/add-expence', DailyExpenceController.addDailyExpence);

router.put('/edit-expence', DailyExpenceController.updateDailyExepnce);

export default router;