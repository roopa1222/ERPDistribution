import { Router
 } from "express";
import authenticateToken from "../../middlewares/auth";
import { IRoles } from "../../types/user";
import UserController from "../../controller/user";


const router = Router();


router.post('/add-user',  UserController.registerAPi);

export default router;
