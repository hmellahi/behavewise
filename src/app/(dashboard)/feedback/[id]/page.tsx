import Headline from "@/components/ui/Headline";
import { fetchInterviewFeedback } from "@/server-actions/interview/interview.actions";
import { redirect } from "next/navigation";
import { AnswersFeedback } from "./components/AnswersFeedback";
import InterviewFeedback from "./components/InterviewFeedback";

export default async function Feedback({ params }: { params: { id: string } }) {
  const { id: interviewId } = params;
  const interview = await fetchInterviewFeedback(interviewId);
  console.log(interview);
  if (!interview) {
    redirect("/");
  }

  return (
      <InterviewFeedback initialInterviewData={interview}/>
  );
}
