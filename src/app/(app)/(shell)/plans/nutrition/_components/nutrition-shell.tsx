"use client";

import { useEffect, useState } from "react";
import { useNutritionPlanStore } from "@/stores/nutrition-plan.store";
import { NutritionEmptyState } from "./nutrition-empty-state";
import { NutritionCreatePlanDialog } from "./nutrition-create-plan-dialog";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

export function NutritionShell({ children }: { children: React.ReactNode }) {
  const { hasPlans, isFetchingPlans, fetchPlans } = useNutritionPlanStore();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    fetchPlans();
  }, [fetchPlans]);

  if (isFetchingPlans) {
    return (
      <>
        <Skeleton className="mt-1 h-9 w-1/2 rounded-lg mb-2" />
        <Skeleton className="h-6 w-full rounded-lg mb-2" />
        <Skeleton className="h-[calc(100dvh-170px)] md:h-[calc(100dvh-196px)] w-full rounded-2xl mt-4" />
      </>
    );
  }

  return (
    <div>
      <header className="px-1 mt-1 md:mt-0">
        <div className="flex justify-between">
          <h1 className="text-3xl font-bold text-primary">Nutrition Plans</h1>
          {hasPlans && (
            <>
              <Button
                size="sm"
                variant="outline"
                className="hidden xs:block font-semibold text-primary"
                onClick={() => setIsDialogOpen(true)}
              >
                Create Nutrition Plan
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
            ? "Monitor your meals, track progress, and achieve your nutrition goals."
            : "Create AI-powered nutrition plans tailored to your goals, diet, and lifestyle."}
        </p>
      </header>
      <main className="h-[calc(100dvh-184px)] xs:h-[calc(100dvh-164px)] md:h-[calc(100dvh-184px)] w-full text-primary border border-border rounded-2xl mt-4 relative bg-card/30 overflow-hidden">
        {hasPlans ? <>{children}</> : <NutritionEmptyState />}
      </main>
      <NutritionCreatePlanDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
      />
    </div>
  );
}
