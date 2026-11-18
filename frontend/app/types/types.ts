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
  assigneeId: string | null;
  teamId: string | null;
  team?: { teamId: string; name: string } | null;
  createdAt: string;
  resolvedAt: string | null;
  assignee: {
    userId: string;
    username: string;
  } | null;
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
  teamId: string;
}

export type TeamMember = {
  userId: string;
  username: string;
  email: string;
  role: "ADMIN" | "RESPONDER";
};

export type Team = {
  teamId: string;
  name: string;
  createdAt: string;
  members: TeamMember[];
  incidents: {
    incidentId: string;
    status: IncidentStatus;
    priority: IncidentPriority;
  }[];
};

export type TeamDetails = {
  teamId: string,
  name: string,
  createdAt: string,
  members: TeamMember[];
  incidents: Incident[];
};

export type TeamsResponse = {
  data: Team[];
};

export type TeamResponse = {
  message: string;
  data: TeamDetails;
};