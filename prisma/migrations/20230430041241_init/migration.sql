-- CreateEnum
CREATE TYPE "ProjectStatus" AS ENUM ('FAIL', 'USED', 'UNUSED');

-- CreateTable
CREATE TABLE "Project" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "status" "ProjectStatus" NOT NULL DEFAULT 'UNUSED',

    CONSTRAINT "Project_pkey" PRIMARY KEY ("id")
);
