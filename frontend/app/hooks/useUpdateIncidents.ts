import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateIncident } from "../services/incidentService";

export const useUpdateIncident = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateIncident,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["incidents"],
      });
      console.log("mutation successfull")
    },
  });
}