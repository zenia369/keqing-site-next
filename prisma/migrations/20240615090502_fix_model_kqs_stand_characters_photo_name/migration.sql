/*
  Warnings:

  - You are about to drop the `KqsStandCharacterPhoto` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "KqsStandCharacterPhoto" DROP CONSTRAINT "KqsStandCharacterPhoto_standCharacterId_fkey";

-- DropTable
DROP TABLE "KqsStandCharacterPhoto";

-- CreateTable
CREATE TABLE "KqsStandCharactersPhoto" (
    "id" TEXT NOT NULL,
    "small" TEXT NOT NULL,
    "default" TEXT NOT NULL,
    "standCharacterId" TEXT NOT NULL,

    CONSTRAINT "KqsStandCharactersPhoto_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "KqsStandCharactersPhoto_standCharacterId_key" ON "KqsStandCharactersPhoto"("standCharacterId");

-- AddForeignKey
ALTER TABLE "KqsStandCharactersPhoto" ADD CONSTRAINT "KqsStandCharactersPhoto_standCharacterId_fkey" FOREIGN KEY ("standCharacterId") REFERENCES "KqsStandCharacters"("id") ON DELETE CASCADE ON UPDATE CASCADE;
