"use client";
import Spinner from "@/components/svgs/Spinner";
import { AnimatePresence } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import Webcam from "react-webcam";
import CountDown from "./components/CountDown";
import InterviewContainer from "./components/InterviewContainer";
import LoadingState from "./components/LoadingState";
import NoCameraAccess from "./components/NoCameraAccess";
import VideoActions from "./components/VideoAction";
import VideoNotStoredDisclaimer from "./components/VideoNotStoredDisclaimer";
import LinearTranslationAnimation from "./components/animations/LinearTranslationAnimation";

export default function Interview() {
  const [loading, setLoading] = useState(true);
  const webcamRef = useRef<Webcam | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const [capturing, setCapturing] = useState(false);
  const [recordedChunks, setRecordedChunks] = useState<Blob[]>([]);
  const [seconds, setSeconds] = useState(150);
  const [videoEnded, setVideoEnded] = useState(false);
  const [recordingPermission, setRecordingPermission] = useState(true);
  const [cameraLoaded, setCameraLoaded] = useState(false);
  const vidRef = useRef<HTMLVideoElement>(null);
  const [isSubmitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState("Processing");
  const [isSuccess, setIsSuccess] = useState(false);
  
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
        handleStopCaptureClick();
        setCapturing(false);
        setSeconds(0);
      }
    }
    return () => {
      clearInterval(timer);
    };
  });

  const SubmitAnswer = () => {};

  function restartVideo() {
    setRecordedChunks([]);
    setVideoEnded(false);
    setCapturing(false);
    setSeconds(150);
  }

  const handleUserMedia = () => {
    setTimeout(() => {
      setLoading(false);
      setCameraLoaded(true);
    }, 1000);
  };

  return (
    <AnimatePresence>
      <div className="w-full min-h-screen flex flex-col px-4 pt-2 pb-8 md:px-8 md:py-2 bg-[#FCFCFC] relative overflow-x-hidden">
        <div className="h-full w-full items-center flex flex-col mt-[10vh]">
          {recordingPermission ? (
            <div className="w-full flex flex-col max-w-[1080px] mx-auto justify-center">
              <span className="text-[14px] leading-[20px] text-[#1a2b3b] font-normal mb-4">
                Asked by top companies like Google, Facebook and more
              </span>
              <LinearTranslationAnimation>
                <InterviewContainer
                  webcamRef={webcamRef}
                  seconds={seconds}
                  setVideoEnded={setVideoEnded}
                  setRecordingPermission={setRecordingPermission}
                  vidRef={vidRef}
                  handleUserMedia={handleUserMedia}
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
                    isSuccess={isSuccess}
                    handleStartCaptureClick={handleStartCaptureClick}
                    handleStopCaptureClick={handleStopCaptureClick}
                    SubmitAnswer={SubmitAnswer}
                    restartVideo={restartVideo}
                  />
                )}
                <CountDown />
              </LinearTranslationAnimation>
              <VideoNotStoredDisclaimer />
            </div>
          ) : (
            <NoCameraAccess />
          )}
        </div>
      </div>
    </AnimatePresence>
  );
}
