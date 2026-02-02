import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="flex h-full flex-col rounded-2xl border border-border bg-card">
      <div className="flex flex-1 flex-col items-center justify-center gap-4 px-4 -mt-15">
        {/* Subtitle skeleton */}
        <Skeleton className="h-4 w-72 max-w-full" />
        {/* Suggestion pills grid */}
        <div className="flex flex-wrap justify-center gap-2 max-w-md">
          <Skeleton className="h-7 w-52 rounded-full" />
          <Skeleton className="h-7 w-48 rounded-full" />
          <Skeleton className="h-7 w-44 rounded-full" />
          <Skeleton className="h-7 w-56 rounded-full" />
        </div>
      </div>
      <div className="border-t border-border bg-background p-4">
        <div className="mx-auto max-w-3xl">
          {/* Input field skeleton */}
          <div className="flex items-center gap-2 rounded-lg border border-border bg-background p-2">
            <div className="flex gap-1">
              <Skeleton className="h-9 w-9 rounded-md" />
              <Skeleton className="h-9 w-9 rounded-md" />
            </div>
            <Skeleton className="h-9 flex-1" />
            <Skeleton className="h-9 w-9 rounded-md" />
          </div>
          {/* Disclaimer text skeleton */}
          <Skeleton className="hidden md:block mx-auto mt-3 h-3 w-full max-w-lg" />
        </div>
      </div>
    </div>
  );
}
