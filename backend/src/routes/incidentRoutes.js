import { Router } from "express";
import authenticate from "../middleware/auth.js"
import { createIncident, getIncidentById, getIncidents, patchIncident } from "../controllers/incidentController.js"

const router = Router();

router.post('/', createIncident);
router.get('/', getIncidents);
router.get('/:id', getIncidentById);
router.patch('/:id', patchIncident);

export default router;