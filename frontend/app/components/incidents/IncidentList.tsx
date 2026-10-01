import { useIncident } from "../../hooks/useIncident"
import BasicTable from "../shared/BasicTable";
import { Incident, IncidentStatus } from "@/app/types/types";
import { useState } from 'react';
import IncidentCard from '../incidents/IncidentCard';   
import { XMarkIcon, ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import { incidentColumns, collapsedIncidentColumns } from "./columns";

const IncidentList = () => {
  const[page, setPage] = useState(1);
  const pageSize = 6;
  const [selectedIncidentId, setSelectedIncidentId] = useState<string | null>(null);
  const [status, setStatus] = useState<IncidentStatus | undefined>()
  
  const { data, error, isLoading } = useIncident(page, pageSize, status);
  console.log(data)


  if (error) return <div>Something went wrong</div>        
  if (isLoading) return <div>Loading...</div>

  const incidents = data?.data || [];
  const totalIncidents = data?.meta?.total
  const totalPages = data?.meta?.totalPages || 1;

  const selectedIncident = incidents.find(
    (inc)=> inc.incidentId === selectedIncidentId
  ) ?? null;

  const handleRowClick = (incident : Incident) => {

    if(selectedIncidentId === incident.incidentId) {
      setSelectedIncidentId(null)
    } else {
      setSelectedIncidentId(incident.incidentId)
    }
  };

  const maxVisiblePages = 5;

  let startPage = Math.max(1, page - 2);
  let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

  if(endPage - startPage + 1 < maxVisiblePages) {
    startPage = Math.max(1, endPage - maxVisiblePages + 1);
  }

  const pageNumbers = Array.from(
    { length: endPage - startPage + 1 },
    (_, index) => startPage + index
  )

 
  return (
    <div>
      <div className="flex justify-between mb-4 items-center">
        <div className="flex justify-center items-center text-center gap-2">
          <h3 className="font-bold text-lg">Incident Explorer</h3>
          <span className="border rounded-full text-xs font-mono px-1 bg-slate-200 dark:bg-slate-700"> {totalIncidents} items</span>
        </div>
        <div className="bg-slate-200 border dark:bg-slate-800 border-slate-300 dark:border-slate-800 rounded-lg px-1 py-1 flex justify-center gap-2 hover:cursor">
          <button className={`px-4 py-1 rounded-sm text-xs uppercase font-semibold ${
            status === undefined ? "bg-white dark:bg-slate-600 shadow-sm"
            : ""
          }`}
            onClick={() => {
              setStatus(undefined);
              setPage(1);
              setSelectedIncidentId(null)
            }}
          >All</button>
          <button className={`px-4 py-1 rounded-sm text-xs uppercase font-semibold ${
            status === "OPEN" ? "bg-white dark:bg-slate-600 shadow-sm" : ""
          }`}
            onClick={() => {
              setStatus("OPEN")
              setPage(1);
              setSelectedIncidentId(null)
            }}
          >Open</button>
          <button className={`px-4 py-1 text-xs uppercase font-semibold rounded-sm ${
            status === "RESOLVED" ? "bg-white dark:bg-slate-600 shawdow-sm" : ""
          }`}
            onClick={() => {
              setStatus("RESOLVED")
              setPage(1);
              setSelectedIncidentId(null)
            }}
          >Resolved</button>
        </div>
      </div>
      <div className="flex gap-6 overflow-hidden">
        
        <div className={`transition-all duration-300 min-w-0 shrink-0 ${selectedIncident ? 'w-[45%]' : 'w-full'}`}>
          <BasicTable   
            data={incidents} 
            columns={selectedIncident ? collapsedIncidentColumns : incidentColumns} 
            onRowClick={handleRowClick}
            selectedId={selectedIncidentId}
          />
        </div>

        
        {selectedIncident && (
          <div className="flex-1 min-w-0 animate-in slide-in-from-right duration-300">
          <div className="
            flex justify-between px-4 mb-2
          ">
            <h2 className="font-mono text-base text-slate-500 uppercase font-bold tracking-tighter">
              Incident Details
            </h2>
            <button onClick={() => setSelectedIncidentId(null)}>
              <XMarkIcon className="w-6 h-6 stroke-slate-500 stroke-2"/>
            </button>
          
          </div>
          <div className="w-full">
            <IncidentCard 
              incident={selectedIncident}
              key={selectedIncident.incidentId}
            />
          </div>
        </div>
        )}
      </div>
      <div className="flex items-center justify-end mt-6 px-1">
        <div className="flex items-center gap-1">
          <button 
            onClick={() => setPage(page -1)}
            disabled={page === 1}
            className="w-8 h-8 flex items-center justify-center rounded border border-slate-300 dark:border-slate-700 disabled:opacity-40 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <ChevronLeftIcon className="w-4 h-4 stroke-slate-500 stroke-2"/> 
          </button>

          {
            pageNumbers.map((num) => (
              <button
                key={num}
                onClick={() => setPage(num)}
                className={`
                    w-8 h-8 flex items-center justify-center rounded-sm text-sm font-medium transition-colors
                  ${page === num
                    ? 'bg-indigo-600 text-white border border-indigo-600'
                    : ' dark:border-slate-700 hover:bg-slate-200 dark:hover:bg-slate-800'}
                  `}
              >
                {num}
              </button>
            ))
          }

          <button
            onClick={() => setPage(page + 1)}
            disabled={page === totalPages}
            className="w-8 h-8 flex items-center justify-center rounded border border-slate-300 dark:border-slate-700 disabled:opacity-40 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <ChevronRightIcon className="w-4 h-4 stroke-slate-500 stroke-2"/>
          </button>
        </div>
      </div>
    </div>
  )
}


export default IncidentList