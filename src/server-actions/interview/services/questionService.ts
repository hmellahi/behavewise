import interviewQuestions from "@/app/interview/constants/interviewQuestions";

const getQuestionById = (questionId: string) => {
  return interviewQuestions.find(
    (question) => question.id === parseInt(questionId)
  );
};

export default {
  getQuestionById,
}
