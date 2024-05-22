"use server";
import { prisma } from "@/lib/prisma";
import { UpdateAnswerDto } from "@/types/interview";

export const updateAnswer = async (answer: UpdateAnswerDto) => {
  const { id, ...answerData } = answer;
  console.log(id);
  return prisma.answer.update({
    where: {
      id,
    },
    data: answerData,
  });
};
