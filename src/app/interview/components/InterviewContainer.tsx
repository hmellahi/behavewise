"use client";
import InterviewerVideo from "@/app/interview/components/InterviewerVideo";
import Timer from "@/app/interview/components/ui/Timer";
import { useEffect, useState } from "react";
import Webcam from "react-webcam";

interface InterviewContainerProps {
  webcamRef: React.RefObject<Webcam>;
  seconds: number;
  setVideoEnded: (ended: boolean) => void;
  vidRef: React.RefObject<HTMLVideoElement>;
  handleUserMedia: () => void;
  setRecordingPermission: (value: boolean) => void;
}

export default function InterviewContainer({
  webcamRef,
  seconds,
  setVideoEnded,
  vidRef,
  handleUserMedia,
  setRecordingPermission,
}: Readonly<InterviewContainerProps>) {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    setIsDesktop(window.innerWidth >= 768);
  }, []);

  const videoConstraints = isDesktop
    ? { width: 1280, height: 720, facingMode: "user" }
    : { width: 480, height: 640, facingMode: "user" };

  return (
    <div className="relative z-10 h-full w-full rounded-lg">
      <Timer seconds={seconds} />
      <InterviewerVideo onVideoEnded={() => setVideoEnded(true)} ref={vidRef} />
      <Webcam
        mirrored
        audio
        muted
        ref={webcamRef}
        videoConstraints={videoConstraints}
        onUserMedia={handleUserMedia}
        onUserMediaError={() => {
          setRecordingPermission(false);
        }}
        className="absolute z-10 min-h-[100%] min-w-[100%] h-auto w-auto object-cover"
      />
    </div>
  );
}
