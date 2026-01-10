import prisma from "../lib/prisma.js"
import { IncidentSchema } from "../validations/incidentSchema.js";

export const createIncident = async (req, res) => {
  const { Title, Description, Status, Priority} = IncidentSchema.parse(req.body);

  console.log(req.body);

  console.log(req.userId);
  console.log(req.userId.userId);

  try{
    const incident = await prisma.Incident.create({
    data: {
      Title,
      Description,
      Priority: Priority || "LOW", 
      Status: Status || "TO_dO",
      ReporterId: req.userId.userId,
    }
  });
  res.status(201).json(incident);
  } catch (err) {
    res.status(400).json({
      error: err.message 
    });
  } 
}