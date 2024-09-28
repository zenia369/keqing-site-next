/*
  Warnings:

  - You are about to drop the column `isConnected` on the `KqsUPamersConnection` table. All the data in the column will be lost.
  - You are about to drop the column `selfConnectionId` on the `KqsUPamersConnection` table. All the data in the column will be lost.
  - The required column `id` was added to the `KqsUPamersConnection` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- DropIndex
DROP INDEX "KqsUPamersConnection_selfConnectionId_key";

-- AlterTable
ALTER TABLE "KqsUPamersConnection" DROP COLUMN "isConnected",
DROP COLUMN "selfConnectionId",
ADD COLUMN     "id" TEXT NOT NULL,
ADD CONSTRAINT "KqsUPamersConnection_pkey" PRIMARY KEY ("id");
