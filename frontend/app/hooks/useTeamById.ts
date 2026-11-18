import { useQuery } from '@tanstack/react-query';
import { getTeamById } from '../services/teamService';
import { TeamResponse } from '../types/types';

export const useTeamById = (teamId: string) => {
  return useQuery<TeamResponse>({
    queryKey: ['teams', teamId],
    queryFn: () => getTeamById(teamId),
    enabled: Boolean(teamId), 
    staleTime: 1000 * 60 * 5,
  });
}