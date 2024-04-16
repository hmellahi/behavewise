// @ts-nocheck
"use server";

import interviewQuestions from "@/app/(dashboard)/interview/[id]/constants/interviewQuestions";
import { interviewQuestion } from "@/app/(dashboard)/interview/[id]/types/Interview";
import { prisma } from "@/lib/prisma";
import { Answer, AnswerSchema, Interview } from "@prisma/client";

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
  // fetch answers
  let answers:Answer[] = await prisma.answer.findMany({
    where: {
      interviewId,
    },
  });
  // interviewQuestions
  // map the interviewQuestions with answers questionid...
  answers = answers.map((answer) => {
    answer.question = interviewQuestions.find(
      (question) => question.id === answer.questionId
    );
  });
  // answers.questionId -> value

  return {
    ...interview,
    answers,
  };
};
