import { useQuery } from '@tanstack/react-query';
import { getTeams } from '../services/teamService';
import { TeamsResponse } from '../types/types';

export const useTeams = () => {
  return useQuery<TeamsResponse>({
    queryKey: ['teams'],
    queryFn: getTeams,
    staleTime: 1000 * 60 * 5,
  });
}