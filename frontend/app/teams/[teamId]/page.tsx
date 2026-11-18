// app/teams/[teamId]/page.tsx
'use client'
import { useParams } from 'next/navigation';
import { useTeamById } from '@/app/hooks/useTeamById';
import PageWrapper from '@/app/components/layout/PageWrapper';
import TeamIncidentItem from '@/app/components/teams/TeamIncidentItem';
import Link from 'next/link';
import { ChevronLeftIcon } from '@heroicons/react/24/outline';
import { useState } from 'react'

const STATUS_COLOR: Record<string, string> = {
  OPEN: 'text-orange-500',
  INVESTIGATING: 'text-indigo-500',
  IDENTIFIED: 'text-purple-500',
  MONITORING: 'text-teal-500',
};

const TeamDetailPage = () => {
  const { teamId } = useParams<{ teamId: string }>();
  const { data, isLoading, error } = useTeamById(teamId);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  if (isLoading) return <div>Loading...</div>
  if (error) {
    return (
      <div className="p-6 text-red-400">
        Failed to load team: {error.message}
      </div>
    );
  }

  const team = data?.data;

  if (!team) return <div>Team not found</div>;

  const priorityCounts = {
    CRITICAL: team.incidents.filter(i => i.priority === "CRITICAL").length,
    HIGH: team.incidents.filter(i => i.priority === "HIGH").length,
    MEDIUM: team.incidents.filter(i => i.priority === 'MEDIUM').length,
    LOW: team.incidents.filter(i => i.priority === 'LOW').length,
  }

  const STATUSES = ['OPEN', 'INVESTIGATING', 'IDENTIFIED', 'MONITORING'] as const;

  const statusCounts = STATUSES.map(s => ({
    status: s,
    count: team.incidents.filter(i => i.status === s).length,
  }));

  return (
    <PageWrapper>
      <Link
        href="/teams"
        className="flex text-grey-200 transition-colors text-sm font-bold items-center text-muted-foreground dark:hover:text-white hover:text-slate-900 mb-6"
      >
        <ChevronLeftIcon className="w-4 h-4 stroke-3" />
        Back
      </Link>

      {/* header */}
      <div className="flex flex-col lg:flex-row gap-6 mb-8">

        <div className="flex-1 border dark:border-slate-800 border-slate-200 rounded-xl p-6 shadow-sm bg-card ">
          
          <div className="flex flex-col gap-6">
            {/* Team Identity */}
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-indigo-600/20
                border border-indigo-600/30 flex items-center justify-center
                font-bold text-indigo-400 text-xl">
                {team.name[0]}
              </div>

              <div>
                <h1 className="text-2xl font-bold">
                  {team.name}
                  <span className="text-indigo-400"> Hub</span>
                </h1>
                <p className="text-sm text-muted-foreground">
                  Responsible for core cloud resources, networking, and CI/CD pipelines.
                </p>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap gap-x-8 gap-y-2">
{/*               <div>
                <p className="text-xs text-muted-foreground uppercase font-mono tracking-widest">Members</p>
                <p className="font-semibold">{team.members.length}</p>
              </div> */}

              <div className='flex flex-row gap-x-4'>
                {statusCounts.map(({ status, count }) => (
                  <div
                    key={status}
                    className="rounded-lg border border-slate-200 dark:border-slate-800
                      bg-slate-50 dark:bg-slate-900/40 p-2"
                  >
                    <p className={`text-2xl font-bold tabular-nums text-center ${STATUS_COLOR[status]}`}>
                      {count}
                    </p>
                    <p className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground mt-1">
                      {status}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Incident Overview */}
  <div className="lg:w-80 shrink-0 border dark:border-slate-800
    border-slate-200 rounded-xl p-6 bg-card">

    <div className="flex items-center justify-between">
      <div>
        <p className="text-4xl font-bold tabular-nums">
          {team.incidents.length}
        </p>
        <p className="text-xs font-mono uppercase tracking-widest
          text-muted-foreground mt-1">
          Active Issues
        </p>
      </div>

    </div>

    <div className="grid grid-cols-4 gap-2 mt-6 pt-4
      border-t dark:border-slate-800 border-slate-200">

      {([
        { label: 'Critical', count: priorityCounts.CRITICAL, color: 'text-red-500' },
        { label: 'High', count: priorityCounts.HIGH, color: 'text-orange-500' },
        { label: 'Medium', count: priorityCounts.MEDIUM, color: 'text-yellow-500' },
        { label: 'Low', count: priorityCounts.LOW, color: 'text-blue-500' },
      ]).map(item => (
        <div key={item.label} className="flex flex-col gap-1">
          <span className={`text-xl font-bold tabular-nums ${item.color}`}>
            {item.count}
          </span>
          <span className="text-[10px] text-muted-foreground uppercase
            font-mono tracking-tight">
            {item.label}
          </span>
        </div>
      ))}

    </div>
  </div>

  {/* Team Roster */}
  <div className="lg:w-64 shrink-0 border dark:border-slate-800
    border-slate-200 rounded-xl p-6 bg-card">

    <div className="flex items-center justify-between mb-5">
      <p className="text-xs text-muted-foreground uppercase
        font-mono tracking-widest">
        Team Roster
      </p>
      <span className="text-xs text-muted-foreground">
        {team.members.length} members
      </span>
    </div>

    {team.members.length === 0 ? (
      <p className="text-sm text-muted-foreground">
        No members yet
      </p>
    ) : (
      <div className="flex flex-col gap-4">
        {team.members.map(member => (
          <div key={member.userId} className="flex items-center gap-3">

            <div className="w-9 h-9 shrink-0 rounded-full
              bg-indigo-600/10 border border-indigo-600/20
              flex items-center justify-center text-xs
              font-bold text-indigo-400">
              {member.username.slice(0, 2).toUpperCase()}
            </div>

            <div className="flex flex-col min-w-0">
              <span className="text-sm font-medium truncate">
                {member.username}
              </span>
              <span className="text-xs text-muted-foreground capitalize">
                {member.role}
              </span>
            </div>

          </div>
        ))}
      </div>
    )}
  </div>

 
      </div>

      {/* incidents */}
      <div>
        <h2 className="font-mono font-semibold uppercase text-sm text-muted-foreground tracking-tight mb-4">
          Team Queue : {team.incidents.length} incidents
        </h2>

        {team.incidents.length === 0 ? (
          <div className="border dark:border-slate-800 rounded-xl p-12 text-center text-muted-foreground">
            No active incidents 🎉
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {team.incidents.map(incident => (
              <TeamIncidentItem
                key={incident.incidentId}
                incident={incident}
                isExpanded={expandedId === incident.incidentId}
                onToggle={() =>
                  setExpandedId(prev => (prev === incident.incidentId ? null : incident.incidentId))
                }
              />
            ))}
          </div>
        )}
      </div>
    </PageWrapper>
  );
}

export default TeamDetailPage;