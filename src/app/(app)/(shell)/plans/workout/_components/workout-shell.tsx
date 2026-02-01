"use client";

import { useEffect, useState } from "react";
import { useWorkoutPlanStore } from "@/stores/workout-plan.store";
import { WorkoutEmptyState } from "./workout-empty-state";
import { WorkoutCreatePlanDialog } from "./workout-create-plan-dialog";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

export function WorkoutShell({ children }: { children: React.ReactNode }) {
  const { hasPlans, isFetchingPlans, fetchPlans } = useWorkoutPlanStore();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    fetchPlans();
  }, [fetchPlans]);

  if (isFetchingPlans) {
    return (
      <>
        <Skeleton className="h-15 w-2/3 rounded-lg mb-4" />
        <Skeleton className="h-[calc(100dvh-184px)] w-full rounded-2xl mt-4" />
      </>
    );
  }

  return (
    <div>
      <header className="px-1 mt-1 md:mt-0">
        <div className="flex justify-between">
          <h1 className="text-3xl font-bold text-primary">Workout Plans</h1>
          {hasPlans && (
            <>
              <Button
                size="sm"
                variant="outline"
                className="hidden xs:block font-semibold text-primary"
                onClick={() => setIsDialogOpen(true)}
              >
                Create Workout Plan
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="xs:hidden font-semibold text-primary"
                onClick={() => setIsDialogOpen(true)}
              >
                Create Plan
              </Button>
            </>
          )}
        </div>
        <p className="mt-1 text-sm text-muted-foreground">
          {hasPlans
            ? "Monitor your workouts, track progress, and achieve your fitness goals."
            : "Create AI-powered workout plans tailored to your goals, schedule, and equipment."}
        </p>
      </header>
      <main className="h-[calc(100dvh-184px)] xs:h-[calc(100dvh-164px)] md:h-[calc(100dvh-184px)] w-full text-primary border border-border rounded-2xl mt-4 relative bg-card/30 overflow-hidden">
        {hasPlans ? <>{children}</> : <WorkoutEmptyState />}
      </main>
      <WorkoutCreatePlanDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
      />
    </div>
  );
}
