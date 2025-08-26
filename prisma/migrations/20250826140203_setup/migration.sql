/*
  Warnings:

  - Added the required column `format` to the `ContactNote` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."ContactNote" ADD COLUMN     "format" TEXT NOT NULL;
