import { PrismaClient, Prisma } from '@prisma/client';
import { generateIncidentCode } from '../src/utils/generateIncidentCode.js';
import { incidentsData } from './data/incident.js';

const prisma = new PrismaClient();

async function main() {
  console.log("Starting seed...");

  // 1. Create a Seed User using upsert (prevents duplicates)
  const seedUser = await prisma.user.upsert({
    where: { email: 'admin@opsmonitor.com' },
    update: {},
    create: {
      email: 'admin@opsmonitor.com',
      password: 'password123', // Remember to hash in production!
      username: 'System Admin',
      role: 'ADMIN',
      updatedAt: new Date(),
    },
  });

  console.log(`Using reporter: ${seedUser.username}`);

  // 2. Clear old incidents (optional - remove if you want to keep them)
  await prisma.incident.deleteMany({});

  // 3. Batch create incidents
  for (const item of incidentsData) {
    await prisma.$transaction(async (tx) => {
      const incidentCode = await generateIncidentCode(tx);

       await prisma.incident.create({
        data: {
          title: item.title,
          description: item.description,
          status: item.status,
          priority: item.priority,
          reporterId: seedUser.userId,
          createdAt: new Date(item.createdAt),
          resolvedAt: item.status === "RESOLVED" ? new Date() : null,
          incidentCode
        },
      });
    },
      {
        isolationLevel: Prisma.TransactionIsolationLevel.Serializable,
      }
    )
   
  }

  console.log(`Seeded ${incidentsData.length} incidents successfully.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });