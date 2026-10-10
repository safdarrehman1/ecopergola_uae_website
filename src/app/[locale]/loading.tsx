import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="container mx-auto px-4 max-w-7xl py-16 space-y-12 animate-pulse">
      {/* Skeleton Hero */}
      <div className="space-y-4 max-w-2xl">
        <Skeleton className="h-6 w-32 rounded-full" />
        <Skeleton className="h-12 w-full max-w-lg rounded-2xl" />
        <Skeleton className="h-4 w-3/4 rounded-lg" />
        <Skeleton className="h-4 w-1/2 rounded-lg" />
      </div>

      {/* Skeleton Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pt-8">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="rounded-3xl border border-border p-6 space-y-4">
            <Skeleton className="h-48 w-full rounded-2xl" />
            <Skeleton className="h-6 w-3/4 rounded-lg" />
            <Skeleton className="h-4 w-full rounded-lg" />
            <Skeleton className="h-4 w-2/3 rounded-lg" />
          </div>
        ))}
      </div>
    </div>
  );
}
