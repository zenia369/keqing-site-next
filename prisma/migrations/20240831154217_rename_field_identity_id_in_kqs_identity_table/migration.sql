/*
  Warnings:

  - You are about to drop the column `indentityId` on the `KqsIdentity` table. All the data in the column will be lost.
  - Added the required column `identityId` to the `KqsIdentity` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "KqsIdentity" DROP COLUMN "indentityId",
ADD COLUMN     "identityId" TEXT NOT NULL;
