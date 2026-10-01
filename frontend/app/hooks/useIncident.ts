'use client'

import { useQuery } from "@tanstack/react-query";
import { getIncident } from "../services/incidentService";
import { IncidentResponse, IncidentStatus } from "../types/types";

export const useIncident = (
  page : number, 
  pageSize : number,
  status?: IncidentStatus
) => {
  return useQuery<IncidentResponse>({
    queryKey : ["incidents", page, pageSize, status],
    queryFn: () => getIncident({ page, pageSize,   status }),
    staleTime: 1000 * 60 * 5
  });
};