import prisma from "../lib/prisma.js"
import { IncidentSchema, PatchIncidentSchema } from "../validations/incidentSchema.js";
import { PRIORITY, STATUS } from "../utils/enums.js";
import { Prisma } from "@prisma/client";
import { generateIncidentCode } from "../utils/generateIncidentCode.js";


export const createIncident = async (req, res) => {
  const { title, description, status, priority} = IncidentSchema.parse(req.body);

  console.log(req.body);
  console.log(req.user);

  const MAX_RETRIES = 5;

  for(let attempt = 0; attempt < MAX_RETRIES; attempt++) {
    try {
      const incident = await prisma.$transaction(async (tx) => {
        const incidentCode = await generateIncidentCode(tx);
        
        return tx.incident.create({
          data:{
            title,
            description,
            priority: priority || PRIORITY.LOW,
            status: status || STATUS.OPEN,
            incidentCode,
            reporterId: "96efe861-7b56-4e6b-9104-c03d9a909de3",
          }
        })
      }, {
        isolationLevel: Prisma.TransactionIsolationLevel.Serializable,
      });

      return res.status(201).json({
        message: " Incident created successfully",
        incident
      });
    }

    catch (err) {
        console.error(err);


      const isUniqueViolation = err?.code === 'P2002';
      const isSerializationFailure = err?.code === '40001';
      if((isUniqueViolation || isSerializationFailure) && attempt < MAX_RETRIES - 1) {
        await new Promise (res => 
          setTimeout(res, 50 * (attempt + 1))
        );
        
        continue;
      }
      return res.status(400).json({
        message: "Failed to create incident",
        error: err
      })
    }
  } 
}

export const getIncidents = async (req, res) => {
  try{
    const page =  parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const sort = req.query.sort ||  "createdAt";
    const search = req.query.search || "";

    const skip = (page - 1) * limit;

    const [incidents, total] = await Promise.all([
      await prisma.incident.findMany({
        where:{
            OR: [
              {title: {contains: search, mode: "insensitive"}},
              {description: {contains: search, mode: "insensitive"}}
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
            {title: {contains: search, mode: "insensitive"}},
            {description: {contains: search, mode: "insensitive"}}
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
      message: err.message
    });
  }
}

export const getIncidentById = async (req, res) => {
  try{
    const incidentId = req.params.id;

    const incident = await prisma.incident.findUnique({
      where: {
          incidentId : incidentId
      }
    });

    if(!incident){
      return res.status(404).json({
        message: "Incident not found."
      });
    }
    
    return res.status(200).json({
      incident
    })
  } catch(err) {
    return res.status(500).json({
      message: err.message
    })
  }
}


export const patchIncident = async (req, res) =>{
  try{
    const {id} = req.params;
    const {status, priority, assigneeId, description} = PatchIncidentSchema.parse(req.body);

    console.log(status);
    console.log("req.body looks like:", req.body);

    const data = {};

    if(status) data.status = status;
    if(priority) data.priority = priority;
    if(assigneeId)  data.assigneeId = assigneeId;
    if(description) data.description = description;

    console.log("data looks like:", data);

    if (status) { 
      if (status === "RESOLVED") {
        data.resolvedAt = new Date();
      } else {
        data.resolvedAt = null;  
      }
    }

    if(Object.keys(data).length === 0){
      return res.status(400).json({
        message: "No data provided to update Incident."
      })
    }

    const updatedIncident = await prisma.incident.update({
      where: {
        incidentId : id
      },
      data
    });

    console.log("updatedincident looks", updatedIncident)

    res.status(201).json({
      message: "Incident updated successfully!",
      updatedIncident
    });
  } catch(err) {
    return res.status(500).json({
      message: err.message
    })
  }

}