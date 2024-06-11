/*
  Warnings:

  - You are about to drop the column `room_id` on the `UsageHistory` table. All the data in the column will be lost.
  - Added the required column `roomId` to the `UsageHistory` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "UsageHistory" DROP COLUMN "room_id",
ADD COLUMN     "roomId" INTEGER NOT NULL;
