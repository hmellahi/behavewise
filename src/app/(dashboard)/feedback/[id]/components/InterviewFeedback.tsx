"use client";

import Spinner from "@/components/svgs/Spinner";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { fetchInterviewFeedback } from "@/server-actions/interview/interview.actions";
import { useEffect, useRef, useState } from "react";
import { AnswersFeedback } from "./AnswersFeedback";
export default function InterviewFeedback({
  initialInterviewData,
}: {
  initialInterviewData: any;
}) {
  let [interview, setInterview] = useState(initialInterviewData);
  const timer = useRef(0);
  console.log({ interview });

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
      console.log({ interview });
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
  console.log({s: JSON.parse(result)})
  const { strengths, weaknesses, improvementSuggestions } = JSON.parse(result);

  // make a list of them..
  // const weaknesses = [
  //   "Occasionally jumps between different topics and experiences, leading to a lack of clarity in responses",
  //   "Could work on providing more specific and concise answers to interview questions",
  //   "Salary expectation could be more research-based and tailored to the company and role",
  // ];

  // const strengths = [
  //   "Candidate has relevant experience in software engineering and working on innovative projects",
  //   "Demonstrates a proactive approach to learning and seeking feedback",
  //   "Asks thoughtful questions about company culture and the ideal candidate for the position",
  // ];

  // const improvementSuggestions = [
  //   // get them from this html..

  //   "Practice structuring responses to provide clear and concise information",
  //   "Research and align salary expectations with the industry standards and the specific company",
  //   "Continue asking relevant and insightful questions, while also actively listening and engaging in conversation with the interviewer",
  // ];

  return (
    <>
      <AnswersFeedback answers={interview.answers} />
      <div className="max-w-5xl p-6 bg-white rounded-xl">
        <div className="flex items-start space-x-4">
          <Avatar>
            <AvatarImage
              alt="@shadcn"
              src="/avatar.png"
              width={48}
              height={60}
            />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          {/* // TODO  */}
          {/* {JSON.stringify(interview)} */}
          <div>
            <h2 className="text-xl font-semibold">
              AI hiring manager feedback
            </h2>
            <p className="mt-1 text-gray-700">
              Feedback for the candidate&apos;s job interview:
            </p>
          </div>
        </div>
        <div className="mt-4">
          <h3 className="text-lg font-medium	"> 💪 Strengths:</h3>
          <ul className="list-disc pl-4 space-y-1 text-gray-700">
            {strengths.map((stength, index) => (
              <li key={index} className="list-none">
                - {stength}
              </li>
            ))}
          </ul>
        </div>
        <div className="mt-4">
          <h3 className="text-lg font-medium	">📉 Weaknesses:</h3>
          <ul className="list-disc pl-4 space-y-1 text-gray-700">
            {weaknesses.map((weakness, index) => (
              <li key={index} className="list-none">
                - {weakness}
              </li>
            ))}
          </ul>
        </div>
        <div className="mt-4">
          <h3 className="text-lg font-medium	">🏋️‍♂️ Improvement suggestions:</h3>
          <ul className="list-disc pl-4 space-y-1 text-gray-700">
            {improvementSuggestions.map((improvement, index) => (
              <li key={index} className="list-none">
                - {improvement}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
