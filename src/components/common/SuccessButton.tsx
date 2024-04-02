import { motion } from "framer-motion";

export default function SuccessButton() {
  return (
    <button
      className="cursor-disabled group rounded-full min-w-[140px] px-4 py-2 text-[13px] font-semibold group inline-flex items-center justify-center text-sm text-white duration-150 bg-green-500 hover:bg-green-600 hover:text-slate-100 focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600 active:scale-100 active:bg-green-800 active:text-green-100"
      style={{
        boxShadow:
          "0px 1px 4px rgba(27, 71, 13, 0.17), inset 0px 0px 0px 1px #5fc767, inset 0px 0px 0px 2px rgba(255, 255, 255, 0.1)",
      }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5 mx-auto"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <motion.path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.5 }}
        />
      </svg>
    </button>
  );
}
