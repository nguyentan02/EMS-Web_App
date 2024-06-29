-- AlterTable
ALTER TABLE "Maintenance_History" ADD COLUMN     "statusId" INTEGER NOT NULL DEFAULT 4;

-- AddForeignKey
ALTER TABLE "Maintenance_History" ADD CONSTRAINT "Maintenance_History_statusId_fkey" FOREIGN KEY ("statusId") REFERENCES "Status"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
