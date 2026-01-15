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
    const page =  parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 6;
    const sort = req.query.sort ||  "createdAt";
    const search = req.query.search || "";


    const skip = (page - 1) * limit;

    const [incidents, total] = await Promise.all([
      await prisma.Incident.findMany({
        where:{
            OR: [
              {Title: {contains: search, mode: "insensitive"}},
              {Description: {contains: search, mode: "insensitive"}}
            ]
        },
        skip: skip,
        take: limit,
        orderBy: {
          [sort]: "desc"
        }
      }),

      prisma.Incident.count({
        where: {
          OR: [
            {Title: {contains: search, mode: "insensitive"}},
            {Description: {contains: search, mode: "insensitive"}}
          ]
        }
      })
    ]);
    console.log(incidents);
     
    return res.status(200).json({
      message: "Incidents fetched successfully",
      data: incidents, 
      meta: {
        page,
        limit,
        total,
        totalPages : Math.ceil(total/limit)
      }
     });
  } catch(err) {
    return res.status(500).json({
      error: err.message
    });
  }
}

