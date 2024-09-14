/*
  Warnings:

  - You are about to drop the column `userId` on the `KqsStandCharacter` table. All the data in the column will be lost.
  - You are about to drop the `KqsStandCharaterPhoto` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `KqsStandCharaters` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "KqsStandCharacter" DROP CONSTRAINT "KqsStandCharacter_userId_fkey";

-- DropForeignKey
ALTER TABLE "KqsStandCharaterPhoto" DROP CONSTRAINT "KqsStandCharaterPhoto_standCharaterId_fkey";

-- AlterTable
ALTER TABLE "KqsStandCharacter" DROP COLUMN "userId";

-- DropTable
DROP TABLE "KqsStandCharaterPhoto";

-- DropTable
DROP TABLE "KqsStandCharaters";

-- CreateTable
CREATE TABLE "KqsstandCharacterPhoto" (
    "id" TEXT NOT NULL,
    "small" TEXT NOT NULL,
    "default" TEXT NOT NULL,
    "standCharacterId" TEXT NOT NULL,

    CONSTRAINT "KqsstandCharacterPhoto_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "KqsStandCharacters" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "background" TEXT NOT NULL,
    "element" "KqsElementalTypes" NOT NULL,

    CONSTRAINT "KqsStandCharacters_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_KqsStandCharacterToKqsUser" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "KqsstandCharacterPhoto_standCharacterId_key" ON "KqsstandCharacterPhoto"("standCharacterId");

-- CreateIndex
CREATE UNIQUE INDEX "KqsStandCharacters_name_key" ON "KqsStandCharacters"("name");

-- CreateIndex
CREATE UNIQUE INDEX "_KqsStandCharacterToKqsUser_AB_unique" ON "_KqsStandCharacterToKqsUser"("A", "B");

-- CreateIndex
CREATE INDEX "_KqsStandCharacterToKqsUser_B_index" ON "_KqsStandCharacterToKqsUser"("B");

-- AddForeignKey
ALTER TABLE "KqsstandCharacterPhoto" ADD CONSTRAINT "KqsstandCharacterPhoto_standCharacterId_fkey" FOREIGN KEY ("standCharacterId") REFERENCES "KqsStandCharacters"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_KqsStandCharacterToKqsUser" ADD CONSTRAINT "_KqsStandCharacterToKqsUser_A_fkey" FOREIGN KEY ("A") REFERENCES "KqsStandCharacter"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_KqsStandCharacterToKqsUser" ADD CONSTRAINT "_KqsStandCharacterToKqsUser_B_fkey" FOREIGN KEY ("B") REFERENCES "KqsUser"("id") ON DELETE CASCADE ON UPDATE CASCADE;
