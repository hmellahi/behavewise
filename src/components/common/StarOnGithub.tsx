import Link from "next/link";

export default function StarOnGithubButton() {
  return (
    <Link
      href="https://github.com/hmellahi/mockinterview-ai"
      target="_blank"
      className="group rounded-full pl-[8px] min-w-[180px] pr-4 py-2 text-[13px] font-semibold transition-all flex items-center justify-center bg-[#1E2B3A] text-white hover:[linear-gradient(0deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.1)), #0D2247] no-underline flex gap-x-2  active:scale-95 scale-100 duration-75"
      style={{
        boxShadow:
          "0px 1px 4px rgba(13, 34, 71, 0.17), inset 0px 0px 0px 1px #061530, inset 0px 0px 0px 2px rgba(255, 255, 255, 0.1)",
      }}
    >
      <span className="w-5 h-5 rounded-full bg-[#407BBF] flex items-center justify-center">
        <svg
          className="w-[16px] h-[16px] text-white"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4.75 7.75C4.75 6.64543 5.64543 5.75 6.75 5.75H17.25C18.3546 5.75 19.25 6.64543 19.25 7.75V16.25C19.25 17.3546 18.3546 18.25 17.25 18.25H6.75C5.64543 18.25 4.75 17.3546 4.75 16.25V7.75Z"
          ></path>
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M5.5 6.5L12 12.25L18.5 6.5"
          ></path>
        </svg>
      </span>
      Star on Github
    </Link>
  );
}
