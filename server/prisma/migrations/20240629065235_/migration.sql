-- DropForeignKey
ALTER TABLE "Transaction" DROP CONSTRAINT "Transaction_maintenanceInventoryId_fkey";

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_maintenanceInventoryId_fkey" FOREIGN KEY ("maintenanceInventoryId") REFERENCES "MaintenanceInventory"("id") ON DELETE CASCADE ON UPDATE CASCADE;
