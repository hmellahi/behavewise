import { forwardRef } from "react";

const InterviewerVideo = forwardRef(
  ({ onVideoEnded }: { onVideoEnded: () => void }, ref) => {
    return (
      <div className="block absolute top-[10px] sm:top-[20px] lg:top-[40px] left-auto right-[10px] sm:right-[20px] md:right-10 h-[80px] sm:h-[140px] md:h-[180px] aspect-video rounded z-20">
        <div className="h-full w-full aspect-video rounded md:rounded-lg lg:rounded-xl">
          <video
            id="question-video"
            onEnded={() => onVideoEnded()}
            controls={false}
            ref={ref}
            playsInline
            className="h-full object-cover w-full rounded-md md:rounded-[12px] aspect-video"
            crossOrigin="anonymous"
          >
            <source
              src="https://liftoff-public.s3.amazonaws.com/DemoInterviewMale.mp4"
              type="video/mp4"
            />
          </video>
        </div>
      </div>
    );
  }
);

export default InterviewerVideo;
