/*
  Warnings:

  - You are about to drop the column `profileId` on the `KqsPassword` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `KqsProfile` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId]` on the table `KqsPassword` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[email]` on the table `KqsUser` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userId` to the `KqsPassword` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email` to the `KqsUser` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "KqsPassword" DROP CONSTRAINT "KqsPassword_profileId_fkey";

-- DropIndex
DROP INDEX "KqsPassword_profileId_key";

-- DropIndex
DROP INDEX "KqsProfile_email_key";

-- AlterTable
ALTER TABLE "KqsPassword" DROP COLUMN "profileId",
ADD COLUMN     "userId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "KqsProfile" DROP COLUMN "email";

-- AlterTable
ALTER TABLE "KqsUser" ADD COLUMN     "email" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "KqsPassword_userId_key" ON "KqsPassword"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "KqsUser_email_key" ON "KqsUser"("email");

-- AddForeignKey
ALTER TABLE "KqsPassword" ADD CONSTRAINT "KqsPassword_userId_fkey" FOREIGN KEY ("userId") REFERENCES "KqsUser"("id") ON DELETE CASCADE ON UPDATE CASCADE;
