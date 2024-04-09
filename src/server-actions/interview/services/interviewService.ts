"use server";

import { prisma } from "@/lib/prisma";
import { CreateAnswerDto } from "@/types/interview";
import answerService from "./answerService";
import questionService from "./questionService";

export const evaluateInterview = async (interviewId: string) => {
  await prisma.interview.update({
    where: {
      id: interviewId,
    },
    data: {
      status: "COMPLETED",
      result: JSON.stringify({
        score: '4/5'
      }),
    },
  });
};

async function saveAnswer(answer: CreateAnswerDto) {
  // save it in db
  await answerService.save(answer);

  // check if interview answers count == interviewQuestions count
  // if yes then mark the interview as completed
  // make the interviewId int..
  const { interviewId } = answer;
  const answersCount = await answerService.countAnswers(interviewId);
  const questionsCount = await questionService.countQuestions(interviewId);
  if (answersCount === questionsCount) {
    await evaluateInterview(interviewId);
  }
}

const interviewService = {
  evaluateInterview,
  saveAnswer,
};

export default interviewService;
