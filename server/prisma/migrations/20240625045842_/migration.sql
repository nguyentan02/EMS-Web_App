/*
  Warnings:

  - You are about to drop the column `roomId` on the `UsageHistory` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "UsageHistory" DROP CONSTRAINT "UsageHistory_roomId_fkey";

-- AlterTable
ALTER TABLE "Device" ADD COLUMN     "roomId" INTEGER NOT NULL DEFAULT 10;

-- AlterTable
ALTER TABLE "Maintenance_History" ADD COLUMN     "usageHistoryId" INTEGER;

-- AlterTable
ALTER TABLE "UsageHistory" DROP COLUMN "roomId";

-- AddForeignKey
ALTER TABLE "Device" ADD CONSTRAINT "Device_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "Room"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Maintenance_History" ADD CONSTRAINT "Maintenance_History_usageHistoryId_fkey" FOREIGN KEY ("usageHistoryId") REFERENCES "UsageHistory"("id") ON DELETE SET NULL ON UPDATE CASCADE;
