export async function  generateIncidentCode(tx) {
  const year = new Date().getFullYear();

  const counter = await tx.incidentCounter.upsert({
    where: { id: 1},
    update: { incidentCount: {increment: 1 } },
    create: { id: 1, incidentCount: 1},
  });

  return `INC-${year}-${String(counter.incidentCount).padStart(4, '0')}`;
}