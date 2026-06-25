-- CreateTable
CREATE TABLE "CatchReport" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "waterType" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CatchReport_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "CatchReport_userId_idx" ON "CatchReport"("userId");

-- AddForeignKey
ALTER TABLE "CatchReport" ADD CONSTRAINT "CatchReport_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
