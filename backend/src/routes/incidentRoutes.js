import { Router } from "express";
import authenticate from "../middleware/auth.js"
import { createIncident, getIncidentById, getIncidents } from "../controllers/incidentController.js"

const router = Router();

router.post('/incidents', authenticate, createIncident);
router.get('/incidents', authenticate, getIncidents)
router.get('/incidents/:id', authenticate, getIncidentById)

export default router;