/*
  Warnings:

  - Added the required column `created_by` to the `ContactEmail` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_by` to the `ContactEmail` table without a default value. This is not possible if the table is not empty.
  - Added the required column `created_by` to the `ContactNote` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_by` to the `ContactNote` table without a default value. This is not possible if the table is not empty.
  - Added the required column `created_by` to the `ContactPhone` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_by` to the `ContactPhone` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."ContactEmail" ADD COLUMN     "created_by" TEXT NOT NULL,
ADD COLUMN     "updated_by" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "public"."ContactNote" ADD COLUMN     "created_by" TEXT NOT NULL,
ADD COLUMN     "updated_by" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "public"."ContactPhone" ADD COLUMN     "created_by" TEXT NOT NULL,
ADD COLUMN     "updated_by" TEXT NOT NULL;
