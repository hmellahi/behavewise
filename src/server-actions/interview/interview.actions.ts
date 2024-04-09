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

const interviewActions = {
  startNewInterview,
};

// export default interviewActions;
