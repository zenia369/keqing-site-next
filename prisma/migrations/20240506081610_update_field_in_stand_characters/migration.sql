/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `KqsStandCharaters` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "KqsStandCharaters_name_key" ON "KqsStandCharaters"("name");
