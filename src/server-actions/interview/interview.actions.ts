'use server'

import questionService from "./services/questionService";
import evaluateAnswer from "./utils/evaluateAnswer";
import transcribe from "./utils/transcribe";

// export async function submitAnswer({
//   audioFile,
//   questionId,
// }: {
//   audioFile: any;
//   questionId: number;
// }) {
//   try {
//     const question = await questionService.getQuestionById(questionId);
//     if (!question) {
//       return;
//     }
//     // get questionID from req body
//     const { transcript } = await transcribe(audioFile);
//     // console.log({ transcript });
//     // const transcript = "hello world am the best";
//     const feedback = await evaluateAnswer(question, transcript);
//     console.log({ feedback });
//     return feedback;
//   } catch (error) {
//     console.error("server error", error);
//     return { error: "Error" };
//   }
// }
