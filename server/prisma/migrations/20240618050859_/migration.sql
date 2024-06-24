-- DropForeignKey
ALTER TABLE "UsageHistory" DROP CONSTRAINT "UsageHistory_roomId_fkey";

-- AlterTable
ALTER TABLE "UsageHistory" ALTER COLUMN "roomId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "UsageHistory" ADD CONSTRAINT "UsageHistory_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "Room"("id") ON DELETE SET NULL ON UPDATE CASCADE;
