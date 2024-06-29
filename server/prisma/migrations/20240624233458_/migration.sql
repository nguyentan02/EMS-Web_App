/*
  Warnings:

  - You are about to drop the column `address` on the `nhan_vien` table. All the data in the column will be lost.
  - Added the required column `inventoryId` to the `Maintenance_History` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Maintenance_History" ADD COLUMN     "inventoryId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "nhan_vien" DROP COLUMN "address";

-- AddForeignKey
ALTER TABLE "Maintenance_History" ADD CONSTRAINT "Maintenance_History_inventoryId_fkey" FOREIGN KEY ("inventoryId") REFERENCES "Inventory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
