export default function Loading() {
  return (
    <div className="container pt-32 sm:pt-40 pb-16">
      <div className="animate-pulse space-y-4 max-w-2xl">
        <div className="h-3 w-24 bg-white/[0.05] rounded" />
        <div className="h-12 w-3/4 bg-white/[0.05] rounded" />
        <div className="h-5 w-full bg-white/[0.04] rounded" />
        <div className="h-5 w-5/6 bg-white/[0.04] rounded" />
      </div>
    </div>
  );
}
