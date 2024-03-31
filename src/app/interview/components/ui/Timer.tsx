export default function Timer({ seconds }: Readonly<{ seconds: number }>) {
  return (
    <div className="absolute top-5 lg:top-10 left-5 lg:left-10 z-20">
      <span className="inline-flex items-center rounded-md bg-gray-100 px-2.5 py-0.5 text-sm font-medium text-gray-800">
        {new Date(seconds * 1000).toISOString().slice(14, 19)}
      </span>
    </div>
  );
}
