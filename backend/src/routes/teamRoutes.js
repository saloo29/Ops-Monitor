import { Router } from "express"
import { getTeams, getTeamById } from "../controllers/teamController.js";

const router = Router();

router.get('/', getTeams);
router.get('/:teamId', getTeamById);

export default router;