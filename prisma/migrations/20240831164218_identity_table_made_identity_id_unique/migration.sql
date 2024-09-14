/*
  Warnings:

  - A unique constraint covering the columns `[identityId]` on the table `KqsIdentity` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "KqsIdentity_identityId_key" ON "KqsIdentity"("identityId");
