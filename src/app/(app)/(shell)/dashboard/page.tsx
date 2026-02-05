"use client";

import { useEffect } from "react";
import { toast } from "sonner";
import { useDashboardStore } from "@/stores/dashboard.store";
import { Greeting } from "./_components/greeting";
import { WorkoutCard } from "./_components/workout-card";
import { NutritionCard } from "./_components/nutrition-card";
import { OverviewCard } from "./_components/overview-card";
import { HydrationCard } from "./_components/hydration-card";

export default function DashboardPage() {
  const {
    workoutData,
    nutritionData,
    hydrationData,
    loading,
    fetchDashboardData,
    toggleWorkoutComplete,
    logMeal,
    addWater,
    updateHydrationTarget,
  } = useDashboardStore();

  useEffect(() => {
    fetchDashboardData().catch((error) => {
      console.error("Error fetching dashboard data:", error);
      toast.error("Failed to load dashboard data");
    });
  }, [fetchDashboardData]);

  // Wrapper functions with error handling and toasts
  const handleWorkoutComplete = async (sections: {
    warmup: boolean;
    mainWorkout: boolean;
    cooldown: boolean;
  }): Promise<{ success: boolean; status: string } | undefined> => {
    try {
      const result = await toggleWorkoutComplete(sections);
      if (result) {
        toast.success(
          result.status === "COMPLETED"
            ? "Workout completed! 🎉"
            : "Progress saved",
        );
      }
      return result;
    } catch (error) {
      console.error("Error completing workout:", error);
      toast.error("Failed to update workout");
      return undefined;
    }
  };

  const handleLogMeal = async (payload: {
    mealType: string;
    mealName: string;
    notes: string;
  }) => {
    try {
      await logMeal(payload);
      toast.success("Meal logged successfully!");
    } catch (error) {
      console.error("Error logging meal:", error);
      toast.error(
        error instanceof Error ? error.message : "Failed to log meal",
      );
    }
  };

  const handleAddWater = async (amount: number) => {
    try {
      await addWater(amount);
      toast.success(`Added ${amount}ml 💧`);
    } catch (error) {
      console.error("Error adding water:", error);
      toast.error("Failed to add water");
    }
  };

  const handleUpdateHydrationTarget = async (target: number) => {
    try {
      await updateHydrationTarget(target);
      toast.success("Daily target updated!");
    } catch (error) {
      console.error("Error updating target:", error);
      toast.error(
        error instanceof Error ? error.message : "Failed to update target",
      );
    }
  };

  if (loading) {
    return (
      <div className="h-[calc(100dvh-84px)] md:h-[calc(100dvh-108px)] relative overflow-y-auto bg-linear-to-br from-background via-background to-muted/20">
        <div className="h-full grid grid-cols-12 gap-4">
          {/* Left section skeleton */}
          <div className="col-span-12 lg:col-span-7 flex flex-col gap-4">
            <div className="h-24 bg-muted/50 animate-pulse rounded-2xl" />
            <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-muted/50 animate-pulse rounded-2xl" />
              <div className="bg-muted/50 animate-pulse rounded-2xl" />
            </div>
          </div>
          {/* Right section skeleton */}
          <div className="col-span-12 lg:col-span-5 flex flex-col gap-4">
            <div className="flex-1 bg-muted/50 animate-pulse rounded-2xl" />
            <div className="flex-1 bg-muted/50 animate-pulse rounded-2xl" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-[calc(100dvh-84px)] max-h-[calc(100dvh-84px)] md:h-[calc(100dvh-108px)] md:min-h-[calc(100dvh-108px)] md:max-h-[calc(100dvh-108px)] relative overflow-y-auto bg-linear-to-br from-background via-background to-muted/20 text-primary">
      {/* 12x12 Grid Layout */}
      <div className="grid grid-cols-12 gap-2 md:gap-4">
        {/* Left Section - 7 columns */}
        <div className="col-span-12 lg:col-span-7 flex flex-col gap-2 md:gap-4">
          <Greeting />

          {/* Two Equal Cards - Workout & Nutrition */}
          <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4 min-h-[calc(100dvh-267.5px)] max-h-[calc(100dvh-267.5px)]">
            <WorkoutCard
              data={workoutData}
              onToggleComplete={handleWorkoutComplete}
            />
            <NutritionCard data={nutritionData} onLogMeal={handleLogMeal} />
          </div>
        </div>

        {/* Right Section - 5 columns */}
        <div className="col-span-12 lg:col-span-5 flex flex-col gap-2 md:gap-4">
          <OverviewCard
            workoutData={workoutData}
            nutritionData={nutritionData}
            hydrationData={hydrationData}
          />
          <HydrationCard
            data={hydrationData}
            onAddWater={handleAddWater}
            onUpdateTarget={handleUpdateHydrationTarget}
          />
        </div>
      </div>
    </div>
  );
}
