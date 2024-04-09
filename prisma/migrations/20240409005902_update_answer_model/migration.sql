/*
  Warnings:

  - You are about to drop the column `question` on the `Question` table. All the data in the column will be lost.
  - Added the required column `caption` to the `Question` table without a default value. This is not possible if the table is not empty.
  - Added the required column `prompt` to the `Question` table without a default value. This is not possible if the table is not empty.
  - Made the column `videoUrl` on table `Question` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Answer" DROP CONSTRAINT "Answer_questionId_fkey";

-- AlterTable
ALTER TABLE "Question" DROP COLUMN "question",
ADD COLUMN     "caption" TEXT NOT NULL,
ADD COLUMN     "prompt" TEXT NOT NULL,
ALTER COLUMN "videoUrl" SET NOT NULL;
