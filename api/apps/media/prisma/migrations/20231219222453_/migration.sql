-- CreateTable
CREATE TABLE "ProfileImg" (
    "id" SERIAL NOT NULL,
    "imgKey" TEXT NOT NULL,
    "filename" TEXT NOT NULL,
    "mimetype" TEXT NOT NULL,
    "encoding" TEXT NOT NULL,
    "content" BYTEA NOT NULL,

    CONSTRAINT "ProfileImg_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "profileBackgroundImg" (
    "id" SERIAL NOT NULL,
    "imgKey" TEXT NOT NULL,
    "filename" TEXT NOT NULL,
    "mimetype" TEXT NOT NULL,
    "encoding" TEXT NOT NULL,
    "content" BYTEA NOT NULL,

    CONSTRAINT "profileBackgroundImg_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "chatMedia" (
    "id" SERIAL NOT NULL,
    "imgKey" TEXT NOT NULL,
    "filename" TEXT NOT NULL,
    "mimetype" TEXT NOT NULL,
    "encoding" TEXT NOT NULL,
    "content" BYTEA NOT NULL,

    CONSTRAINT "chatMedia_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ProfileImg_imgKey_key" ON "ProfileImg"("imgKey");

-- CreateIndex
CREATE UNIQUE INDEX "profileBackgroundImg_imgKey_key" ON "profileBackgroundImg"("imgKey");

-- CreateIndex
CREATE UNIQUE INDEX "chatMedia_imgKey_key" ON "chatMedia"("imgKey");
