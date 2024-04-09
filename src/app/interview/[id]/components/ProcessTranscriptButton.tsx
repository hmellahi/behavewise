import { RightArrow } from "@/components/svgs";
import Spinner from "@/components/svgs/Spinner";

// @ts-ignore
interface ProcessTranscriptButtonProps {
  SubmitAnswer: () => void;
  status?: string;
  isSubmitting: boolean;
}

export default function ProcessTranscriptButton({
  SubmitAnswer,
  status,
  isSubmitting,
}: Readonly<ProcessTranscriptButtonProps>) {
  return (
    <button
      onClick={SubmitAnswer}
      disabled={isSubmitting}
      className="group rounded-full min-w-[140px] px-4 py-2 text-[13px] font-semibold transition-all flex items-center justify-center bg-[#1E2B3A] text-white hover:[linear-gradient(0deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.1)), #0D2247] no-underline flex  active:scale-95 scale-100 duration-75  disabled:cursor-not-allowed"
      style={{
        boxShadow:
          "0px 1px 4px rgba(13, 34, 71, 0.17), inset 0px 0px 0px 1px #061530, inset 0px 0px 0px 2px rgba(255, 255, 255, 0.1)",
      }}
    >
      <span>
        {isSubmitting ? (
          <div className="flex items-center justify-center gap-x-2">
            <Spinner className="animate-spin h-5 w-5 text-slate-50 mx-auto" />
            <span>{status}</span>
          </div>
        ) : (
          <div className="flex items-center justify-center gap-x-2">
            <span>Process transcript</span>
            <RightArrow className="w-5 h-5" />
          </div>
        )}
      </span>
    </button>
  );
}
