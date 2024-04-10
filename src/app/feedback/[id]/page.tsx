/**
 * v0 by Vercel.
 * @see https://v0.dev/t/eLVPzGkF4ul
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
// import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar"

import { fetchInterviewFeedback } from "@/server-actions/interview/interview.actions";
import { redirect } from "next/navigation";
import { AnswersFeedback } from "./components/AnswersFeedback";

export default async function Feedback({ params }: { params: { id: string } }) {
  const { id: interviewId } = params;
  const interview = await fetchInterviewFeedback(interviewId);

  if (!interview) {
    redirect("/");
  }

  // return <InterviewFeedback interview={interview} />
  return (
    <>
      <AnswersFeedback />
    </>
  );
}
