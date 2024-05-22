
import { evaluateInterview } from "@/server-actions/interview/services/interviewService";
import evaluateAnswer from "@/server-actions/interview/utils/evaluateAnswer";
import { prisma } from "@/lib/prisma";

import questionService from "@/server-actions/interview/services/questionService";
import { NextApiRequest, NextApiResponse } from "next";
import answerService from "@/server-actions/interview/services/answerService";
// IMPORTANT! Set the runtime to edge
// export const runtime = "edge";

export default async function handler(
  request: NextApiRequest,
  res: NextApiResponse
) {
  try {
    // get id param
    const {
      query: { id },
    } = request;
    const interviewId = id as string;

    const answers = await answerService.fetchAnswers(interviewId);
    const promises = [];
    for (const answer of answers) {
      const { questionId, transcript } = answer;
      const question = questionService.getQuestionById(questionId);
      const feedback = await evaluateAnswer(question, transcript);
      const promise = prisma.answer.update({
        where: {
          id: answer.id,
        },
        data: {
          transcript,
          feedback
        },
      });
      promises.push(promise);
    }

    const promise = evaluateInterview(id as string);
    promises.push(promise);
    await Promise.all(promises);
    res.status(200).json({});
  } catch (error) {
    res.status(500).json({ error });
  }
}
