export default function ProductCardSkeleton() {
  return (
    <div className="overflow-hidden rounded-2xl border border-line bg-surface">
      <div className="aspect-square animate-pulse bg-line/60" />
      <div className="flex flex-col gap-2 p-4">
        <div className="h-3 w-16 animate-pulse rounded bg-line/60" />
        <div className="h-4 w-3/4 animate-pulse rounded bg-line/60" />
        <div className="h-5 w-1/2 animate-pulse rounded bg-line/60" />
        <div className="mt-3 h-10 w-full animate-pulse rounded-xl bg-line/60" />
      </div>
    </div>
  );
}
