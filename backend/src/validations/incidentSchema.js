import { z } from "zod";
import { PRIORITY, STATUS } from "../utils/enums.js";

export const IncidentSchema = z.object({
  Title: z.string().min(5, "Title cannot be too short"),
  Description: z.string().min(10, "Add more decription for the incident."),
  Priority: z.enum(Object.values(PRIORITY)).optional(),
  Status: z.enum(Object.values(STATUS))
})


export const PatchIncidentSchema = z.object({
  Status: z.enum(Object.values(STATUS)).optional(),
  Priority: z.enum(Object.values(PRIORITY)).optional(),
  AssigneeId: z.string().optional()
})