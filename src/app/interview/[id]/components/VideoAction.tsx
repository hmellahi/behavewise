import ProcessTranscriptButton from "./ProcessTranscriptButton";
import ToggleRecordingButton from "./ToggleRecordingButton";
import RestartButton from "./ui/RestartButton";

interface VideoActionsProps {
  length: number;
  isSubmitting: boolean;
  status?: string;
  SubmitAnswer: () => void;
  restartVideo: () => void;
  capturing: boolean;
  handleStartCaptureClick: () => void;
  handleStopCaptureClick: () => void;
}

export default function VideoActions({
  length,
  isSubmitting,
  status,
  SubmitAnswer,
  restartVideo,
  capturing,
  handleStartCaptureClick,
  handleStopCaptureClick,
}: Readonly<VideoActionsProps>) {
  return (
    <div className="absolute bottom-0 left-0 z-50 flex h-[82px] w-full items-center justify-center">
      {length > 0 ? (
        <div className="flex flex-row gap-2">
          {!isSubmitting && <RestartButton onClick={restartVideo} />}
          <ProcessTranscriptButton
            isSubmitting={isSubmitting}
            status={status}
            SubmitAnswer={SubmitAnswer}
          />
        </div>
      ) : (
        <ToggleRecordingButton
          capturing={capturing}
          handleStartCaptureClick={handleStartCaptureClick}
          handleStopCaptureClick={handleStopCaptureClick}
        />
      )}
    </div>
  );
}
