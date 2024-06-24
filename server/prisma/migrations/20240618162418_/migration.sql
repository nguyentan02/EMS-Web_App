/*
  Warnings:

  - You are about to drop the column `roomId` on the `Device` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Device" DROP CONSTRAINT "Device_roomId_fkey";

-- AlterTable
ALTER TABLE "Device" DROP COLUMN "roomId";
