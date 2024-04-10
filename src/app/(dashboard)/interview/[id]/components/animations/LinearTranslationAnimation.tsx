import { motion } from "framer-motion";

// @ts-ignore
export default function LinearTranslationAnimation({ children }) {
  return (
    <div
      // initial={{ y: -20 }}
      // animate={{ y: 0 }}
      // transition={{
      //   duration: 0.35,
      //   ease: [0.075, 0.82, 0.965, 1],
      // }}
      className="relative aspect-[16/9] w-full max-w-[1080px] overflow-hidden bg-[#1D2B3A] rounded-lg ring-1 ring-gray-900/5 shadow-md"
    >
      {children}
    </div>
  );
}
