// [11:17 pm, 03/04/2024] Hamza: nterviews -> id, timestamps, userId
// [11:19 pm, 03/04/2024] Hamza: Answers -> interviewId, questionId, answer, feedback(json), userid
// [11:20 pm, 03/04/2024] Hamza: Questions -> id, question, videoUrl
// [11:22 pm, 03/04/2024] Hamza: and Also I will need access to supabase acc

import { Prisma } from "@prisma/client";

function saveAnswer({
  audioUrl,
  script,
  feedback,
  interviewId,
  userId,
  questionId,
}: {
  audioUrl: string;
  script: string;
  feedback: string;
  userId: string;
  interviewId: string;
  questionId: string;
}) {
  // save it in prisma
  const answer = Prisma.createAnswer({
    audioUrl,
    script,
    feedback: JSON.stringify(feedback),
    interviewId,
    userId,
    questionId,
  });
  return answer;
}

const answerService = {
  saveAnswer,
};

export default answerService;
