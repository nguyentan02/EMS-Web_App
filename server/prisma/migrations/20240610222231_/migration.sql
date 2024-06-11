-- CreateTable
CREATE TABLE "History" (
    "id" SERIAL NOT NULL,
    "usageId" INTEGER NOT NULL,

    CONSTRAINT "History_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "History" ADD CONSTRAINT "History_usageId_fkey" FOREIGN KEY ("usageId") REFERENCES "UsageHistory"("id") ON DELETE CASCADE ON UPDATE CASCADE;
