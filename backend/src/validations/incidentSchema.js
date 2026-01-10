import { z } from "zod";

export const IncidentSchema = z.object({
  Title: z.string().min(5, "Title cannot be too short"),
  Description: z.string().min(10, "Add more decription for the incident."),
  Priority: z.enum(["LOW", "MEDIUM", "HIGH", "CRITICAL"]).optional(),
  Status: z.enum(["TO_DO", "IN_PROGRESS", "IN_REVIEW", "RESOLVED", "CLOSED", "REOPENED"])
})
