import interviewQuestions from "@/app/(dashboard)/interview/[id]/constants/interviewQuestions";
import { prisma } from "@/lib/prisma";
import { CreateAnswerDto, UpdateAnswerDto } from "@/types/interview";
import {updateAnswer} from "./updateAnswer";

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
        feedback,
      },
    });
  } else {
    createdAnswer = await prisma.answer.create({
      // audioUrl,
      data: {
        transcript,
        feedback,
        interviewId,
        userId,
        questionId,
      },
    });
  }

  return createdAnswer;
}

const countAnswers = async (interviewId: string) => {
  // get count of answers for interview with uniques questionId

  return prisma.answer.count({
    where: {
      interviewId,
    },
  });
};

const fetchAnswers = async (interviewId: string, withQuestions = false) => {
  let answers = await prisma.answer.findMany({
    where: {
      interviewId,
      // NOT:{
      //   questionId : "3" // TODO  remove this
      // }
    },
  });

  // @ts-ignore
  answers = answers.map((answer) => {
    // @ts-ignore
    answer.question = interviewQuestions.find(
      (question) => question.id === answer.questionId
    );
    // @ts-ignore
    answer.feedback = JSON.parse(answer.feedback);
    return answer;
  });

  return answers;
};

const answerService = {
  save,
  countAnswers,
  fetchAnswers,
  updateAnswer,
};

export default answerService;
