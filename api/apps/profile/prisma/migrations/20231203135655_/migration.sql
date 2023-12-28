-- CreateTable
CREATE TABLE "UserProfile" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "nickname" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "rank" INTEGER,
    "xp" INTEGER NOT NULL DEFAULT 0,
    "wallet" INTEGER NOT NULL DEFAULT 1500,
    "about" TEXT NOT NULL DEFAULT 'Chatting my way through life on [overPing]. Let''s keep the conversations rolling! 📱✨ #Connected',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserProfile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Achievement" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "requirement" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "Achievement_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserProfileToAchievement" (
    "userProfileId" INTEGER NOT NULL,
    "achievementId" INTEGER NOT NULL,

    CONSTRAINT "UserProfileToAchievement_pkey" PRIMARY KEY ("userProfileId","achievementId")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserProfile_user_id_key" ON "UserProfile"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "UserProfile_nickname_key" ON "UserProfile"("nickname");

-- CreateIndex
CREATE INDEX "UserProfile_user_id_xp_nickname_idx" ON "UserProfile"("user_id", "xp" DESC, "nickname");

-- AddForeignKey
ALTER TABLE "UserProfileToAchievement" ADD CONSTRAINT "UserProfileToAchievement_achievementId_fkey" FOREIGN KEY ("achievementId") REFERENCES "Achievement"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserProfileToAchievement" ADD CONSTRAINT "UserProfileToAchievement_userProfileId_fkey" FOREIGN KEY ("userProfileId") REFERENCES "UserProfile"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;
