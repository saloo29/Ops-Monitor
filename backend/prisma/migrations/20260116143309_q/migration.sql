-- DropForeignKey
ALTER TABLE "Incident" DROP CONSTRAINT "Incident_AssigneeId_fkey";

-- AlterTable
ALTER TABLE "Incident" ALTER COLUMN "AssigneeId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Incident" ADD CONSTRAINT "Incident_AssigneeId_fkey" FOREIGN KEY ("AssigneeId") REFERENCES "User"("userId") ON DELETE SET NULL ON UPDATE CASCADE;
