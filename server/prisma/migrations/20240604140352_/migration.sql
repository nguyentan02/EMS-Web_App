/*
  Warnings:

  - You are about to drop the column `category_id` on the `Device` table. All the data in the column will be lost.
  - You are about to drop the column `room_id` on the `Device` table. All the data in the column will be lost.
  - You are about to drop the column `status_id` on the `Device` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Device" DROP CONSTRAINT "Device_category_id_fkey";

-- DropForeignKey
ALTER TABLE "Device" DROP CONSTRAINT "Device_room_id_fkey";

-- DropForeignKey
ALTER TABLE "Device" DROP CONSTRAINT "Device_status_id_fkey";

-- AlterTable
ALTER TABLE "Device" DROP COLUMN "category_id",
DROP COLUMN "room_id",
DROP COLUMN "status_id",
ADD COLUMN     "categoryId" INTEGER,
ADD COLUMN     "roomId" INTEGER,
ADD COLUMN     "statusId" INTEGER;

-- AddForeignKey
ALTER TABLE "Device" ADD CONSTRAINT "Device_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "Room"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Device" ADD CONSTRAINT "Device_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Device" ADD CONSTRAINT "Device_statusId_fkey" FOREIGN KEY ("statusId") REFERENCES "Status"("id") ON DELETE SET NULL ON UPDATE CASCADE;
