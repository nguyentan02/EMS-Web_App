-- DropForeignKey
ALTER TABLE "Device" DROP CONSTRAINT "Device_roomId_fkey";

-- AlterTable
ALTER TABLE "Device" ALTER COLUMN "roomId" DROP NOT NULL;

-- CreateTable
CREATE TABLE "HistoryTrasfer" (
    "id" SERIAL NOT NULL,
    "deviceId" INTEGER NOT NULL,
    "newLocationId" INTEGER NOT NULL,
    "transferDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "HistoryTrasfer_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Device" ADD CONSTRAINT "Device_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "Room"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HistoryTrasfer" ADD CONSTRAINT "HistoryTrasfer_deviceId_fkey" FOREIGN KEY ("deviceId") REFERENCES "Device"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HistoryTrasfer" ADD CONSTRAINT "HistoryTrasfer_newLocationId_fkey" FOREIGN KEY ("newLocationId") REFERENCES "Room"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
