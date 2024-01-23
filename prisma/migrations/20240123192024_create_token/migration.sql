-- AlterTable
ALTER TABLE "user" ADD COLUMN     "token" TEXT;

-- CreateTable
CREATE TABLE "follow" (
    "id" UUID NOT NULL,
    "id_following" UUID NOT NULL,
    "id_follower" UUID NOT NULL,
    "username_following " VARCHAR(50) NOT NULL DEFAULT 'default_value',
    "username_follower" VARCHAR(50) NOT NULL DEFAULT 'default_value',

    CONSTRAINT "follow_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "follow" ADD CONSTRAINT "follow_id_following_fkey" FOREIGN KEY ("id_following") REFERENCES "user"("idUser") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "follow" ADD CONSTRAINT "follow_id_follower_fkey" FOREIGN KEY ("id_follower") REFERENCES "user"("idUser") ON DELETE RESTRICT ON UPDATE CASCADE;
