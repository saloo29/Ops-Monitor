-- CreateEnum
CREATE TYPE "Role" AS ENUM ('USER', 'ADMIN');

-- CreateEnum
CREATE TYPE "Priority" AS ENUM ('LOW', 'MEDIUM', 'HIGH', 'CRITICAL');

-- CreateEnum
CREATE TYPE "IncidentStatus" AS ENUM ('TODO', 'INPROGRESS', 'INREVIEW', 'RESOLVED', 'CLOSED', 'REOPENED');

-- CreateEnum
CREATE TYPE "IncidentEventType" AS ENUM ('CREATED', 'STATUSCHANGE', 'PRIORITYCHANGE', 'COMMENT', 'ALERTRECIEVED');

-- CreateTable
CREATE TABLE "User" (
    "userId" TEXT NOT NULL,
    "Email" TEXT NOT NULL,
    "Username" TEXT NOT NULL,
    "Password" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'USER',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("userId")
);

-- CreateTable
CREATE TABLE "Incident" (
    "IncidentId" TEXT NOT NULL,
    "Title" TEXT NOT NULL,
    "Description" TEXT NOT NULL,
    "Status" "IncidentStatus" NOT NULL DEFAULT 'TODO',
    "Priority" "Priority" NOT NULL DEFAULT 'LOW',
    "Evidence" JSONB,
    "ReporterId" TEXT NOT NULL,
    "AssigneeId" TEXT NOT NULL,
    "CreatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "ResolvedAt" TIMESTAMP(3),

    CONSTRAINT "Incident_pkey" PRIMARY KEY ("IncidentId")
);

-- CreateTable
CREATE TABLE "IncidentEvent" (
    "AlertId" TEXT NOT NULL,
    "IncidentId" TEXT NOT NULL,
    "ActorId" TEXT NOT NULL,
    "EventType" "IncidentEventType" NOT NULL DEFAULT 'CREATED',
    "Message" TEXT NOT NULL,
    "TimeStamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "IncidentEvent_pkey" PRIMARY KEY ("AlertId")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_Email_key" ON "User"("Email");

-- AddForeignKey
ALTER TABLE "Incident" ADD CONSTRAINT "Incident_ReporterId_fkey" FOREIGN KEY ("ReporterId") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Incident" ADD CONSTRAINT "Incident_AssigneeId_fkey" FOREIGN KEY ("AssigneeId") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "IncidentEvent" ADD CONSTRAINT "IncidentEvent_IncidentId_fkey" FOREIGN KEY ("IncidentId") REFERENCES "Incident"("IncidentId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "IncidentEvent" ADD CONSTRAINT "IncidentEvent_ActorId_fkey" FOREIGN KEY ("ActorId") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;
