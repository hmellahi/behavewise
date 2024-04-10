import StarOnGithubButton from "@/components/common/StarOnGithub";
import { motion } from "framer-motion";

export default function NoCameraAccess() {
  return (
    <div className="w-full flex flex-col max-w-[1080px] mx-auto justify-center">
      <motion.div
        initial={{ y: 20 }}
        animate={{ y: 0 }}
        transition={{
          duration: 0.35,
          ease: [0.075, 0.82, 0.165, 1],
        }}
        className="relative md:aspect-[16/9] w-full max-w-[1080px] overflow-hidden bg-[#1D2B3A] rounded-lg ring-1 ring-gray-900/5 shadow-md flex flex-col items-center justify-center"
      >
        <p className="text-white font-medium text-lg text-center max-w-3xl">
          Camera permission is denied. We don{`'`}t store your attempts
          anywhere, but we understand not wanting to give us access to your
          camera. Try again by opening this page in an incognito window {`(`}or
          enable permissions in your browser settings
          {`)`}.
        </p>
      </motion.div>
      <div className="flex flex-row space-x-4 mt-8 justify-end">
        {/* TODO */}
        <button
          className="group max-w-[200px] rounded-full px-4 py-2 text-[13px] font-semibold transition-all flex items-center justify-center bg-[#f5f7f9] text-[#1E2B3A] no-underline active:scale-95 scale-100 duration-75"
          style={{
            boxShadow: "0 1px 1px #0c192714, 0 1px 3px #0c192724",
          }}
        >
          Restart demo
        </button>
        <StarOnGithubButton />
      </div>
    </div>
  );
}
