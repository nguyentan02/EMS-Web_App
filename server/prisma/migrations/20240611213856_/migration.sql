/*
  Warnings:

  - Added the required column `room_id` to the `UsageHistory` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "UsageHistory" ADD COLUMN     "room_id" INTEGER NOT NULL;
