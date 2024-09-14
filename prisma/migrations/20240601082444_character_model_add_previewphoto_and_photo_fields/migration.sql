/*
  Warnings:

  - You are about to drop the column `preview` on the `KqsCharacter` table. All the data in the column will be lost.
  - Added the required column `photo` to the `KqsCharacter` table without a default value. This is not possible if the table is not empty.
  - Added the required column `previewPhoto` to the `KqsCharacter` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "KqsCharacter" RENAME COLUMN "preview" TO "photo";
ALTER TABLE "KqsCharacter" ADD COLUMN "previewPhoto" TEXT NOT NULL;
