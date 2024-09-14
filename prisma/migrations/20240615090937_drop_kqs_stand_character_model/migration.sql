/*
  Warnings:

  - You are about to drop the `KqsStandCharacter` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_KqsStandCharacterToKqsUser` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_KqsStandCharacterToKqsUser" DROP CONSTRAINT "_KqsStandCharacterToKqsUser_A_fkey";

-- DropForeignKey
ALTER TABLE "_KqsStandCharacterToKqsUser" DROP CONSTRAINT "_KqsStandCharacterToKqsUser_B_fkey";

-- DropTable
DROP TABLE "KqsStandCharacter";

-- DropTable
DROP TABLE "_KqsStandCharacterToKqsUser";

-- CreateTable
CREATE TABLE "_KqsStandCharactersToKqsUser" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_KqsStandCharactersToKqsUser_AB_unique" ON "_KqsStandCharactersToKqsUser"("A", "B");

-- CreateIndex
CREATE INDEX "_KqsStandCharactersToKqsUser_B_index" ON "_KqsStandCharactersToKqsUser"("B");

-- AddForeignKey
ALTER TABLE "_KqsStandCharactersToKqsUser" ADD CONSTRAINT "_KqsStandCharactersToKqsUser_A_fkey" FOREIGN KEY ("A") REFERENCES "KqsStandCharacters"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_KqsStandCharactersToKqsUser" ADD CONSTRAINT "_KqsStandCharactersToKqsUser_B_fkey" FOREIGN KEY ("B") REFERENCES "KqsUser"("id") ON DELETE CASCADE ON UPDATE CASCADE;
