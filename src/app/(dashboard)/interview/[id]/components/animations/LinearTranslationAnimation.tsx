import { twMerge } from "tailwind-merge";

export default function LinearTranslationAnimation({ children, className } : {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      // initial={{ y: -20 }}
      // animate={{ y: 0 }}
      // transition={{
      //   duration: 0.35,
      //   ease: [0.075, 0.82, 0.965, 1],
      // }}
      className={twMerge(
        "relative aspect-[16/9] w-full max-w-[1080px] overflow-hidden  rounded-xl ring-1 ring-gray-900/5 shadow-md border-4 border-white",
        className
      )}
    >
      {children}
    </div>
  );
}
