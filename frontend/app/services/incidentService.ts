import { IncidentResponse, UpdateIncidentPayload, CreateIncidentPayload } from "../types/types";
import api from "@/lib/axios";

export const getIncident = async({ page = 1, pageSize = 10 } : { page: number, pageSize: number}): Promise<IncidentResponse> => {
  const response = await api.get(`/api/incidents?page=${page}&limit=${pageSize}`);
  return response.data;
} 

export const updateIncident = async ({
  incidentId,
  ...data
}: UpdateIncidentPayload) => {
  const response = await api.patch(`/api/incidents/${incidentId}`,data);
  return response.data;
}

export const createIncident = async (
  data: CreateIncidentPayload) => {
  const response = await api.post(`/api/incidents`, data);
  return response.data;
}