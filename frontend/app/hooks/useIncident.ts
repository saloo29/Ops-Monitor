import { useQuery } from "@tanstack/react-query";
import getIncident from "../services/incidentService";

export const useIncident = () =>{
  return useQuery({
    queryKey : ["incidents"],
    queryFn: getIncident,
    staleTime: 1000 * 60 * 5
  });
};