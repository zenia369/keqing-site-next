-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "KqsElementalTypes" ADD VALUE 'Pyro';
ALTER TYPE "KqsElementalTypes" ADD VALUE 'Anemo';
ALTER TYPE "KqsElementalTypes" ADD VALUE 'Geo';
ALTER TYPE "KqsElementalTypes" ADD VALUE 'Hydro';
ALTER TYPE "KqsElementalTypes" ADD VALUE 'Cryo';

-- CreateTable
CREATE TABLE "KqsStandCharaterPhoto" (
    "id" TEXT NOT NULL,
    "small" TEXT NOT NULL,
    "default" TEXT NOT NULL,
    "standCharaterId" TEXT NOT NULL,

    CONSTRAINT "KqsStandCharaterPhoto_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "KqsStandCharaters" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "background" TEXT NOT NULL,
    "element" "KqsElementalTypes" NOT NULL,

    CONSTRAINT "KqsStandCharaters_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "KqsStandCharaterPhoto_standCharaterId_key" ON "KqsStandCharaterPhoto"("standCharaterId");

-- AddForeignKey
ALTER TABLE "KqsStandCharaterPhoto" ADD CONSTRAINT "KqsStandCharaterPhoto_standCharaterId_fkey" FOREIGN KEY ("standCharaterId") REFERENCES "KqsStandCharaters"("id") ON DELETE CASCADE ON UPDATE CASCADE;
