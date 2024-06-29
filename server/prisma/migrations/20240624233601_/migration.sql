/*
  Warnings:

  - Added the required column `quantity` to the `Maintenance_History` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Maintenance_History" ADD COLUMN     "quantity" INTEGER NOT NULL;
