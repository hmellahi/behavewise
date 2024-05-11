export default function InterviewStates({ result }: { result: any }) {
  const { score } = result;
  return (
    <div className="w-[20rem] max-w-5xl p-6 bg-white rounded-xl">
      <h3 className="text-2xl font-semibold">Interview States</h3>
      <div className="text-xl flex gap-10 mt-3 items-center w-full justify-between">
        <span className="text-xl">Interview Score</span>
        <span className="text-green-600 font-bold text-2xl"> {score}% </span>
      </div>
    </div>
  );
}
