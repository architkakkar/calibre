import { Skeleton } from "@/components/ui/skeleton";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";

type NutritionPlanViewDialogSkeletonProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function NutritionPlanViewDialogSkeleton({
  open,
  onOpenChange,
}: NutritionPlanViewDialogSkeletonProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="p-0 w-full sm:max-w-[95vw] md:max-w-[90vw] h-[95dvh] gap-0 bg-background flex flex-col overflow-hidden">
        <DialogTitle hidden></DialogTitle>
        <DialogDescription hidden></DialogDescription>

        {/* Laptop & Desktop: width > 1024px */}
        <div className="hidden lg:flex flex-1 min-h-0">
          <div className="w-80 border-r border-border bg-linear-to-b from-muted/20 to-background flex flex-col">
            <div className="p-5 border-b border-border bg-card/80 backdrop-blur-sm space-y-3">
              <div className="flex items-center gap-3">
                <Skeleton className="h-9 w-9 rounded-xl" />
                <Skeleton className="h-6 flex-1" />
              </div>
              <Skeleton className="h-10 w-full" />
              <div className="flex items-center gap-2">
                <Skeleton className="h-6 w-20" />
                <Skeleton className="h-6 w-20" />
              </div>
              <Skeleton className="h-10 w-full rounded-lg" />
            </div>
            <div className="p-2.5 space-y-2">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="space-y-1">
                  <Skeleton className="h-16 w-full rounded-lg" />
                </div>
              ))}
            </div>
          </div>
          <div className="flex-1 flex flex-col overflow-hidden">
            <div className="p-5 border-b border-border bg-linear-to-r from-card/80 to-background">
              <div className="flex items-center gap-3">
                <Skeleton className="h-10 w-10 rounded-xl" />
                <div className="space-y-1.5">
                  <Skeleton className="h-6 w-40" />
                  <Skeleton className="h-4 w-72" />
                </div>
              </div>
            </div>
            <div className="flex-1 overflow-y-auto">
              <div className="p-5 space-y-8">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Skeleton className="h-10 w-10 rounded-xl" />
                    <div className="space-y-1.5">
                      <Skeleton className="h-5 w-32" />
                      <Skeleton className="h-3 w-64" />
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <Skeleton className="h-32 rounded-xl" />
                    <Skeleton className="h-32 rounded-xl" />
                    <Skeleton className="h-32 rounded-xl" />
                  </div>
                  <Skeleton className="h-40 rounded-xl" />
                </div>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Skeleton className="h-10 w-10 rounded-xl" />
                    <div className="space-y-1.5">
                      <Skeleton className="h-5 w-28" />
                      <Skeleton className="h-3 w-52" />
                    </div>
                  </div>
                  <Skeleton className="h-48 rounded-xl" />
                </div>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Skeleton className="h-10 w-10 rounded-xl" />
                    <div className="space-y-1.5">
                      <Skeleton className="h-5 w-36" />
                      <Skeleton className="h-3 w-48" />
                    </div>
                  </div>
                  <div className="space-y-4">
                    <Skeleton className="h-32 rounded-xl" />
                    <Skeleton className="h-32 rounded-xl" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile & Tablet: width < 1024px */}
        <div className="lg:hidden flex flex-1 flex-col min-h-0">
          <div className="p-5 border-b border-border bg-card/80 backdrop-blur-sm">
            <div className="flex items-center gap-3">
              <Skeleton className="h-9 w-9 rounded-lg" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-6 w-32" />
                <Skeleton className="h-4 w-48" />
              </div>
              <Skeleton className="h-9 w-9 rounded-lg" />
            </div>
          </div>
          <div className="flex-1 overflow-y-auto">
            <div className="p-5 space-y-6">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Skeleton className="h-10 w-10 rounded-xl" />
                  <div className="space-y-1.5 flex-1">
                    <Skeleton className="h-5 w-32" />
                    <Skeleton className="h-3 w-64" />
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <Skeleton className="h-28 rounded-xl" />
                  <Skeleton className="h-28 rounded-xl" />
                  <Skeleton className="h-28 rounded-xl" />
                </div>
                <Skeleton className="h-48 rounded-xl" />
              </div>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Skeleton className="h-10 w-10 rounded-xl" />
                  <div className="space-y-1.5 flex-1">
                    <Skeleton className="h-5 w-28" />
                    <Skeleton className="h-3 w-52" />
                  </div>
                </div>
                <Skeleton className="h-48 rounded-xl" />
              </div>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Skeleton className="h-10 w-10 rounded-xl" />
                  <div className="space-y-1.5 flex-1">
                    <Skeleton className="h-5 w-36" />
                    <Skeleton className="h-3 w-48" />
                  </div>
                </div>
                <div className="space-y-3">
                  <Skeleton className="h-24 rounded-xl" />
                  <Skeleton className="h-24 rounded-xl" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
