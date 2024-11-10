import { Router } from "express";
import UserController from "../../controller/user";
import authenticateToken from "../../middlewares/auth";
import { IRoles } from "../../types/user";

const router = Router();

router.post('/add-user', 
    authenticateToken([IRoles.SUPER_ADMIN]), 
    UserController.registerUser);

router.post('/login', UserController.loginUser);

router.get('/get-all-users', authenticateToken([IRoles.SUPER_ADMIN, IRoles.ADMIN]), UserController.getAllUser);

export default router;
