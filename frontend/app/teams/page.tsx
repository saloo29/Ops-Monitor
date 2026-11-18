"use client";

import PageWrapper from "../components/layout/PageWrapper";
import { useTeams } from "../hooks/useTeams";
import TeamCard from "../components/teams/TeamCard";


const Teams = () => {
  const { data, isLoading, error } = useTeams();

  if (isLoading) return <div>Loading teams...</div>
  if (error) return <div>Something went wrong</div>

  const teams = data?.data || [];

  return (
    <PageWrapper
      title= "Team Directory"
      description= 'Monitor team health and on-call assignments.'
    >
      <div className="grid grid-cols-3 gap-6">
        {teams.map(team => (
          <TeamCard key={team.teamId} team={team} />
        ))}
      </div>
    </PageWrapper>
  )
}

export default Teams;