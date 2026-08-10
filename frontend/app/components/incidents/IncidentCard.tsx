import { useState } from 'react';
import { Incident } from "@/app/types/types";
import SeverityBadge from "../shared/SeverityBadge";
import StatusDot from "../shared/StatusBagde";
import { formatDuration } from "@/lib/formatDuration";
import { PencilIcon, ArrowLeftIcon } from "@heroicons/react/24/solid";
import { useUpdateIncident } from "@/app/hooks/useUpdateIncidents";
import IncidentTimeline from "../incidents/IncidentTimeline"
import { INCIDENT_STEPS as STEPS } from '@/lib/constants';

interface IncidentCardProps {
  incident: Incident | null
}

const IncidentCard =  ({
  incident
} : IncidentCardProps) => {

  const [isEditing, setIsEditing] = useState(false);
  const [description, setDescription] = useState(incident?.description ?? "");
  const { mutate, isPending } = useUpdateIncident();

  if (!incident) return null; 


  const isResolved = incident?.status === "RESOLVED";
  const currentIndex = STEPS.indexOf(incident.status)
  const canGoBack = currentIndex > 0;
  const canGoAhead = currentIndex < STEPS.length - 1
  const prevStatus = STEPS[currentIndex - 1];
  const nextStatus = STEPS[currentIndex + 1];


  console.log("hello incident card " + incident?.title);

  return (
    <div className="
      border-2 dark:border-blue-900/70 
      border-blue-600/50 rounded-xl
      px-6 py-6 bg-card shadow-2xl
      w-full flex flex-1 flex-col  min-h-0
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
                {incident?.incidentCode}
              </span>
              <span className="text-xs font-medium text-muted-foreground">
                • {formatDuration(incident.createdAt, incident.resolvedAt)} duration
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
            <StatusDot status={incident.status} variant='pill'/>
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

      {/*TWO COLUMN BODY**/}
      <div className='flex gap-4 mt-6 min-w-0'>
        {/*right side - incident timeline + description **/}
        <div className='flex flex-col flex-1 min-w-0'>     
            <div className="mb-4">
              <span className="
                uppercase font-semibold font-mono text-sm text-slate-500 tracking-tight mb-4
              ">INCIDENT TIMELINE
              </span>
              <div className='mt-6 mb-6'>
                <IncidentTimeline incident={incident}/>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex flex-row justify-between ">
                <span className="
                  uppercase font-semibold font-mono text-xs text-slate-500 tracking-wide
                ">
                  Full Description
                </span>
                <button className="flex flex-row gap-1 items-center"
                  onClick={() => setIsEditing(true)}
                >
                  <PencilIcon className="w-4 fill-indigo-600 stroke-2"/>
                  <span className="font-mono text-sm tracking-tighter font-semibold text-indigo-600">Edit</span>
                </button>
              </div>
              {isEditing ? (
                <div className="flex flex-col gap-2">
                  <textarea 
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="
                      border dark:border-slate-700 border-slate-400 rounded-sm 
                      px-4 py-4 w-full min-h-24 mb-2
                      dark:bg-slate-800 bg-slate-200 
                      resize-none
                    "
                  />
                  <div className="
                    flex justify-end gap-4

                  ">
                    <button 
                      onClick={() => 
                        mutate({
                          incidentId: incident.incidentId,
                          description,
                        }, {
                          onSuccess: () => {
                            setIsEditing(false);
                          }
                        })
                      }
                      className="
                        border-2 px-3 py-1 rounded-sm 
                        border-indigo-400 dark:border-indigo-900
                        hover:bg-indigo-300 dark:hover:bg-indigo-700/50
                        font-medium text-sm
                      ">
                      Save
                    </button>
                    <button className="
                      border-2 px-3 py-1 rounded-sm 
                      border-indigo-400 dark:border-indigo-900
                      hover:bg-indigo-300 dark:hover:bg-indigo-700/50
                      font-medium text-sm
                    "
                      onClick={() => {
                        setIsEditing(false)
                        setDescription(incident.description);
                      }}
                    >Cancel</button>
                  </div>
                  
                </div>
              ) : (
                <div className="
                  border dark:border-slate-700 border-slate-400 rounded-sm 
                  px-4 py-4 font-medium dark:text-slate-300 text-slate-700 
                  mt-2 bg-slate-100/50 dark:bg-slate-800/50
                ">
                  {description}
                </div>
              )}
            </div>
        </div>

        {/*left side - command center + intelligence **/}
        <div className='flex shrink-0 gap-4 flex-col w-52'>
          <div>
            <span className="uppercase font-semibold font-mono text-xs text-slate-500 tracking-tight"
            >
              INTELLIGENCE
            </span>
            <div className="
              mt-2 border border-indigo-300 dark:border-indigo-900
              bg-indigo-200/20 dark:bg-indigo-950/30
              rounded-lg p-4 flex flex-col items-center gap-2
              cursor-pointer hover:bg-indigo-200/50 dark:hover:bg-indigo-900/50 transition-colors
             
            "> 
              <span className="text-indigo-400 text-xl">⚡</span>
              <span className="text-indigo-400 text-xs font-bold tracking-wide text-center">
                AI Root Cause Analysis
              </span>
            </div>
          </div>

          {/* Command Center */}
          <div>
            <span className="uppercase font-semibold font-mono text-xs text-slate-500 tracking-tight">
              Command Center
            </span>
            <div className='mt-2'>
              <button className='
                border border-slate-300 dark:border-slate-700 
                rounded-md py-2 mb-1 text-indigo-600 cursor-pointer
                text-xs font-bold tracking-normal uppercase
                hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors w-full
                bg-slate-100 dark:bg-slate-800
                '>
                ATTACH EVIDENCE
              </button>

              {!isResolved ? (
                <div className='flex gap-2 mt-1'>
                  <button
                    onClick={() => mutate({ incidentId: incident.incidentId, status: prevStatus})}
                    disabled={!canGoBack || isPending}
                    className="
                      border border-slate-400 rounded-md px-3 py-2
                      dark:bg-slate-800 bg-slate-100 transition-colors text-sm
                      disabled:opacity-30 cursor-pointer
                    "
                  >
                    <ArrowLeftIcon className='w-4 fill-slate-700 dark:fill-slate-100 stoke-6'/>
                  </button>
                  <button
                   onClick={() => mutate({ incidentId: incident.incidentId, status: nextStatus})}
                   disabled={!canGoAhead || isPending}
                   className="
                    flex-1 bg-indigo-600 hover:bg-indigo-700 rounded-md py-2
                    text-xs font-bold uppercase tracking-tight text-white
                    disabled:opacity-30 cursor-pointer transition-colors
                  "
                  >
                    {isPending ? "Saving..." : `Move To ${nextStatus}`}
                  </button>
                </div>
              ) : (
                <div className='flex flex-col gap-2 mt-1'>
                  <button
                    disabled
                    className="
                      w-full py-2 rounded-md font-bold uppercase text-xs
                    bg-green-600/10 text-green-400 border border-green-500/20
                    "
                  >
                    RESOLVED
                  </button>
                  <button
                    onClick={() =>mutate({ incidentId: incident.incidentId, status: "OPEN"})}
                    disabled={isPending}
                    className="
                      w-full py-2 rounded-md font-bold uppercase text-xs
                    bg-red-600/10 text-red-400 border border-red-500/20
                    hover:bg-red-600/20 transition-colors cursor-pointer
                    "
                  >
                    REOPEN
                  </button>
                </div>
              )}

             
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default IncidentCard;