-- CreateTable
CREATE TABLE "User" (
    "id_user" UUID NOT NULL,
    "name" VARCHAR(30) NOT NULL,
    "username" VARCHAR(30) NOT NULL,
    "email" VARCHAR(30) NOT NULL,
    "password" VARCHAR(20) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id_user")
);

-- CreateTable
CREATE TABLE "Tweet" (
    "id" UUID NOT NULL,
    "content" VARCHAR(30) NOT NULL,
    "type" CHAR(1) NOT NULL,

    CONSTRAINT "Tweet_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
