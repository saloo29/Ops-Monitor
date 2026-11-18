// app/components/teams/TeamCard.tsx
import { Team } from '@/app/types/types';
import Link from 'next/link';

const TeamCard = ({ team }: { team: Team }) => {
  const activeIncidents = team.incidents.length; // already filtered to non-resolved on backend

  console.table({
    viewportHeight: window.innerHeight,
    documentHeight: document.documentElement.scrollHeight,
    bodyHeight: document.body.scrollHeight,
    htmlHeight: document.documentElement.getBoundingClientRect().height,
    navbarHeight: document.querySelector("header")?.getBoundingClientRect().height,
    mainHeight: document.querySelector("main")?.getBoundingClientRect().height,
  });

  return (
    <div className="border border-slate-300 dark:border-slate-800 rounded-xl p-6  flex flex-col gap-4 shadow-sm bg-card cursor-pointer">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-bold text-lg hover:text-indigo-500">{team.name}</h3>
          <p className="text-sm text-muted-foreground">
            {team.members.length} members
          </p>
        </div>
        <span className="w-3 h-3 rounded-full bg-green-500" />
      </div>

      <div className="flex justify-between items-center">
        <span className="text-sm text-muted-foreground">Active Incidents</span>
        <span className="text-red-400 font-bold">{activeIncidents}</span>
      </div>

      <Link
        href={`/teams/${team.teamId}`}
        className="border rounded-md py-2 text-center text-sm font-semibold
          dark:hover:bg-slate-700 transition-colors dark:bg-slate-800 bg-slate-200 hover:bg-slate-300"
      >
        View Dashboard
      </Link>
    </div>
  );
}

export default TeamCard;