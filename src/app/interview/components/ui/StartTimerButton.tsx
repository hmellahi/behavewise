export default function StartTimerButton(props) {
  return (
    <button
      id="startTimer"
      onClick={props.handleStartCaptureClick}
      className="flex h-8 w-8 sm:h-8 sm:w-8 flex-col items-center justify-center rounded-full bg-red-500 text-white hover:shadow-xl ring-4 ring-white ring-offset-gray-500 ring-offset-2 active:scale-95 scale-100 duration-75"
    ></button>
  );
}
