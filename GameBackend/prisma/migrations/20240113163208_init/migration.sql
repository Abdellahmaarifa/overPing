/*
  Warnings:

  - Added the required column `playerOneImageURL` to the `Game` table without a default value. This is not possible if the table is not empty.
  - Added the required column `playerOneName` to the `Game` table without a default value. This is not possible if the table is not empty.
  - Added the required column `playerOneStatus` to the `Game` table without a default value. This is not possible if the table is not empty.
  - Added the required column `playerTwoImageURL` to the `Game` table without a default value. This is not possible if the table is not empty.
  - Added the required column `playerTwoName` to the `Game` table without a default value. This is not possible if the table is not empty.
  - Added the required column `playerTwoStatus` to the `Game` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Game" ADD COLUMN     "playerOneImageURL" TEXT NOT NULL,
ADD COLUMN     "playerOneName" TEXT NOT NULL,
ADD COLUMN     "playerOneStatus" INTEGER NOT NULL,
ADD COLUMN     "playerTwoImageURL" TEXT NOT NULL,
ADD COLUMN     "playerTwoName" TEXT NOT NULL,
ADD COLUMN     "playerTwoStatus" INTEGER NOT NULL;
