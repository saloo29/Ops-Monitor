import prisma from "../lib/prisma.js"
import { IncidentSchema } from "../validations/incidentSchema.js";
import { PRIORITY } from "../utils/enums.js";

export const createIncident = async (req, res) => {
  const { Title, Description, Status, Priority} = IncidentSchema.parse(req.body);

  console.log(req.body);

  console.log(req.user.userId);

  try{
    const incident = await prisma.Incident.create({
    data: {
      Title,
      Description,
      Priority: Priority || PRIORITY.LOW, 
      Status: Status,
      ReporterId: req.user.userId,
    }
  });
  return res.status(201).json(incident);
  } catch (err) {
    return res.status(400).json({
      error: err.message 
    });
  } 
}

export const getIncidents = async (req, res) => {
  try{
    const incidents = await prisma.Incident.findMany();

    console.log(incidents);
     
    return res.status(200).json({
      message: "Incidents fetched successfully",
      incidents
     });
  } catch(err) {
    return res.status(500).json({
      error: err.message
    });
  }
}