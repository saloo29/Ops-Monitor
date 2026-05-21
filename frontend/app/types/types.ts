type IncidentStatus = "OPEN" | "INVESTIGATING" | "IDENTIFIED" | "MONITORING" | "RESOLVED";
type IncidentPriority = "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";

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

export type IncidentResponse = {
  data: Incident[];
  meta:{
    page: number;
    pageSize: number;
    total: number;
    totalPages: number;
  }
}