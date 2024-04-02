"use client";
import SuccessButton from "@/components/common/SuccessButton";
import { RightArrow } from "@/components/svgs";
import Spinner from "@/components/svgs/Spinner";
import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import Webcam from "react-webcam";
import InterviewerVideo from "./components/InterviewerVideo";
import LoadingState from "./components/LoadingState";
import NoCameraAccess from "./components/NoCameraAccess";
import VideoNotStoredDisclaimer from "./components/VideoNotStoredDisclaimer";
import RestartButton from "./components/ui/RestartButton";
import StartTimerButton from "./components/ui/StartTimerButton";
import StopTimerButton from "./components/ui/StopTimerButton";
import Timer from "./components/ui/Timer";

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
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    setIsDesktop(window.innerWidth >= 768);
  }, []);

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

  const videoConstraints = isDesktop
    ? { width: 1280, height: 720, facingMode: "user" }
    : { width: 480, height: 640, facingMode: "user" };

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
              <motion.div
                initial={{ y: -20 }}
                animate={{ y: 0 }}
                transition={{
                  duration: 0.35,
                  ease: [0.075, 0.82, 0.965, 1],
                }}
                className="relative aspect-[16/9] w-full max-w-[1080px] overflow-hidden bg-[#1D2B3A] rounded-lg ring-1 ring-gray-900/5 shadow-md"
              >
                {!cameraLoaded && (
                  <div className="text-white absolute top-1/2 left-1/2 z-20 flex items-center">
                    <Spinner className="animate-spin h-4 w-4 text-white mx-auto my-0.5" />
                  </div>
                )}
                <div className="relative z-10 h-full w-full rounded-lg">
                  <Timer seconds={seconds} />
                  <InterviewerVideo
                    onVideoEnded={() => setVideoEnded(true)}
                    ref={vidRef}
                  ></InterviewerVideo>
                  <Webcam
                    mirrored
                    audio
                    muted
                    ref={webcamRef}
                    videoConstraints={videoConstraints}
                    onUserMedia={handleUserMedia}
                    onUserMediaError={(error) => {
                      setRecordingPermission(false);
                    }}
                    className="absolute z-10 min-h-[100%] min-w-[100%] h-auto w-auto object-cover"
                  />
                </div>
                {loading && <LoadingState />}

                {cameraLoaded && (
                  <div className="absolute bottom-0 left-0 z-50 flex h-[82px] w-full items-center justify-center">
                    {recordedChunks.length > 0 ? (
                      <>
                        {isSuccess ? (
                          <SuccessButton />
                        ) : (
                          <div className="flex flex-row gap-2">
                            {!isSubmitting && (
                              <RestartButton
                                onClick={restartVideo}
                              ></RestartButton>
                            )}
                            <button
                              onClick={SubmitAnswer}
                              disabled={isSubmitting}
                              className="group rounded-full min-w-[140px] px-4 py-2 text-[13px] font-semibold transition-all flex items-center justify-center bg-[#1E2B3A] text-white hover:[linear-gradient(0deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.1)), #0D2247] no-underline flex  active:scale-95 scale-100 duration-75  disabled:cursor-not-allowed"
                              style={{
                                boxShadow:
                                  "0px 1px 4px rgba(13, 34, 71, 0.17), inset 0px 0px 0px 1px #061530, inset 0px 0px 0px 2px rgba(255, 255, 255, 0.1)",
                              }}
                            >
                              <span>
                                {isSubmitting ? (
                                  <div className="flex items-center justify-center gap-x-2">
                                    <Spinner className="animate-spin h-5 w-5 text-slate-50 mx-auto" />
                                    <span>{status}</span>
                                  </div>
                                ) : (
                                  <div className="flex items-center justify-center gap-x-2">
                                    <span>Process transcript</span>
                                    <RightArrow className="w-5 h-5" />
                                  </div>
                                )}
                              </span>
                            </button>
                          </div>
                        )}
                      </>
                    ) : (
                      <div className="absolute bottom-[6px] md:bottom-5 left-5 right-5">
                        <div className="lg:mt-4 flex flex-col items-center justify-center gap-2">
                          {capturing ? (
                            <StopTimerButton
                              handleStopCaptureClick={handleStopCaptureClick}
                            />
                          ) : (
                            <StartTimerButton
                              handleStartCaptureClick={handleStartCaptureClick}
                            />
                          )}
                          <div className="w-12"></div>
                        </div>
                      </div>
                    )}
                  </div>
                )}
                <div
                  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 text-5xl text-white font-semibold text-center"
                  id="countdown"
                ></div>
              </motion.div>
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
