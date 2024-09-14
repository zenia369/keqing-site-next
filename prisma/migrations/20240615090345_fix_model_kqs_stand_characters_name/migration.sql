/*
  Warnings:

  - You are about to drop the `KqsstandCharacterPhoto` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "KqsstandCharacterPhoto" DROP CONSTRAINT "KqsstandCharacterPhoto_standCharacterId_fkey";

-- DropTable
DROP TABLE "KqsstandCharacterPhoto";

-- CreateTable
CREATE TABLE "KqsStandCharacterPhoto" (
    "id" TEXT NOT NULL,
    "small" TEXT NOT NULL,
    "default" TEXT NOT NULL,
    "standCharacterId" TEXT NOT NULL,

    CONSTRAINT "KqsStandCharacterPhoto_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "KqsStandCharacterPhoto_standCharacterId_key" ON "KqsStandCharacterPhoto"("standCharacterId");

-- AddForeignKey
ALTER TABLE "KqsStandCharacterPhoto" ADD CONSTRAINT "KqsStandCharacterPhoto_standCharacterId_fkey" FOREIGN KEY ("standCharacterId") REFERENCES "KqsStandCharacters"("id") ON DELETE CASCADE ON UPDATE CASCADE;
