import StartTimerButton from "./ui/StartTimerButton";
import StopTimerButton from "./ui/StopTimerButton";

interface ToggleRecordingButtonProps {
  capturing: boolean;
  handleStopCaptureClick: () => void;
  handleStartCaptureClick: () => void;
  canStopRecording: boolean;
}

export default function ToggleRecordingButton({
  capturing,
  handleStopCaptureClick,
  handleStartCaptureClick,
  canStopRecording,
}: Readonly<ToggleRecordingButtonProps>) {
  return (
    <div className="absolute bottom-[6px] md:bottom-5 left-5 right-5">
      <div className="lg:mt-4 flex flex-col items-center justify-center gap-2">
        {capturing ? (
          canStopRecording && (
            <StopTimerButton handleStopCaptureClick={handleStopCaptureClick} />
          )
        ) : (
          <StartTimerButton handleStartCaptureClick={handleStartCaptureClick} />
        )}
        <div className="w-12"></div>
      </div>
    </div>
  );
}
