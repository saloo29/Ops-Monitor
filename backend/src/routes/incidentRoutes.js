import { Router } from "express";
import authenticate from "../middleware/auth.js"
import { createIncident, getIncidentById, getIncidents, patchIncident } from "../controllers/incidentController.js"

const router = Router();

router.post('/incidents', authenticate, createIncident);
router.get('/incidents', authenticate, getIncidents);
router.get('/incidents/:id', authenticate, getIncidentById);
router.patch('/incidents/:id', authenticate, patchIncident);

export default router;