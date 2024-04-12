export default function Headline({ children }: { children: React.ReactNode }) {
  return <h2 className="text-3xl font-semibold flex gap-2 items-center mb-4">{children}</h2>;
}
