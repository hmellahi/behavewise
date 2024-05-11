import PageWrapper from "@/components/ui/PageWrapper";
import { fetchInterviewFeedback } from "@/server-actions/interview/interview.actions";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import InterviewFeedback from "./components/InterviewFeedback";

export const metadata: Metadata = {
  title: "Mock Interview Feedback",
};

export default async function Feedback({ params }: { params: { id: string } }) {
  const { id: interviewId } = params;
  const interview = await fetchInterviewFeedback(interviewId);

  if (!interview) {
    redirect("/");
  }

  return (
    <PageWrapper metadata={metadata}>
      <InterviewFeedback initialInterviewData={interview} />
    </PageWrapper>
  );
}
