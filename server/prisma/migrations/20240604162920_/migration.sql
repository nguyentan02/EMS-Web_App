/*
  Warnings:

  - You are about to drop the `ActiveToken` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ActiveToken" DROP CONSTRAINT "ActiveToken_userId_fkey";

-- DropTable
DROP TABLE "ActiveToken";
