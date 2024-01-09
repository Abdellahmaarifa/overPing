/*
  Warnings:

  - You are about to drop the column `channel_id` on the `MutedMembers` table. All the data in the column will be lost.
  - You are about to drop the column `mutedMember_id` on the `MutedMembers` table. All the data in the column will be lost.
  - Added the required column `channelId` to the `MutedMembers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `MutedMembers` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "MutedMembers" DROP COLUMN "channel_id",
DROP COLUMN "mutedMember_id",
ADD COLUMN     "channelId" INTEGER NOT NULL,
ADD COLUMN     "user_id" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "MutedMembers" ADD CONSTRAINT "MutedMembers_channelId_fkey" FOREIGN KEY ("channelId") REFERENCES "Channel"("id") ON DELETE CASCADE ON UPDATE CASCADE;
