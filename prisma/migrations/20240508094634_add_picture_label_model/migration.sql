/*
  Warnings:

  - You are about to drop the column `name` on the `KqsPictureFilter` table. All the data in the column will be lost.
  - You are about to drop the column `values` on the `KqsPictureFilter` table. All the data in the column will be lost.
  - Added the required column `value` to the `KqsPictureFilter` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "KqsPictureFilter" DROP COLUMN "name",
DROP COLUMN "values",
ADD COLUMN     "value" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "KqsPictureLabel" (
    "id" TEXT NOT NULL,
    "picturePhotoId" TEXT,
    "value" TEXT NOT NULL,

    CONSTRAINT "KqsPictureLabel_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "KqsPictureLabel" ADD CONSTRAINT "KqsPictureLabel_picturePhotoId_fkey" FOREIGN KEY ("picturePhotoId") REFERENCES "KqsPicturePhoto"("id") ON DELETE SET NULL ON UPDATE CASCADE;
