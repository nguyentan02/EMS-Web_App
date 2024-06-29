-- DropForeignKey
ALTER TABLE "Maintenance_History" DROP CONSTRAINT "Maintenance_History_deviceId_fkey";

-- AlterTable
ALTER TABLE "Maintenance_History" ALTER COLUMN "description" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Maintenance_History" ADD CONSTRAINT "Maintenance_History_deviceId_fkey" FOREIGN KEY ("deviceId") REFERENCES "Device"("id") ON DELETE CASCADE ON UPDATE CASCADE;
