/*
  Warnings:

  - You are about to drop the column `picturePhotoId` on the `KqsPictureFilter` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "KqsPictureFilter" DROP CONSTRAINT "KqsPictureFilter_picturePhotoId_fkey";

-- AlterTable
ALTER TABLE "KqsPictureFilter" DROP COLUMN "picturePhotoId";

-- CreateTable
CREATE TABLE "_KqsPictureFilterToKqsPicturePhoto" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_KqsPictureFilterToKqsPicturePhoto_AB_unique" ON "_KqsPictureFilterToKqsPicturePhoto"("A", "B");

-- CreateIndex
CREATE INDEX "_KqsPictureFilterToKqsPicturePhoto_B_index" ON "_KqsPictureFilterToKqsPicturePhoto"("B");

-- AddForeignKey
ALTER TABLE "_KqsPictureFilterToKqsPicturePhoto" ADD CONSTRAINT "_KqsPictureFilterToKqsPicturePhoto_A_fkey" FOREIGN KEY ("A") REFERENCES "KqsPictureFilter"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_KqsPictureFilterToKqsPicturePhoto" ADD CONSTRAINT "_KqsPictureFilterToKqsPicturePhoto_B_fkey" FOREIGN KEY ("B") REFERENCES "KqsPicturePhoto"("id") ON DELETE CASCADE ON UPDATE CASCADE;
