"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { fetchInterviewFeedback } from "@/server-actions/interview/interview.actions";
import { useEffect, useState } from "react";
export default function InterviewFeedback({
  initialInterviewData,
}: {
  initialInterviewData: any;
}) {
  let [interview, setInterview] = useState(initialInterviewData);
  useEffect(() => {
    if (interview?.status !== "IN_PROGRESS") {
      return;
    }
    // each 1 seconds fetch the feedback
    // if its still IN_PROGRESS (feedback.status)
    // otherwise display it
    const interval = setInterval(async () => {
      interview = await fetchInterviewFeedback(interview.id);
      setInterview({ ...interview });
      if (interview?.status !== "IN_PROGRESS") {
        clearInterval(interval);
      }
    }, 1000);
  });

  if (!interview) {
    return <div>"loading..."</div>;
  }

  return (
    <div className="max-w-5xl p-6 bg-white border border-gray-300 rounded-lg">
      <div className="flex items-start space-x-4">
        <Avatar>
          <AvatarImage
            alt="@shadcn"
            src="https://github.com/shadcn.png"
            width={48}
            height={60}
          />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        {/* // TODO  */}
        {/* {JSON.stringify(interview)} */}
        <div>
          <h2 className="text-xl font-semibold">AI hiring manager feedback</h2>
          <p className="mt-1 text-gray-700">
            Feedback for the candidate's job interview:
          </p>
        </div>
      </div>
      <div className="mt-4">
        <h3 className="text-lg font-semibold">Strengths:</h3>
        <ul className="list-disc pl-5 space-y-1 text-gray-700">
          <li>
            Candidate has relevant experience in software engineering and
            working on innovative projects
          </li>
          <li>
            Demonstrates a proactive approach to learning and seeking feedback
          </li>
          <li>
            Asks thoughtful questions about company culture and the ideal
            candidate for the position
          </li>
        </ul>
      </div>
      <div className="mt-4">
        <h3 className="text-lg font-semibold">Weaknesses:</h3>
        <ul className="list-disc pl-5 space-y-1 text-gray-700">
          <li>
            Occasionally jumps between different topics and experiences, leading
            to a lack of clarity in responses
          </li>
          <li>
            Could work on providing more specific and concise answers to
            interview questions
          </li>
          <li>
            Salary expectation could be more research-based and tailored to the
            company and role
          </li>
        </ul>
      </div>
      <div className="mt-4">
        <h3 className="text-lg font-semibold">Improvement suggestions:</h3>
        <ul className="list-disc pl-5 space-y-1 text-gray-700">
          <li>
            Practice structuring responses to provide clear and concise
            information
          </li>
          <li>
            Research and align salary expectations with the industry standards
            and the specific company
          </li>
          <li>
            Continue asking relevant and insightful questions, while also
            actively listening and engaging in conversation with the interviewer
          </li>
        </ul>
      </div>
    </div>
  );
}
