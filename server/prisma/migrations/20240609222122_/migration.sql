/*
  Warnings:

  - Added the required column `roomId` to the `UsageHistory` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "UsageHistory" ADD COLUMN     "roomId" INTEGER NOT NULL,
ALTER COLUMN "purpose" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "UsageHistory" ADD CONSTRAINT "UsageHistory_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "Room"("id") ON DELETE CASCADE ON UPDATE CASCADE;
