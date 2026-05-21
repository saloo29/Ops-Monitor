import { Incident } from "@/app/types/types";
import SeverityBadge from "../shared/SeverityBadge";
import StatusDot from "../shared/StatusDot";
import { formatDuration } from "@/lib/formatDuration";
import { PencilSquareIcon } from "@heroicons/react/24/solid";

interface IncidentCardProps {
  incident: Incident | null
}


const IncidentCard =  ({
  incident
} : IncidentCardProps) => {

  if (!incident) return null; 

  console.log("hello incident card " + incident?.title);


  

  return (
    <div className="
      border-2 dark:border-blue-900/70 border-blue-600/50 rounded-xl
      px-6 py-6 bg-card shadow-2xl
      w-175 flex flex-1 flex-col  min-h-0
    ">
       {/* top-level metadata row - left and right ends**/}
      <div className="flex items-start justify-between ">
        {/* LEFT - badge + id + duration + incident name + tags **/}
          <div className="
            flex flex-col gap-2 items-start
          "> 
            <div className="
              flex items-center gap-4  
            "> 
              <SeverityBadge level={incident?.priority} />
              <span className="text-sm font-medium text-muted-foreground">
                {incident?.incidentId.slice(0, 8).toUpperCase()}
              </span>
              <span className="text-xs font-medium text-muted-foreground">
                {formatDuration(incident.createdAt, incident.resolvedAt)} duration
              </span>
            </div>

            <h2 className="
                text-slate-900 dark:text-slate-200 text-lg font-semibold hover:text-indigo-600
              ">{incident?.title}
            </h2>
            
            <div className="
              flex flex-row gap-2 text-xs 
            ">
              <span className="text-sm">#tags</span>
              <span className="text-sm">#aws</span>
              <span className="text-sm">#automated</span>
            </div>
          </div>

        {/* RIGHT- status + assignment + reporterid **/}
          <div className="
            flex flex-col items-end gap-2
          ">
            <StatusDot status={incident?.status} />
            <p className="
              font-mono text-xs font-semibold text-muted-foreground
            ">ASSIGNMENT</p>
            <p className="
              text-xs text-muted-foreground font-medium
            ">
              {incident?.reporterId.slice(0, 8).toUpperCase()}
            </p>
          </div>
      
      </div>
      {/* incident Title **/}
      <div>
        
      </div>
      <div className="
        mt-4 mb-4
      ">
        <span className="
          uppercase font-semibold font-mono text-sm text-slate-500 tracking-tight
        ">INCIDENT TIMELINE
        </span>
      </div>
      <div className="flex flex-col gap-2">
        <div className="flex flex-row justify-between ">
          <span className="
            uppercase font-semibold font-mono text-slate-500 tracking-wide
          ">
            Full Description
          </span>
          <button className="flex flex-row gap-1 items-center">
            <PencilSquareIcon className="w-5 fill-indigo-600 stroke-2"/>
            <span className="font-mono text-xs/2 tracking-tighter font-semibold text-indigo-600">Edit Details</span>
          </button>
        </div>

        <div className="
          border dark:border-slate-700 border-slate-400 rounded-sm px-4 py-4 font-medium dark:text-slate-300 text-slate-700 mt-2 bg-slate-100/50 dark:bg-slate-800/50
        ">
          {incident?.description}
        </div>
      </div>
    
    </div>
  )
}

export default IncidentCard;