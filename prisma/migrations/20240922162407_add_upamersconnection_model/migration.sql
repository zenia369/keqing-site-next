-- CreateTable
CREATE TABLE "KqsUPamersConnection" (
    "isConnected" BOOLEAN NOT NULL DEFAULT false,
    "connectionId" TEXT,
    "userId" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "KqsUPamersConnection_userId_key" ON "KqsUPamersConnection"("userId");

-- AddForeignKey
ALTER TABLE "KqsUPamersConnection" ADD CONSTRAINT "KqsUPamersConnection_userId_fkey" FOREIGN KEY ("userId") REFERENCES "KqsUser"("id") ON DELETE CASCADE ON UPDATE CASCADE;
