/*
  Warnings:

  - Added the required column `selfConnectionId` to the `KqsUPamersConnection` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "KqsUPamersConnection" ADD COLUMN     "selfConnectionId" TEXT NOT NULL;
