"use server";

import { prisma } from "@/lib/prisma";
import { Interview } from "@prisma/client";

export const startNewInterview = async (): Promise<Interview> => {
  const createdInterview = await prisma.interview.create({
    data: {
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

  if (!interview) return null
  // fetch answers
  const answers = await prisma.answer.findMany({
    where: {
      interviewId,
    },
  });
  return {
    ...interview,
    answers,
  };
}