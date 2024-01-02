-- CreateEnum
CREATE TYPE "FriendshipStatus" AS ENUM ('FRIEND', 'PENDING', 'REJECTED', 'BLOCKED');

-- CreateTable
CREATE TABLE "Friendship" (
    "id" SERIAL NOT NULL,
    "userA" INTEGER NOT NULL,
    "userB" INTEGER NOT NULL,
    "blocker" INTEGER,
    "status" "FriendshipStatus" NOT NULL,

    CONSTRAINT "Friendship_pkey" PRIMARY KEY ("id")
);
