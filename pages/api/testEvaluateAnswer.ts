import interviewQuestions from "@/app/(dashboard)/interview/[id]/constants/interviewQuestions";
import evaluateAnswer from "@/server-actions/interview/utils/evaluateAnswer";

import { NextApiRequest, NextApiResponse } from "next";

// IMPORTANT! Set the runtime to edge
// export const runtime = "edge";

export default async function handler(
  request: NextApiRequest,
  res: NextApiResponse
) {
  try {
    // get id param
    const {
      body: { questionId, answer },
    } = request;

    const question = interviewQuestions.find((q) => q.id === questionId);

    if (!question || !answer) {
        return res.status(500).json({
            'wtf':'s'
        });
    }

    let result = await evaluateAnswer(question, answer as string);
    res.status(200).json({
      result,
    });
  } catch (error) {
    res.status(500).json({ error });
  }
}
