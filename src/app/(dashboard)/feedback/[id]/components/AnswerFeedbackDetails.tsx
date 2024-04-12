import { Answer } from "@prisma/client";

export default function AnswerFeedbackDetails({ answer }: { answer: Answer }) {
  const { transcript, feedback } = answer;
  return (
    <div className="bg-white rounded-b-lg p-6 border-2 border-t-0 border-gray-300 !shadow-lg">
      <div>
        <h2 className="text-xl font-semibold text-left text-[#1D2B3A] mb-2">
          Transcript
        </h2>
        <p className="prose prose-sm max-w-none">
          {transcript.length > 0
            ? transcript
            : "Don't think you said anything. Want to try again?"}
        </p>
      </div>
      <div className="mt-8">
        <h2 className="text-xl font-semibold text-left text-[#1D2B3A] mb-2">
          Feedback
        </h2>
        <div className="mt-4 text-sm flex gap-2.5 rounded-lg border border-[#EEEEEE] bg-[#FAFAFA] p-4 leading-6 text-gray-900 min-h-[100px] shadow-sm justify-between">
          <p className="prose prose-sm max-w-none">{JSON.parse(feedback)}</p>
        </div>
      </div>
    </div>
  );
}
