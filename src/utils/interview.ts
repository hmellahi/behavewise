import * as interviewActions from "@/server-actions/interview/interview.actions";
import { v4 } from "uuid";

export const createAndRedirectToInterview = async () => {
  const generatedInterviewId = v4();
  window.location.href = `/interview/${generatedInterviewId} `;
};
