import { Router } from "express";
import BranchController from "../../controller/branch";
import { IRoles } from "../../types/user";
import authenticateToken from "../../middlewares/auth";

const router = Router();

router.get('/all-branches', authenticateToken([IRoles.SUPER_ADMIN, IRoles.ADMIN]), BranchController.getAllBranch);

router.post('/add-branch', authenticateToken([IRoles.SUPER_ADMIN, IRoles.ADMIN]),BranchController.addBraches);

export default router;