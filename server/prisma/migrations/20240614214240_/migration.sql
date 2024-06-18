-- DropForeignKey
ALTER TABLE "History" DROP CONSTRAINT "History_usageId_fkey";

-- AddForeignKey
ALTER TABLE "History" ADD CONSTRAINT "History_usageId_fkey" FOREIGN KEY ("usageId") REFERENCES "UsageHistory"("id") ON DELETE NO ACTION ON UPDATE CASCADE;
