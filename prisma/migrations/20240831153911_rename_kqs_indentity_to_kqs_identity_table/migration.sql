/*
  Warnings:

  - You are about to drop the `KqsIndentity` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "KqsIndentity" DROP CONSTRAINT "KqsIndentity_userId_fkey";

-- DropTable
DROP TABLE "KqsIndentity";

-- CreateTable
CREATE TABLE "KqsIdentity" (
    "indentityId" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "userId" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "KqsIdentity_email_key" ON "KqsIdentity"("email");

-- CreateIndex
CREATE UNIQUE INDEX "KqsIdentity_userId_key" ON "KqsIdentity"("userId");

-- AddForeignKey
ALTER TABLE "KqsIdentity" ADD CONSTRAINT "KqsIdentity_userId_fkey" FOREIGN KEY ("userId") REFERENCES "KqsUser"("id") ON DELETE CASCADE ON UPDATE CASCADE;
