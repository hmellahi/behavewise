import answerService from "@/server-actions/interview/services/answerService";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import interviewQuestions from "../constants/interviewQuestions";
import { interviewQuestion } from "../types/Interview";
import saveRecording from "../utils/saveRecording";
import useEvaluateAnswer from "./useEvaluateAnswer";

export default function useProcessAnswer({
  params,
}: {
  params: { id: string };
}) {
  const { evaluateAnswer, status } = useEvaluateAnswer();

  const router = useRouter();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const interviewId = params.id as string;
  const processedAnswers = useRef(0);

  useEffect(() => {
    const isLastQuestion =
      currentQuestionIndex + 1 === interviewQuestions.length;

    if (processedAnswers.current === interviewQuestions.length) {
      if (isLastQuestion) {
        router.push("/feedback/" + interviewId);
      }
    }
  }, [processedAnswers]);

  const processAnswer = async ({
    recordedChunks,
    question,
    duration,
  }: {
    recordedChunks: Blob[];
    question: interviewQuestion;
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

    const updated = await answerService.updateAnswer({
      id: evaluatedAnswer.id,
      replayRecording: {
        path: filePath,
        duration,
        server: "cloudflare",
      },
    });

    processedAnswers.current++;
  };

  return {
    processAnswer,
    status,
    currentQuestionIndex,
    setCurrentQuestionIndex
  };
}
