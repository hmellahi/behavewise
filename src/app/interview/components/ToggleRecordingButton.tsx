import StartTimerButton from "./ui/StartTimerButton";
import StopTimerButton from "./ui/StopTimerButton";

interface ToggleRecordingButtonProps {
  capturing: boolean;
  handleStopCaptureClick: () => void;
  handleStartCaptureClick: () => void;
}

export default function ToggleRecordingButton({
  capturing,
  handleStopCaptureClick,
  handleStartCaptureClick,
}: Readonly<ToggleRecordingButtonProps>) {
  return (
    <div className="absolute bottom-[6px] md:bottom-5 left-5 right-5">
      <div className="lg:mt-4 flex flex-col items-center justify-center gap-2">
        {capturing ? (
          <StopTimerButton handleStopCaptureClick={handleStopCaptureClick} />
        ) : (
          <StartTimerButton handleStartCaptureClick={handleStartCaptureClick} />
        )}
        <div className="w-12"></div>
      </div>
    </div>
  );
}
