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

  return (
    <div className="max-w-5xl p-4 border border-gray-300 rounded-lg bg-white">
      <h3 className="text-2xl font-semibold mb-5">Answers Feedback</h3>
      <Accordion
        type="single"
        collapsible
        className="w-full flex gap-4 flex-col"
      >
        {answers.map((answer) => (
          <AccordionItem
            value={answer.id}
            key={answer.id}
            className="rounded-lg shadow-md w-full"
          >
            <AccordionTrigger className="bg-muted/40 p-4 border-b-[.5px] border-gray-300 rounded-t-lg w-full">
              <div className="flex justify-between w-full pr-5">
                <h3 className="truncate w-[60%] text-left hover:underline">
                  {answer.question.caption}
                </h3>
                <Badge
                  className={`h-6 shrink-0 ${
                    scoreToColor[answer.score]
                  } hover:${scoreToColor[answer.score]}
                  `}
                >
                  {answer.score} / 10
                </Badge>
              </div>
              {/* </div> */}
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
