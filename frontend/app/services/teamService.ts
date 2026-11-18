import api from '@/lib/axios';
import { TeamsResponse, TeamResponse } from '../types/types';

export const getTeams = async (): Promise<TeamsResponse> => {
  const response = await api.get<TeamsResponse>('/api/teams');
  return response.data;
}

export const getTeamById = async (teamId: string): Promise<TeamResponse> => {
  const response = await api.get<TeamResponse>(`/api/teams/${teamId}`);
  return response.data;
}