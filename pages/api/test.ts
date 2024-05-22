import { getAnswerReplayUrl } from "@/server-actions/interview/interview.actions";
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
      query: { id },
    } = request;

    let result = await getAnswerReplayUrl({});

    res.status(200).json({
      result,
    });
  } catch (error) {
    res.status(500).json({ error });
  }
}
