"use client";

import Spinner from "@/components/svgs/Spinner";
import { fetchInterviewFeedback } from "@/server-actions/interview/interview.actions";
import { useEffect, useRef, useState } from "react";
import { AnswersFeedback } from "./AnswersFeedback";
import GeneralFeedback from "./GeneralFeedback";
import InterviewStates from "./InterviewStates";
import InterviewReplay from "./InterviewReplay";
export default function InterviewFeedback({
  initialInterviewData,
}: {
  initialInterviewData: any;
}) {
  let [interview, setInterview] = useState(initialInterviewData);
  const timer = useRef(0);

  useEffect(() => {
    if (interview?.status === "COMPLETED") {
      return;
    }
    // each 1 seconds fetch the feedback
    // if its still IN_PROGRESS (feedback.status)
    // otherwise display it
    const interval = setInterval(async () => {
      interview = await fetchInterviewFeedback(interview.id);
      setInterview({ ...interview });
      if (timer.current === 30 || interview?.status !== "IN_PROGRESS") {
        clearInterval(interval);
      }
      timer.current += 1;
    }, 1000);
  });

  if (interview?.status !== "COMPLETED") {
    return (
      <div className="flex justify-center items-center h-full flex-col gap-4 mb-[4rem]">
        {/* <CatLoader width={400} height={400} /> */}
        <Spinner className="animate-spin h-10 w-10 !text-primary" />
        <h2 className="text-2xl font-semibold">
          BehaveWise is generating interview a report
        </h2>
        {/* TODO */}
        {/* <p> 
          You can check the results later on the{" "}
          <Link href="/history">Interviews History</Link> page
        </p> */}
      </div>
    );
  }

  const { result } = interview;
  const link = "http://localhost:3002/stream/file.webm";

  return (
    <div className="flex gap-6 flex-wrap">
      <div className="gap-7 flex flex-col">
        {/* <InterviewReplay answerReplayUrl={link} /> */}
        <video id="video" controls="true">
          <source src={link} type='video/webm; codecs="vp8.0, vorbis"' />
        </video>

        <InterviewStates result={result} />
      </div>
      <div className="flex flex-col gap-5 max-w-[100rem]">
        <GeneralFeedback result={result} />
        <AnswersFeedback answers={interview.answers} />
      </div>
    </div>
  );
}
