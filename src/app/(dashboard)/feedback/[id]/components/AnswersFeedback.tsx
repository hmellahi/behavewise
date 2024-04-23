"use client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Answer } from "@prisma/client";
import AnswerFeedbackDetails from "./AnswerFeedbackDetails";

export function AnswersFeedback({ answers }: { answers: Answer[] }) {
  // map score with a color based on score, define over 6 too.. (green)

  const scoreToColor = {
    1: "bg-red-500",
    2: "bg-red-500",
    3: "bg-yellow-500",
    4: "bg-yellow-500",
    5: "bg-green-500",
    6: "bg-green-500",
    7: "bg-green-700",
    8: "bg-green-700",
    9: "bg-green-700",
    10: "bg-green-700",
  };

  const truncate = (str: string) => {
    const max = 90;
    return str.length > max ? str.slice(0, max) + "..." : str;
  };

  const getAnswerScore = (answer: Answer) => {
    // @ts-ignore
    return answer.feedback.score;
  };

  const getAnswerScoreClass = (answer: Answer) => {
    // @ts-ignore
    return scoreToColor[getAnswerScore(answer)];
  };

  return (
    <div className=" p-8 bg-white rounded-xl">
      <h3 className="text-2xl font-semibold mb-5">Answers Feedback</h3>
      <Accordion
        type="single"
        collapsible
        className="w-full flex gap-2 flex-col"
      >
        {answers.map((answer) => (
          <AccordionItem
            value={answer.id}
            key={answer.id}
            className="rounded-lg w-full"
          >
            <AccordionTrigger className="bg-[#ECEFF3] py-3 px-4 rounded-[1rem] w-full">
              <div className="flex justify-between w-full pr-5">
                <div className="basis-[80%] text-left hover:underline truncated overflow-hidden min-w-0">
                  {/* @ts-ignore */}
                  <p className="truncated w-[80%d] overflow-hidden">
                    {truncate(answer.question.caption)}
                  </p>
                </div>
                <div className="min-w-0 basis-[20%] text-right  shrink-0 overflow-hidden text-black">
                  {answer.score}
                  <Badge
                    // @ts-ignore
                    className={`h-6 shrink-0 ${getAnswerScoreClass(
                      answer
                    )} hover:${getAnswerScoreClass(answer)}
                  `}
                  >
                    {getAnswerScore(answer)} / 10
                  </Badge>
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <AnswerFeedbackDetails answer={answer} />
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
