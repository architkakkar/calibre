"use client";

import { useEffect, useState } from "react";
import { useNutritionPlanStore } from "@/stores/nutrition-plan.store";
import { NutritionEmptyState } from "./nutrition-empty-state";
import { CreateNutritionPlanDialog } from "./create-nutrition-plan-dialog";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

export function NutritionShell({ children }: { children: React.ReactNode }) {
  const { hasPlans, isFetchingPlans, fetchPlans } = useNutritionPlanStore();
  const [open, setOpen] = useState(false);

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
          <h1 className="text-3xl font-bold text-primary">Nutrition Plans</h1>
          {hasPlans && (
            <Button
              size="sm"
              className="font-semibold"
              onClick={() => setOpen(true)}
            >
              Create Nutrition Plan
            </Button>
          )}
        </div>
        <p className="mt-1 text-sm text-muted-foreground">
          {hasPlans
            ? "Track your progress, crush your goals, and evolve your nutrition journey with every meal."
            : "Transform your health with AI-powered nutrition plans tailored to your goals, preferences, and lifestyle."}
        </p>
      </header>
      <main className="h-[calc(100dvh-184px)] w-full text-primary border border-border rounded-2xl mt-4 relative bg-card/30 overflow-hidden">
        {hasPlans ? <>{children}</> : <NutritionEmptyState />}
      </main>
      <CreateNutritionPlanDialog open={open} onOpenChange={setOpen} />
    </div>
  );
}
