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
  // if already exists overedite it, upsert?
  const existingAnswer = await prisma.answer.findFirst({
    where: {
      interviewId,
      questionId,
    },
  });

  let createdAnswer = null;

  if (existingAnswer) {
    createdAnswer = await prisma.answer.update({
      where: {
        id: existingAnswer.id,
      },
      data: {
        transcript,
        feedback: JSON.stringify(feedback),
      },
    });
  } else {
    createdAnswer = await prisma.answer.create({
      // audioUrl,
      data: {
        transcript,
        feedback: JSON.stringify(feedback),
        interviewId,
        userId,
        questionId,
      },
    });
  }

  return createdAnswer;
}

const countAnswers = (interviewId: string) => {
  // get count of answers for interview with uniques questionId

  return prisma.answer.count({
    where: {
      interviewId,
    },
  });
};

const answerService = {
  save,
  countAnswers,
};

export default answerService;
