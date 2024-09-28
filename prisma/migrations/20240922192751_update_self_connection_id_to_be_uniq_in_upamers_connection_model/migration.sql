/*
  Warnings:

  - A unique constraint covering the columns `[selfConnectionId]` on the table `KqsUPamersConnection` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "KqsUPamersConnection_selfConnectionId_key" ON "KqsUPamersConnection"("selfConnectionId");
