// @ts-ignore
export default function GeneralFeedback({ result }) {
  const { strengths, weaknesses, improvementSuggestions } = result;
  return (
    <div className="max-w-6xl p-6 bg-white rounded-xl">
      <h3 className="text-2xl font-semibold">General Feedback</h3>
      <div className="mt-4">
        <h3 className="text-lg font-medium	"> 💪 Strengths:</h3>
        <ul className="list-disc pl-4 space-y-1 text-gray-700">
          {strengths.map((stength: string, index: number) => (
            <li key={index} className="list-none">
              - {stength}
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-4">
        <h3 className="text-lg font-medium	">📉 Weaknesses:</h3>
        <ul className="list-disc pl-4 space-y-1 text-gray-700">
          {weaknesses.map((weakness: string, index: number) => (
            <li key={index} className="list-none">
              - {weakness}
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-4">
        <h3 className="text-lg font-medium	">🏋️‍♂️ Improvement suggestions:</h3>
        <ul className="list-disc pl-4 space-y-1 text-gray-700">
          {improvementSuggestions.map((improvement: string, index: number) => (
            <li key={index} className="list-none">
              - {improvement}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
