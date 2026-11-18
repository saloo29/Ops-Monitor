import prisma from "../lib/prisma.js"

export const getTeams = async (req, res) => {
  console.log("Team controller hit")

  try {
    const teams = await prisma.team.findMany({
      include: {
        members: {
          select: {
            userId: true,
            username: true,
            email: true,
            role: true,
          }
        },
        incidents: {
          where: { status: { not: 'RESOLVED' } },
          select: { 
            incidentId: true, 
            status: true, 
            priority: true 
          }
        }
      }
    });

    return res.status(200).json({ data: teams });
  } catch (err) {
    console.error("get teams error:", err)

    return res.status(500).json({ message: err.message });
  }
}

export const getTeamById = async (req, res) => {
  console.log("Api getteamsbyId is hit")

  try {
    const { teamId } = req.params;

    const team = await prisma.team.findUnique({
      where: { teamId },
      select: {
        teamId: true,
        name: true,
        createdAt: true,

        members: {
          select: {
            userId: true,
            username: true,
            email: true,
            role: true,
          }
        },

        incidents: {
          where: { 
            status: {
            not: 'RESOLVED'
          }
        },
          orderBy: { createdAt: 'desc' }
        },
      }
    });

    if (!team) return res.status(404).json({ message: 'Team not found' });

    return res.status(200).json({ 
      message: "Team found successfully!",
      data: team 
    });
  } catch (err) {
    console.error("get team by id error:", err);

    return res.status(500).json({ 
      message: err.message 
    });
  }
}