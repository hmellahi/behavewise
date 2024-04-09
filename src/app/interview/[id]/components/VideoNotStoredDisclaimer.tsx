import { motion } from "framer-motion";

export default function VideoNotStoredDisclaimer() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        delay: 0.5,
        duration: 0.15,
        ease: [0.23, 1, 0.82, 1],
      }}
      className="flex flex-row space-x-1 mt-4 items-center"
    >
      <svg
        className="w-4 h-4 text-[#407BBF]"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={2}
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
        />
      </svg>
      <p className="text-[14px] font-normal leading-[20px] text-[#1a2b3b]">
        Video is not stored on our servers, it is solely used for transcription.
      </p>
    </motion.div>
  );
}
