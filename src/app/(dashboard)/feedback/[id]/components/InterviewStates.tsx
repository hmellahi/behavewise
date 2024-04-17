export default function InterviewStates({ result }) {
  const { score } = result;
  return (
    <div className="min-w-72 max-w-5xl p-6 bg-white rounded-xl">
      <h3 className="text-2xl font-semibold">Interview States</h3>
      <div className="text-xl flexd gap-10 mt-3 items-center">
        <div className="text-green-600 font-bold text-3xl"> {score}% </div>
        <span className="text-xl">Interview Score</span>
      </div>

    </div>
  );
}
