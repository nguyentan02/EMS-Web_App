/*
  Warnings:

  - You are about to drop the column `duration` on the `UsageHistory` table. All the data in the column will be lost.
  - You are about to drop the column `roomId` on the `UsageHistory` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "UsageHistory" DROP CONSTRAINT "UsageHistory_roomId_fkey";

-- AlterTable
ALTER TABLE "UsageHistory" DROP COLUMN "duration",
DROP COLUMN "roomId";
