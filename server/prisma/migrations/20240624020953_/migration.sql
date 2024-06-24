/*
  Warnings:

  - You are about to drop the `Alert` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `quantity` to the `Inventory` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Alert" DROP CONSTRAINT "Alert_inventoryId_fkey";

-- DropForeignKey
ALTER TABLE "Alert" DROP CONSTRAINT "Alert_materialId_fkey";

-- AlterTable
ALTER TABLE "Inventory" ADD COLUMN     "quantity" INTEGER NOT NULL;

-- DropTable
DROP TABLE "Alert";
