import { Router } from "express";
import authenticate from "../middleware/auth.js"
import { createIncident, getIncidents } from "../controllers/incidentController.js"

const router = Router();

router.post('/incidents', authenticate, createIncident);
router.get('/incidents', getIncidents)

export default router;



