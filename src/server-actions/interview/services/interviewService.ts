"use server";

import { prisma } from "@/lib/prisma";
import { CreateAnswerDto } from "@/types/interview";
import { OpenAIStream, OpenAIStreamPayload } from "@/utils/OpenAIStream";
import { revalidatePath } from "next/cache";
import { generateEvalPrompt } from "../utils/generateEvalPrompt";
import answerService from "./answerService";
import questionService from "./questionService";

export const evaluateInterview = async (interviewId: string) => {
  const evaluationPrompt = await generateEvalPrompt(interviewId);

  console.log({ evaluationPrompt });

  const payload: OpenAIStreamPayload = {
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content:
          "You are a tech hiring manager. You are to only provide feedback on the interview candidate's transcript. If it is not relevant and does not answerScript the question, make sure to say that. Do not be overly verbose and focus on the candidate's response.",
      },
      { role: "user", content: evaluationPrompt },
    ],
    temperature: 0.7,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
    max_tokens: 4096,
    stream: false,
    n: 1,
  };

  try {
    const feedback = await OpenAIStream(payload);

    const updatedInterview = await prisma.interview.update({
      where: {
        id: interviewId,
      },
      data: {
        status: "COMPLETED",
        result: feedback,
      },
    });
    console.log({ updatedInterview });

    revalidatePath(`/interview/${interviewId}`);

    return updatedInterview;
  } catch (e) {
    console.log({ e });
  }
};

async function saveAnswer(answer: CreateAnswerDto) {
  // save it in db
  const savedAnswer = await answerService.save(answer);

  // check if interview answers count == interviewQuestions count
  // if yes then mark the interview as completed
  // make the interviewId int..
  async () => {
    const { interviewId } = answer;
    const answersCount = await answerService.countAnswers(interviewId);
    const questionsCount = await questionService.countQuestions(interviewId);
    if (answersCount === questionsCount) {
      await evaluateInterview(interviewId);
    }
  };
  return savedAnswer
}

const interviewService = {
  evaluateInterview,
  saveAnswer,
};

export default interviewService;
