-- AlterTable
ALTER TABLE "Transaction" ADD COLUMN     "maintenanceInventoryId" INTEGER;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_maintenanceInventoryId_fkey" FOREIGN KEY ("maintenanceInventoryId") REFERENCES "MaintenanceInventory"("id") ON DELETE SET NULL ON UPDATE CASCADE;
