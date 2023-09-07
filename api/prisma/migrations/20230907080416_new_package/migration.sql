/*
  Warnings:

  - You are about to drop the column `images` on the `Package` table. All the data in the column will be lost.
  - Added the required column `feature_image` to the `Package` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Package" DROP COLUMN "images",
ADD COLUMN     "feature_image" TEXT NOT NULL;
