export default function Timer({ seconds }: Readonly<{ seconds: number }>) {
  return (
    <div className="absolute top-5 lg:top-10 left-5 lg:left-10 z-20">
      <span className="inline-flex items-center rounded-xl bg-dark px-2.5 py-1 text-sm font-medium text-white">
        {new Date(seconds * 1000).toISOString().slice(14, 19)}
      </span>
    </div>
  );
}
