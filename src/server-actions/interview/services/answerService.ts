import { prisma } from "@/lib/prisma";
import { CreateAnswerDto } from "@/types/interview";

async function save({
  audioUrl,
  transcript,
  feedback,
  interviewId,
  userId,
  questionId,
}: CreateAnswerDto) {
  // save it in prisma
  const answer = await prisma.answer.create({
    // audioUrl,
    data: {
      transcript,
      feedback: JSON.stringify(feedback),
      interviewId,
      userId,
      questionId,
    },
  });
  return answer;
}

const countAnswers = (interviewId: string) => {
  // get count of answers for interview
  return prisma.answer.count({
    where: {
      interviewId: interviewId,
    },
  });
};

const answerService = {
  save,
  countAnswers,
};

export default answerService;
