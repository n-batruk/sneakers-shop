/*
  Warnings:

  - You are about to drop the column `delivery_address` on the `Delivery` table. All the data in the column will be lost.
  - You are about to drop the column `image` on the `Product` table. All the data in the column will be lost.
  - Added the required column `address` to the `Delivery` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Delivery" DROP COLUMN "delivery_address",
ADD COLUMN     "address" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "image";
