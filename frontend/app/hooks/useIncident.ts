'use client'

import { useQuery } from "@tanstack/react-query";
import getIncident from "../services/incidentService";
import { IncidentResponse } from "../types/types";

export const useIncident = (page : number, pageSize : number) =>{
  return useQuery<IncidentResponse>({
    queryKey : ["incidents", page, pageSize],
    queryFn: () => getIncident({ page, pageSize }),
    staleTime: 1000 * 60 * 5
  });
};