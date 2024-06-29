/*
  Warnings:

  - You are about to drop the column `statusId` on the `Maintenance_History` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Maintenance_History" DROP CONSTRAINT "Maintenance_History_statusId_fkey";

-- AlterTable
ALTER TABLE "Maintenance_History" DROP COLUMN "statusId";
