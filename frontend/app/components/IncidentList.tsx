import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { useIncident } from "../hooks/useIncident"

const IncidentList = () => {
  const {data: incidents, error } = useIncident();

  if(error){
    return <div>something went wrong</div>
  };


  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-25">INCIDENT</TableHead>
          <TableHead>SEVERITY</TableHead>
          <TableHead>STATUS</TableHead>
          <TableHead className="text-right">TEAM</TableHead>
          <TableHead className="text-right">CREATED</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {incidents?.map((incident) => (
          <TableRow key={incident.incidentId}>
            <TableCell className="font-medium">{incident.title}</TableCell>
            <TableCell>{incident.priority}</TableCell>
            <TableCell>{incident.status}</TableCell>
            <TableCell className="text-right">{incident.createdAt}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}


export default IncidentList;