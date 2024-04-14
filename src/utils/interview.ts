import * as interviewActions from "@/server-actions/interview/interview.actions";
import { uuid } from "uuidv4";

export const createAndRedirectToInterview = async () => {
  const generatedInterviewId = uuid();
  window.location.href = `/interview/${generatedInterviewId} `;
};
