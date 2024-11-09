import { Router } from "express";
import UserController from "../../controller/user";

const router = Router();

router.post('/add-user', UserController.registerAPi);

export default router;
