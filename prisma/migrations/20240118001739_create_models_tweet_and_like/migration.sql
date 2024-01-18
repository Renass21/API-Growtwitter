/*
  Warnings:

  - You are about to drop the `Tweet` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Tweet";

-- DropTable
DROP TABLE "User";

-- CreateTable
CREATE TABLE "user" (
    "idUser" UUID NOT NULL,
    "name" VARCHAR(30) NOT NULL,
    "username" VARCHAR(30) NOT NULL,
    "email" VARCHAR(30) NOT NULL,
    "password" VARCHAR(20) NOT NULL,
    "dthr_criacao" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dthr__atualizacao" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("idUser")
);

-- CreateTable
CREATE TABLE "tweet" (
    "id_tweet" UUID NOT NULL,
    "id_user" UUID NOT NULL,
    "content" VARCHAR(30) NOT NULL,
    "db_tweet" CHAR(1) NOT NULL,
    "dthr_criacao" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dthr__atualizacao" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tweet_pkey" PRIMARY KEY ("id_tweet")
);

-- CreateTable
CREATE TABLE "like" (
    "id_user" UUID NOT NULL,
    "idTweet" UUID NOT NULL,
    "dthr_criacao" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dthr__atualizacao" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "like_pkey" PRIMARY KEY ("idTweet")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- AddForeignKey
ALTER TABLE "tweet" ADD CONSTRAINT "tweet_id_tweet_fkey" FOREIGN KEY ("id_tweet") REFERENCES "user"("idUser") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "like" ADD CONSTRAINT "like_idTweet_fkey" FOREIGN KEY ("idTweet") REFERENCES "tweet"("id_tweet") ON DELETE RESTRICT ON UPDATE CASCADE;
