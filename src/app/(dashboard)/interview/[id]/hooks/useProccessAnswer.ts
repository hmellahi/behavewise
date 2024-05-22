import answerService from "@/server-actions/interview/services/answerService";
import { interviewQuestion } from "../types/Interview";
import saveRecording from "../utils/saveRecording";
import useEvaluateAnswer from "./useEvaluateAnswer";

export default function useProcessAnswer() {
  const { evaluateAnswer, status } = useEvaluateAnswer();

  const processAnswer = async ({
    recordedChunks,
    question,
    interviewId,
    duration,
  }: {
    recordedChunks: Blob[];
    question: interviewQuestion;
    interviewId: string;
    duration: number;
  }) => {
    const questionId = question.id;

    const saveRecordingPromise = saveRecording({
      recordedChunks,
      questionId,
      interviewId,
      duration,
    });

    const evaluateAnswerPromise = evaluateAnswer({
      recordedChunks,
      question,
      interviewId,
    });

    const [evaluateAnswerResult, savedRecording] = await Promise.all([
      evaluateAnswerPromise,
      saveRecordingPromise,
    ]);

    const { filePath } = savedRecording;
    const { evaluatedAnswer } = evaluateAnswerResult;

    console.log({ evaluateAnswerResult, savedRecording})

    const updated = await answerService.updateAnswer({
      id: evaluatedAnswer.id,
      replayRecording: {
        path: filePath,
        duration,
        server: "cloudflare",
      },
    });
    console.log({ updated });
  };

  return {
    processAnswer,
    status
  };
}
