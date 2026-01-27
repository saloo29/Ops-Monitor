import { z } from "zod";
import { PRIORITY, STATUS } from "../utils/enums.js";

export const IncidentSchema = z.object({
  title: z.string().min(5, "Title cannot be too short"),
  description: z.string().min(10, "Add more decription for the incident."),
  priority: z.enum(Object.values(PRIORITY)).optional(),
  status: z.enum(Object.values(STATUS))
})


export const PatchIncidentSchema = z.object({
  satus: z.enum(Object.values(STATUS)).optional(),
  priority: z.enum(Object.values(PRIORITY)).optional(),
  assigneeId: z.string().optional()
})