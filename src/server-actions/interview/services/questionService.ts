import interviewQuestions from "@/app/interview/[id]/constants/interviewQuestions";

const getQuestionById = (questionId: string) => {
  const question = interviewQuestions.find(
    (question) => question.id === parseInt(questionId)
  );
  if (!question) {
    throw new Error("Question not found");
  }
  return question;
};

const countQuestions = async (interviewId: string) => {
  return interviewQuestions.length;
};

export default {
  getQuestionById,
  countQuestions,
};
