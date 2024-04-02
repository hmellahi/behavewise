export default function LoadingState() {
  return (
    <div className="absolute flex h-full w-full items-center justify-center">
      <div className="relative h-[112px] w-[112px] rounded-lg object-cover text-[2rem]">
        <div className="flex h-[112px] w-[112px] items-center justify-center rounded-[0.5rem] bg-[#4171d8] !text-white">
          Loading...
        </div>
      </div>
    </div>
  );
}
