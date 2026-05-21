import { Router } from "express";
import authenticate from "../middleware/auth.js"
import { createIncident, getIncidentById, getIncidents, patchIncident } from "../controllers/incidentController.js"

const router = Router();

router.post('/incidents', createIncident);
router.get('/incidents', getIncidents);
router.get('/incidents/:id', getIncidentById);
router.patch('/incidents/:id', patchIncident);

export default router;