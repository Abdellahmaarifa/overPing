-- CreateTable
CREATE TABLE "Game" (
    "id" SERIAL NOT NULL,
    "playerOneId" INTEGER NOT NULL,
    "playerOneName" TEXT NOT NULL,
    "playerOneImageURL" TEXT NOT NULL,
    "playerOneScore" INTEGER NOT NULL,
    "playerOneStatus" INTEGER NOT NULL,
    "playerTwoId" INTEGER NOT NULL,
    "playerTwoName" TEXT NOT NULL,
    "playerTwoImageURL" TEXT NOT NULL,
    "playerTwoScore" INTEGER NOT NULL,
    "playerTwoStatus" INTEGER NOT NULL,
    "points" INTEGER NOT NULL,
    "level" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Game_pkey" PRIMARY KEY ("id")
);
