/*
  Warnings:

  - A unique constraint covering the columns `[incidentCode]` on the table `Incident` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `incidentCode` to the `Incident` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Incident" ADD COLUMN     "incidentCode" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "IncidentCounter" (
    "id" INTEGER NOT NULL,
    "incidentCount" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "IncidentCounter_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Incident_incidentCode_key" ON "Incident"("incidentCode");
