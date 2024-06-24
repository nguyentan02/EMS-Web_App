-- AlterTable
ALTER TABLE "UsageHistory" ADD COLUMN     "roomId" INTEGER;

-- AddForeignKey
ALTER TABLE "UsageHistory" ADD CONSTRAINT "UsageHistory_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "Room"("id") ON DELETE SET NULL ON UPDATE CASCADE;
