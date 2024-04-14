import { useState } from "react";
import { interviewQuestion } from "../types/Interview";

import "./video.css";
import { twMerge } from "tailwind-merge";

const InterviewerVideo = ({
  onVideoEnded,
  question,
  vidRef,
}: {
  onVideoEnded: () => void;
  question: interviewQuestion;
  vidRef: React.RefObject<HTMLVideoElement>;
}) => {
  const [videoStarted, setVideoStarted] = useState(false);
  return (
    <div className="block absolute top-[10px] sm:top-[20px] lg:top-[40px] left-auto right-[10px] sm:right-[20px] md:right-10 h-[80px] sm:h-[140px] md:h-[180px] aspect-video rounded z-20 ">
        {videoStarted && 'WTF'}
      <div className="h-full w-full aspect-video rounded md:rounded-lg lg:rounded-xl ">
        <video
          id="question-video"
          preload="true"
          onEnded={() => onVideoEnded()}
          controls={false}
          ref={vidRef}
          playsInline
          className={twMerge([
            "h-full object-cover w-full rounded-md md:rounded-3xl aspect-video border-2 question-video border-white",
            // videoStarted && "question-video border-white",
          ])}
          crossOrigin="anonymous"
        >
          <source src={question.videoUrl} type="video/mp4" />
        </video>
      </div>
    </div>
  );
};

export default InterviewerVideo;
