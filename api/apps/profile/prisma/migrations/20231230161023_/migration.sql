-- CreateTable
CREATE TABLE "UserProfile" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "nickname" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "rank" INTEGER NOT NULL DEFAULT 0,
    "displayRank" INTEGER,
    "xp" INTEGER NOT NULL DEFAULT 0,
    "about" TEXT NOT NULL DEFAULT 'Chatting my way through life on [overPing]. Let''s keep the conversations rolling! 📱✨ #Connected',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "bgImageUrl" TEXT NOT NULL DEFAULT 'http://localhost:5500/image/profileBg/defaultCover.jpg',

    CONSTRAINT "UserProfile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Wallet" (
    "id" SERIAL NOT NULL,
    "balance" INTEGER NOT NULL DEFAULT 1500,
    "user_id" INTEGER NOT NULL,
    "betAmount" INTEGER DEFAULT 0,

    CONSTRAINT "Wallet_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GameStatus" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "matchesLoss" INTEGER NOT NULL DEFAULT 0,
    "matchesWon" INTEGER NOT NULL DEFAULT 0,
    "totalMatches" INTEGER NOT NULL DEFAULT 0,
    "win_streak" INTEGER NOT NULL DEFAULT 0,
    "best_win_streak" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "GameStatus_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Statistics" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "strict_shot_goals" INTEGER NOT NULL DEFAULT 0,
    "rebounded_goals" INTEGER NOT NULL DEFAULT 0,
    "starts_collected" INTEGER NOT NULL DEFAULT 0,
    "clean_sheets" INTEGER NOT NULL DEFAULT 0,
    "successive_clean_sheets" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "Statistics_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GameMatch" (
    "id" SERIAL NOT NULL,
    "player1" INTEGER NOT NULL,
    "player2" INTEGER NOT NULL,
    "winner" INTEGER NOT NULL,
    "loser" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "player1Score" INTEGER NOT NULL DEFAULT 0,
    "player2Score" INTEGER NOT NULL DEFAULT 0,
    "VictoryWager" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "GameMatch_pkey" PRIMARY KEY ("id")
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

-- CreateIndex
CREATE UNIQUE INDEX "Wallet_user_id_key" ON "Wallet"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "Wallet_id_user_id_key" ON "Wallet"("id", "user_id");

-- CreateIndex
CREATE UNIQUE INDEX "GameStatus_user_id_key" ON "GameStatus"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "Statistics_user_id_key" ON "Statistics"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "GameMatch_player1_key" ON "GameMatch"("player1");

-- CreateIndex
CREATE UNIQUE INDEX "GameMatch_player2_key" ON "GameMatch"("player2");

-- CreateIndex
CREATE UNIQUE INDEX "GameMatch_winner_key" ON "GameMatch"("winner");

-- CreateIndex
CREATE UNIQUE INDEX "GameMatch_loser_key" ON "GameMatch"("loser");

-- AddForeignKey
ALTER TABLE "Wallet" ADD CONSTRAINT "Wallet_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "UserProfile"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GameStatus" ADD CONSTRAINT "GameStatus_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "UserProfile"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Statistics" ADD CONSTRAINT "Statistics_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "GameStatus"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserProfileToAchievement" ADD CONSTRAINT "UserProfileToAchievement_achievementId_fkey" FOREIGN KEY ("achievementId") REFERENCES "Achievement"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserProfileToAchievement" ADD CONSTRAINT "UserProfileToAchievement_userProfileId_fkey" FOREIGN KEY ("userProfileId") REFERENCES "UserProfile"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;
