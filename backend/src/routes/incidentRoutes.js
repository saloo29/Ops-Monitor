import { Router } from "express";
import authenticate from "../middleware/auth.js"
import { createIncident } from "../controllers/incidentController.js"

const router = Router();

router.post('/incidents', authenticate, createIncident);

export default router;



