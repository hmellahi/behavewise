export default function RestartButton({
  onClick,
}: Readonly<{ onClick: () => void }>) {
  return (
    <button
      onClick={onClick}
      className="group rounded-full px-4 py-2 text-[13px] font-semibold transition-all flex items-center justify-center bg-white text-[#1E2B3A] hover:[linear-gradient(0deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.1)), #0D2247] no-underline flex gap-x-2  active:scale-95 scale-100 duration-75"
    >
      Restart
    </button>
  );
}
