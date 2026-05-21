import { IncidentResponse } from "../types/types";
import api from "@/lib/axios";

const getIncident = async({ page = 1, pageSize = 10 } : { page: number, pageSize: number}): Promise<IncidentResponse> => {
  const response = await api.get(`/api/incidents?page=${page}&limit=${pageSize}`);
  return response.data;
} 

export default getIncident;