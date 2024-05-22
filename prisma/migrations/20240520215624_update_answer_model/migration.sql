/*
  Warnings:

  - You are about to drop the column `replayrecording` on the `Answer` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Answer" DROP COLUMN "replayrecording",
ADD COLUMN     "replayRecording" JSONB;
