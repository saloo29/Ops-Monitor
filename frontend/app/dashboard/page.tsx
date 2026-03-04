"use client"

import { useIncident } from "../hooks/useIncident"


const Dashboard = () => {
  const {data: incidents, error } = useIncident();

  if(error){
    return <div>something went wrong</div>
  };

  const data = incidents?.map((incident) => (
    <li key={incident.incidentId}>{incident.title} {incident.description}</li>
  ))


  console.log(incidents)
  return (
    <div>
      <h1>hello</h1>
      {data}
    </div>
  )
}

export default Dashboard;