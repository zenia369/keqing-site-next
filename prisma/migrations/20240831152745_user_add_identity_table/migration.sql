/*
  Warnings:

  - You are about to drop the column `email` on the `KqsUser` table. All the data in the column will be lost.
  - You are about to drop the `KqsPassword` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "KqsPassword" DROP CONSTRAINT "KqsPassword_userId_fkey";

-- DropIndex
DROP INDEX "KqsUser_email_key";

-- AlterTable
ALTER TABLE "KqsUser" DROP COLUMN "email",
ADD COLUMN     "isUserCreated" BOOLEAN NOT NULL DEFAULT false;

-- DropTable
DROP TABLE "KqsPassword";

-- CreateTable
CREATE TABLE "KqsIndentity" (
    "indentityId" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "userId" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "KqsIndentity_email_key" ON "KqsIndentity"("email");

-- CreateIndex
CREATE UNIQUE INDEX "KqsIndentity_userId_key" ON "KqsIndentity"("userId");

-- AddForeignKey
ALTER TABLE "KqsIndentity" ADD CONSTRAINT "KqsIndentity_userId_fkey" FOREIGN KEY ("userId") REFERENCES "KqsUser"("id") ON DELETE CASCADE ON UPDATE CASCADE;
