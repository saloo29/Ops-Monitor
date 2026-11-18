import { Incident } from '@/app/types/types';
import SeverityBadge from '../shared/SeverityBadge';
import StatusBagde from '../shared/StatusBagde';
import IncidentCard from '../incidents/IncidentCard';
import { formatDate } from '@/lib/formatDate';

interface Props {
  incident: Incident;
  isExpanded: boolean;
  onToggle: () => void;
}

const TeamIncidentItem = ({ incident, isExpanded, onToggle }: Props) => {
  if (isExpanded) {
    return (
      <div onClick={onToggle} className="cursor-pointer">
        <IncidentCard incident={incident} />
      </div>
    );
  }

  return (
    <div
      onClick={onToggle}
      className="border dark:border-slate-800 rounded-xl p-5 bg-card
        flex items-center justify-between cursor-pointer
        hover:border-indigo-500/50 transition-colors"
    >
      <div className="flex flex-col gap-1 min-w-0">
        <div className="flex items-center gap-3">
          <SeverityBadge level={incident.priority} />
          <span className="text-xs text-muted-foreground">{incident.incidentCode}</span>
          <span className="text-xs text-muted-foreground">• {formatDate(incident.createdAt)}</span>
        </div>
        <h3 className="font-semibold">{incident.title}</h3>
        <p className="text-sm text-muted-foreground line-clamp-1">{incident.description}</p>
      </div>
      <div className='flex flex-col gap-2'>
        <StatusBagde status={incident.status} variant="pill" />
        <span className="text-xs text-muted-foreground">
          {incident.assignee?.username ?? "Unassigned"}
        </span>  
      </div> 
    </div>
  );
};

export default TeamIncidentItem;