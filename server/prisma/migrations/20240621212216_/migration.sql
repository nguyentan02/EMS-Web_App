/*
  Warnings:

  - You are about to drop the column `minQuantity` on the `Inventory` table. All the data in the column will be lost.
  - You are about to drop the column `quantity` on the `Inventory` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Inventory" DROP COLUMN "minQuantity",
DROP COLUMN "quantity";
