import { interviewQuestion } from "@/app/(dashboard)/interview/[id]/types/Interview";
import { OpenAIStream, OpenAIStreamPayload } from "@/utils/OpenAIStream";

const preparePrompt = (question: interviewQuestion, answerScript: string) => {
  const prompt = `Please give feedback on the following interview question: ${question.caption} given the following transcript: ${answerScript} also give a score from 0 to 10. ${question.prompt} \n\n\ The feedback must be in this format (json):
  {
    "score": 7,
    "message": "good"
  }
  `;

  return prompt;
};

const evaluateAnswer = async (
  question: interviewQuestion,
  answerScript: string
) => {
  if (!answerScript) {
    throw new Error("No answerScript in the request");
  }

  const prompt = preparePrompt(question, answerScript);
  const payload: OpenAIStreamPayload = {
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content:
          "You are a tech hiring manager. You are to only provide feedback on the interview candidate's transcript. If it is not relevant and does not answerScript the question, make sure to say that. Do not be overly verbose and focus on the candidate's response.",
      },
      { role: "user", content: prompt },
    ],
    temperature: 0.7,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
    max_tokens: 450,
    stream: false,
    n: 1,
  };

  return OpenAIStream(payload);
};

export default evaluateAnswer;
