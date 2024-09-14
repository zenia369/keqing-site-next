-- AlterTable
ALTER TABLE "KqsUser" ADD COLUMN     "isUserFinishCreatingProfile" BOOLEAN NOT NULL DEFAULT false,
ALTER COLUMN "isUserCreated" SET DEFAULT true;
