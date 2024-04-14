"use client";
import Spinner from "@/components/svgs/Spinner";
import { AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import Webcam from "react-webcam";
import { QUESTION_TIME_LIMIT } from "../constants/interview";
import interviewQuestions from "../constants/interviewQuestions";
import useEvaluateAnswer from "../hooks/evaluateAnswer";
import CountDown from "./CountDown";
import InterviewContainer from "./InterviewContainer";
import LoadingState from "./LoadingState";
import NoCameraAccess from "./NoCameraAccess";
import VideoActions from "./VideoAction";
import LinearTranslationAnimation from "./animations/LinearTranslationAnimation";

export default function InterviewPageContent({
  params,
}: {
  params: { id: string };
}) {
  const [loading, setLoading] = useState(true);
  const webcamRef = useRef<Webcam | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const [capturing, setCapturing] = useState(false);
  const [recordedChunks, setRecordedChunks] = useState<Blob[]>([]);
  const [seconds, setSeconds] = useState(QUESTION_TIME_LIMIT);
  const [videoEnded, setVideoEnded] = useState(false);
  const [recordingPermission, setRecordingPermission] = useState(true);
  const [cameraLoaded, setCameraLoaded] = useState(false);
  const vidRef = useRef<HTMLVideoElement>(null);
  const [isSubmitting, setSubmitting] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const { evaluateAnswer, status } = useEvaluateAnswer();
  const router = useRouter();
  const interviewId = params.id as string;
  // Once the recording starts
  // -> StartRecording
  // -> display the stop recording button
  // -> the timer will starts
  useEffect(() => {
    if (!videoEnded) {
      return;
    }

    const element = document.getElementById("startTimer");

    if (element) {
      element.style.display = "flex";
    }

    setCapturing(true);

    mediaRecorderRef.current = new MediaRecorder(
      webcamRef?.current?.stream as MediaStream
    );
    mediaRecorderRef.current.addEventListener(
      "dataavailable",
      handleDataAvailable
    );
    mediaRecorderRef.current.start();
  }, [videoEnded, webcamRef, setCapturing, mediaRecorderRef]);

  const handleStartCaptureClick = useCallback(() => {
    const startTimer = document.getElementById("startTimer");
    if (startTimer) {
      startTimer.style.display = "none";
    }

    if (vidRef.current) {
      vidRef.current.play();
      // play only the first 1s of the video..
    }
  }, [webcamRef, setCapturing, mediaRecorderRef]);

  const handleDataAvailable = useCallback(
    ({ data }: BlobEvent) => {
      if (data.size > 0) {
        setRecordedChunks((prev) => prev.concat(data));
      }
    },
    [setRecordedChunks]
  );

  const handleStopCaptureClick = useCallback(() => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
    }
    setCapturing(false);
  }, [mediaRecorderRef, webcamRef, setCapturing]);

  // Stop recording once the timer ends
  useEffect(() => {
    let timer: any = null;
    if (capturing) {
      timer = setInterval(() => {
        setSeconds((seconds) => seconds - 1);
      }, 1000);
      if (seconds === 0) {
        SubmitAnswer();
      }
    }

    return () => {
      clearInterval(timer);
    };
  }, [capturing, seconds]);

  const SubmitAnswer = async () => {
    // move to next question
    const isLastQuestion =
      currentQuestionIndex + 1 === interviewQuestions.length;

    setSubmitting(true);
    console.log({
      isLastQuestion,
      currentQuestionIndex,
      i: interviewQuestions.length,
    });

    try {
      await evaluateAnswer({
        recordedChunks,
        question: currentQuestion,
        interviewId,
      });
    } catch (e) {
      console.log(e);
    }

    if (isLastQuestion) {
      return router.push("/feedback/" + interviewId);
    }

    setSubmitting(false);
    restartVideo();
    setCurrentQuestionIndex(currentQuestionIndex + 1);
  };

  useEffect(() => {
    if (currentQuestionIndex === 0) {
      return;
    }
    vidRef.current?.load();
    
    handleStartCaptureClick();
  }, [currentQuestionIndex]);

  function restartVideo() {
    // remove the last recording..
    setRecordedChunks((recordedChunks) => recordedChunks.slice(0, -1));
    console.log(recordedChunks);
    // restart the video
    setVideoEnded(false);
    setCapturing(false);
    // restart the timer
    setSeconds(QUESTION_TIME_LIMIT);
  }

  const handleUserMedia = () => {
    setTimeout(() => {
      setLoading(false);
      setCameraLoaded(true);
    }, 1000);
  };

  const currentQuestion = interviewQuestions[currentQuestionIndex];
  const canStopRecording = seconds < QUESTION_TIME_LIMIT - 1;

  return (
    <AnimatePresence>
      <div className="w-full min-h-screen flex flex-col px-4 md:px-8 relative overflow-x-hidden">
        <div className="h-full w-full items-center flex flex-col">
          {recordingPermission ? (
            <div className="w-full flex flex-col max-w-[1080px] mx-auto justify-center">
              {/* <span className="text-[14px] leading-[20px] text-[#1a2b3b] font-normal mb-4">
                Asked by top companies like Google, Facebook and more
              </span> */}
              {cameraLoaded}
              <LinearTranslationAnimation
                className={cameraLoaded ? "bg-white" : "bg-[#1D2B3A]"}
              >
                <InterviewContainer
                  webcamRef={webcamRef}
                  seconds={seconds}
                  setVideoEnded={setVideoEnded}
                  setRecordingPermission={setRecordingPermission}
                  vidRef={vidRef}
                  handleUserMedia={handleUserMedia}
                  question={currentQuestion}
                />
                {!cameraLoaded && (
                  <div className="text-white absolute top-1/2 left-1/2 z-20 flex items-center">
                    <Spinner className="animate-spin h-4 w-4 text-white mx-auto my-0.5" />
                  </div>
                )}
                {loading && <LoadingState />}
                {cameraLoaded && (
                  <VideoActions
                    capturing={capturing}
                    length={recordedChunks.length}
                    isSubmitting={isSubmitting}
                    status={status}
                    handleStartCaptureClick={handleStartCaptureClick}
                    handleStopCaptureClick={handleStopCaptureClick}
                    SubmitAnswer={SubmitAnswer}
                    restartVideo={restartVideo}
                    canStopRecording={canStopRecording}
                  />
                )}
                <CountDown />
              </LinearTranslationAnimation>
              {/* <VideoNotStoredDisclaimer /> */}
            </div>
          ) : (
            <NoCameraAccess />
          )}
        </div>
      </div>
    </AnimatePresence>
  );
}
