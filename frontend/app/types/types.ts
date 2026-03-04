type IncidentStatus = "OPEN" | "INVESTIGATING" | "INDENTIFIED" | "MONITORING" | "RESOLVED";
type IncidentPriority = "LOW" | "MEDIUM" | "HIGH" | "CRTICAL";

export type Incident = {
  incidentId: string;
  title: string;
  description: string;
  status: IncidentStatus;
  priority: IncidentPriority;
  evidence: string | null;
  reporterId : string;
  assigneeId: string;
  createdAt: string;
  resolvedAt: string | null;
}