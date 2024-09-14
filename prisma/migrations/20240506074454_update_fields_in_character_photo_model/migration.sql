/*
  Warnings:

  - You are about to drop the column `path` on the `KqsCharacterPhoto` table. All the data in the column will be lost.
  - Added the required column `default` to the `KqsCharacterPhoto` table without a default value. This is not possible if the table is not empty.
  - Added the required column `small` to the `KqsCharacterPhoto` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "KqsCharacterPhoto" DROP COLUMN "path",
ADD COLUMN     "default" TEXT NOT NULL,
ADD COLUMN     "small" TEXT NOT NULL;
