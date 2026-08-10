import { useIncident } from "../../hooks/useIncident"
import BasicTable from "../shared/BasicTable";
import { Incident } from "@/app/types/types";
import { useState } from 'react';
import IncidentCard from '../incidents/IncidentCard';   
import { XMarkIcon } from "@heroicons/react/24/solid";
import { incidentColumns, collapsedIncidentColumns } from "./columns";

const IncidentList = () => {
  const[page, setPage] = useState(1);
  const pageSize = 10;
  const [selectedIncidentId, setSelectedIncidentId] = useState<string | null>(null);
  
  const { data, error, isLoading } = useIncident(page, pageSize);
  console.log(data)


  if (error) return <div>Something went wrong</div>        
  if (isLoading) return <div>Loading...</div>

  const incidents = data?.data || [];
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
 
  return (
    <div className="flex gap-6 overflow-hidden">
      <div className={`transition-all duration-300 min-w-0 shrink-0 ${selectedIncident ? 'w-[35%]' : 'w-full'}`}>
        <BasicTable   
          data={incidents} 
          columns={selectedIncident ? collapsedIncidentColumns : incidentColumns} 
          page={page}
          setPage={setPage}
          totalPages={totalPages}
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
  )
}


export default IncidentList