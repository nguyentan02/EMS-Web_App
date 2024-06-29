/*
  Warnings:

  - Made the column `maintenanceInventoryId` on table `Transaction` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Transaction" DROP CONSTRAINT "Transaction_maintenanceInventoryId_fkey";

-- AlterTable
ALTER TABLE "Transaction" ALTER COLUMN "maintenanceInventoryId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_maintenanceInventoryId_fkey" FOREIGN KEY ("maintenanceInventoryId") REFERENCES "MaintenanceInventory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
