/*
  Warnings:

  - You are about to drop the column `requirement` on the `requirements` table. All the data in the column will be lost.
  - Added the required column `title` to the `requirements` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "requirements" DROP COLUMN "requirement",
ADD COLUMN     "title" TEXT NOT NULL;
