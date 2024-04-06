
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
