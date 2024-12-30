-- CreateEnum
CREATE TYPE "ENERGY" AS ENUM ('LOW', 'MEDIUM', 'HIGH');

-- CreateEnum
CREATE TYPE "SIZE" AS ENUM ('SMALL', 'MEDIUM', 'BIG');

-- CreateEnum
CREATE TYPE "ENVIRONMENT" AS ENUM ('OPEN_SPACE', 'CLOSED', 'BOTH');

-- CreateEnum
CREATE TYPE "INDEPENDENCE" AS ENUM ('LOW', 'MEDIUM', 'HIGH');

-- CreateEnum
CREATE TYPE "AGE" AS ENUM ('NEWBORN', 'YOUNG', 'ADULT', 'OLD');

-- CreateTable
CREATE TABLE "Pet" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "age" "AGE" NOT NULL,
    "size" "SIZE" NOT NULL,
    "energy_level" "ENERGY" NOT NULL,
    "environment" "ENVIRONMENT" NOT NULL,
    "independent" "INDEPENDENCE" NOT NULL,
    "breed" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "Pet_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Pet" ADD CONSTRAINT "Pet_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
