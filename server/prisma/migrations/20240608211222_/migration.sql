/*
  Warnings:

  - You are about to drop the `HistoryTrasfer` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "HistoryTrasfer" DROP CONSTRAINT "HistoryTrasfer_deviceId_fkey";

-- DropForeignKey
ALTER TABLE "HistoryTrasfer" DROP CONSTRAINT "HistoryTrasfer_newLocationId_fkey";

-- DropTable
DROP TABLE "HistoryTrasfer";

-- CreateTable
CREATE TABLE "HistoryTransfer" (
    "id" SERIAL NOT NULL,
    "deviceId" INTEGER NOT NULL,
    "oldLocationId" INTEGER NOT NULL,
    "newLocationId" INTEGER NOT NULL,
    "transferDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "HistoryTransfer_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "HistoryTransfer" ADD CONSTRAINT "HistoryTransfer_deviceId_fkey" FOREIGN KEY ("deviceId") REFERENCES "Device"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HistoryTransfer" ADD CONSTRAINT "HistoryTransfer_oldLocationId_fkey" FOREIGN KEY ("oldLocationId") REFERENCES "Room"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HistoryTransfer" ADD CONSTRAINT "HistoryTransfer_newLocationId_fkey" FOREIGN KEY ("newLocationId") REFERENCES "Room"("id") ON DELETE CASCADE ON UPDATE CASCADE;
