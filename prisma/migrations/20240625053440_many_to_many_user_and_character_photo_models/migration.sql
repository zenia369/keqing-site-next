/*
  Warnings:

  - You are about to drop the `KqsFavorite` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "KqsFavorite" DROP CONSTRAINT "KqsFavorite_userId_fkey";

-- DropTable
DROP TABLE "KqsFavorite";

-- CreateTable
CREATE TABLE "_KqsCharacterPhotoToKqsUser" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_KqsCharacterPhotoToKqsUser_AB_unique" ON "_KqsCharacterPhotoToKqsUser"("A", "B");

-- CreateIndex
CREATE INDEX "_KqsCharacterPhotoToKqsUser_B_index" ON "_KqsCharacterPhotoToKqsUser"("B");

-- AddForeignKey
ALTER TABLE "_KqsCharacterPhotoToKqsUser" ADD CONSTRAINT "_KqsCharacterPhotoToKqsUser_A_fkey" FOREIGN KEY ("A") REFERENCES "KqsCharacterPhoto"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_KqsCharacterPhotoToKqsUser" ADD CONSTRAINT "_KqsCharacterPhotoToKqsUser_B_fkey" FOREIGN KEY ("B") REFERENCES "KqsUser"("id") ON DELETE CASCADE ON UPDATE CASCADE;
