import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateIncident } from "../services/incidentService";

export const useUpdateIncident = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateIncident,

    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: ["incidents"],
        }),
        queryClient.invalidateQueries({
          queryKey: ["teams"]
        })
      ])
      
      console.log("Mutation successful. Queries invalidated");
    },
  });
}