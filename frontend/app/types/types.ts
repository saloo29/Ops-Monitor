export type IncidentStatus = "OPEN" | "INVESTIGATING" | "IDENTIFIED" | "MONITORING" | "RESOLVED";
export type IncidentPriority = "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";

export type Incident = {
  incidentId: string;
  incidentCode: string
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

export type UpdateIncidentPayload = {
  incidentId: string;
  description?: string;
  status?: IncidentStatus;
  priority?: IncidentPriority;
  assigneeId?: string;
}

export type CreateIncidentPayload = {
  title: string;
  description: string;
  priority: IncidentPriority | "LOW";
  status: IncidentStatus | "OPEN";
}