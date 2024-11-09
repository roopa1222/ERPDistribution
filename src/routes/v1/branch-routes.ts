import { Router } from "express";
import BranchController from "../../controller/branch";
import { IRoles } from "../../types/user";
import authenticateToken from "../../middlewares/auth";

const router = Router();

router.get('all-branches', authenticateToken([IRoles.SUPER_ADMIN]), BranchController.getAllBranch);

router.post('add-branches', BranchController.addBraches);

export default router;