/*
  Warnings:

  - Added the required column `recipient_id` to the `Messages` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Messages" ADD COLUMN     "recipient_id" INTEGER NOT NULL;
