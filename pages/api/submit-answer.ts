import answerService from "@/server-actions/interview/services/answerService";
import interviewService from "@/server-actions/interview/services/interviewService";
import questionService from "@/server-actions/interview/services/questionService";
import evaluateAnswer from "@/server-actions/interview/utils/evaluateAnswer";
import transcribe from "@/server-actions/interview/utils/transcribe";
import { IncomingForm } from "formidable";
import { NextApiRequest, NextApiResponse } from "next";

export const config = {
  api: {
    bodyParser: false,
  },
};

// IMPORTANT! Set the runtime to edge
// export const runtime = "edge";

export default async function handler(
  request: NextApiRequest,
  res: NextApiResponse
) {

    // Here, we create a temporary file to store the audio file using Vercel's tmp directory
  // As we compressed the file and are limiting recordings to 2.5 minutes, we won't run into trouble with storage capacity
  const formData = await new Promise<{ fields: any; files: any }>(
    (resolve, reject) => {
      const form = new IncomingForm({
        multiples: false,
        uploadDir: "/tmp",
        keepExtensions: true,
      });
      form.parse(request, (err, fields, files) => {
        if (err) return reject(err);
        resolve({ fields, files });
      });
    }
  );

  const {
    fields: { questionId, interviewId },
    files: { file },
  } = formData;

  console.log(formData);
  
  try {
    // const question = questionService.getQuestionById(questionId);
    // const { transcript } = await transcribe(file);
    // console.log({ question, transcript });

    // const feedback = await evaluateAnswer(question, transcript);
    // console.log({ feedback });
    // res.status(200).json({ transcript, feedback });
    // return undefined;
    const transcript = 'wtfff';
    const feedback = {'w': 'wtf bruh'}
    await interviewService.saveAnswer({
      audioUrl: file.path, // to change
      transcript,
      feedback,
      userId: null, // todo change
      interviewId,
      questionId,
    })
  } catch (error) {
    console.error("server error", error);
    res.status(500).json({ error });
  }
}
