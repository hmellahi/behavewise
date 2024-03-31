export default function StopTimerButton({
  handleStopCaptureClick,
}: Readonly<{
  handleStopCaptureClick: () => void;
}>) {
  return (
    <div
      id="stopTimer"
      onClick={handleStopCaptureClick}
      className="flex h-10 w-10 flex-col items-center justify-center rounded-full bg-transparent text-white hover:shadow-xl ring-4 ring-white  active:scale-95 scale-100 duration-75 cursor-pointer"
    >
      <div className="h-5 w-5 rounded bg-red-500 cursor-pointer"></div>
    </div>
  );
}
