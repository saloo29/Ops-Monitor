import { ColumnDef } from "@tanstack/react-table";
import { useIncident } from "../../hooks/useIncident"
import SeverityBadge from "../shared/SeverityBadge";
import StatusDot from "../shared/StatusDot";
import { formatDate } from "@/lib/formatDate"
import BasicTable from "../shared/BasicTable";
import { Incident } from "@/app/types/types";
import { useState } from 'react';
import IncidentCard from '../incidents/IncidentCard';   
import { XMarkIcon } from "@heroicons/react/24/solid";

const columns: ColumnDef<Incident>[] = [
  {
    accessorKey: "title",
    header: "INCIDENT",
    cell: ({ row }) => (
      <div className='flex flex-col gap-1'>
        <span className='font-bold text-slate-900 dark:text-slate-100 p-2'>
          {row.original.title}
        </span>
        {/* <span>
          {row.original.incidentId}
        </span> */}
      </div>
    )
  },
  {
    accessorKey: "priority",
    header: "SEVERITY",
    cell: ({ row }) => <SeverityBadge level={row.original.priority} />,
    sortingFn: (rowA, rowB) => {
      const order = { CRITICAL: 4, HIGH: 3, MEDIUM: 2, LOW: 1}
      return order[rowA.original.priority] - order[rowB.original.priority]
    }
  },
  {
    accessorKey: "status", 
    header: "STATUS",
    cell: ({ row }) => <StatusDot status={row.original.status} />
  },
  {
    accessorKey: "createdAt",
    header: "CREATED",
    cell: ({ row }) => formatDate(row.original.createdAt)
  },
]

const IncidentList = () => {
  const[page, setPage] = useState(1);
  const pageSize = 10;
  const [selectedIncident, setSelectedIncident] = useState<Incident | null>(null);
  
  const { data, error, isLoading } = useIncident(page, pageSize);
  console.log(data)


  if (error) return <div>Something went wrong</div>        
  if (isLoading) return <div>Loading...</div>

  const incidents = data?.data || [];
  const totalPages = data?.meta?.totalPages || 1;

  const handleRowClick = (incident : Incident) => {

    if(selectedIncident?.incidentId === incident.incidentId) {
      setSelectedIncident(null)
    } else {
      setSelectedIncident(incident)
    }
  };
 
  return (
    <div className="flex gap-6">
      <div className="flex-1">
        <BasicTable   
          data={incidents} 
          columns={columns} 
          page={page}
          setPage={setPage}
          totalPages={totalPages}
          onRowClick={handleRowClick}
        />
      </div>
      
      {selectedIncident && (
        <div>
         <div className="
          flex justify-between px-4 mb-2
        ">
          <h2 className="
            font-mono text-base 
            text-slate-500 text-base
            uppercase font-bold tracking-tighter
          ">
            Incident Details
          </h2>
          <button onClick={() => setSelectedIncident(null)}>
            <XMarkIcon className="
              w-6 h-6 stroke-slate-500 stroke-2
            "/>
          </button>
         
        </div>
        <div className="w-[700px] min-h">
          <IncidentCard 
            incident={selectedIncident}
          />
        </div>
      </div>
      )}
      
    </div>
  )
}


export default IncidentList