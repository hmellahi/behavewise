// @ts-nocheck
"use server";

import interviewQuestions from "@/app/(dashboard)/interview/[id]/constants/interviewQuestions";
import { interviewQuestion } from "@/app/(dashboard)/interview/[id]/types/Interview";
import { prisma } from "@/lib/prisma";
import { Answer, AnswerSchema, Interview } from "@prisma/client";
import answerService from "./services/answerService";

interface Answer extends AnswerSchema {
  question: interviewQuestion;
  score: number;
}

export const createInterview = async (interviewId): Promise<Interview> => {
  const createdInterview = await prisma.interview.create({
    data: {
      id: interviewId,
      status: "IN_PROGRESS",
      result: JSON.stringify({}),
    },
  });
  return createdInterview;
};

export const fetchInterviewFeedback = async (interviewId: string) => {
  const interview = await prisma.interview.findFirst({
    where: {
      id: interviewId,
    },
  });

  if (!interview) return null;
  const result = JSON.parse(interview.result)
  // fetch answers
  let answers = await answerService.fetchAnswers(interviewId);
  // answers.questionId -> value

  return {
    ...interview,
    result,
    answers,
  };
};
