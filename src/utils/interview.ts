import * as interviewActions from "@/server-actions/interview/interview.actions";

export const createAndRedirectToInterview = async () => {
  const createdInterview = await interviewActions.startNewInterview();
  window.location.href = `/interview/${createdInterview.id} `;
};
