/*
  Warnings:

  - A unique constraint covering the columns `[value]` on the table `KqsPictureFilter` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[value]` on the table `KqsPictureLabel` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "KqsPictureFilter" ADD COLUMN     "pictureLabelId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "KqsPictureFilter_value_key" ON "KqsPictureFilter"("value");

-- CreateIndex
CREATE UNIQUE INDEX "KqsPictureLabel_value_key" ON "KqsPictureLabel"("value");

-- AddForeignKey
ALTER TABLE "KqsPictureFilter" ADD CONSTRAINT "KqsPictureFilter_pictureLabelId_fkey" FOREIGN KEY ("pictureLabelId") REFERENCES "KqsPictureLabel"("id") ON DELETE CASCADE ON UPDATE CASCADE;
