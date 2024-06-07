/*
  Warnings:

  - Made the column `purchase_date` on table `Device` required. This step will fail if there are existing NULL values in that column.
  - Made the column `categoryId` on table `Device` required. This step will fail if there are existing NULL values in that column.
  - Made the column `roomId` on table `Device` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Device" DROP CONSTRAINT "Device_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "Device" DROP CONSTRAINT "Device_roomId_fkey";

-- AlterTable
ALTER TABLE "Device" ALTER COLUMN "purchase_date" SET NOT NULL,
ALTER COLUMN "categoryId" SET NOT NULL,
ALTER COLUMN "roomId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Device" ADD CONSTRAINT "Device_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "Room"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Device" ADD CONSTRAINT "Device_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
