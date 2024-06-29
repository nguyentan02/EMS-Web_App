/*
  Warnings:

  - You are about to drop the column `inventoryId` on the `Maintenance_History` table. All the data in the column will be lost.
  - You are about to drop the column `usageHistoryId` on the `Maintenance_History` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Maintenance_History" DROP CONSTRAINT "Maintenance_History_inventoryId_fkey";

-- DropForeignKey
ALTER TABLE "Maintenance_History" DROP CONSTRAINT "Maintenance_History_usageHistoryId_fkey";

-- AlterTable
ALTER TABLE "Maintenance_History" DROP COLUMN "inventoryId",
DROP COLUMN "usageHistoryId";

-- CreateTable
CREATE TABLE "MaintenanceInventory" (
    "id" SERIAL NOT NULL,
    "maintenanceHistoryId" INTEGER NOT NULL,
    "inventoryId" INTEGER NOT NULL,
    "quantityMater" INTEGER NOT NULL,

    CONSTRAINT "MaintenanceInventory_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "MaintenanceInventory" ADD CONSTRAINT "MaintenanceInventory_maintenanceHistoryId_fkey" FOREIGN KEY ("maintenanceHistoryId") REFERENCES "Maintenance_History"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MaintenanceInventory" ADD CONSTRAINT "MaintenanceInventory_inventoryId_fkey" FOREIGN KEY ("inventoryId") REFERENCES "Inventory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
