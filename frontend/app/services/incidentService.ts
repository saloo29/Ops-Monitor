import { Incident } from "../types/types";
import api from "@/lib/axios";

const getIncident = async() : Promise<Incident []> => {
  const response = await api.get('/api/incidents/');
  return response.data.data;
} 

export default getIncident;