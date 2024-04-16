import { evaluateInterview } from "@/server-actions/interview/services/interviewService";
import evaluateAnswer from "@/server-actions/interview/utils/evaluateAnswer";
import { generateEvalPrompt } from "@/server-actions/interview/utils/generateEvalPrompt";

import { NextApiRequest, NextApiResponse } from "next";

// IMPORTANT! Set the runtime to edge
// export const runtime = "edge";

export default async function handler(
  request: NextApiRequest,
  res: NextApiResponse
) {
  try {
    // get id param
    const { query: { id } } = request;
    console.log(id);


    let result = await evaluateInterview(id as string);
    res.status(200).json({
      result,
    });
  } catch (error) {
    res.status(500).json({ error });
  }
}
