/*
  Warnings:

  - You are about to drop the column `picturePhotoId` on the `KqsPictureLabel` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "KqsPictureLabel" DROP CONSTRAINT "KqsPictureLabel_picturePhotoId_fkey";

-- AlterTable
ALTER TABLE "KqsPictureLabel" DROP COLUMN "picturePhotoId";
