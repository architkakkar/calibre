import { create } from "zustand";
import type {
  TodayWorkoutResponse as WorkoutData,
  TodayNutritionResponse as NutritionData,
} from "@/lib/validators/dashboard.validator";
import {
  getTodayWorkoutApi,
  completeWorkoutApi,
  getTodayNutritionApi,
  completeMealApi,
  getTodayHydrationApi,
  addWaterApi,
  updateHydrationTargetApi,
} from "@/lib/client/api/dashboard.api";

export interface HydrationData {
  dailyTarget: number;
  totalConsumed: number;
  percentage: number;
}

interface DashboardState {
  // State
  workoutData: WorkoutData | null;
  nutritionData: NutritionData | null;
  hydrationData: HydrationData | null;
  loading: boolean;

  // Actions
  fetchDashboardData: () => Promise<void>;
  toggleWorkoutComplete: (sections: {
    warmup: boolean;
    mainWorkout: boolean;
    cooldown: boolean;
  }) => Promise<{ success: boolean; status: string } | undefined>;
  completeMeal: (payload: {
    mealType: string;
    mealName?: string;
    calories?: number;
    proteinGrams?: number;
    carbsGrams?: number;
    fatsGrams?: number;
    notes?: string;
    status?: "PENDING" | "COMPLETED" | "SKIPPED" | "MISSED";
  }) => Promise<{ success: boolean; mealId: string } | undefined>;
  addWater: (amount: number) => Promise<void>;
  updateHydrationTarget: (target: number) => Promise<void>;
  reset: () => void;
}

export const useDashboardStore = create<DashboardState>((set, get) => ({
  workoutData: null,
  nutritionData: null,
  hydrationData: null,
  loading: true,

  fetchDashboardData: async () => {
    set({ loading: true });
    const [workout, nutrition, hydration] = await Promise.all([
      getTodayWorkoutApi(),
      getTodayNutritionApi(),
      getTodayHydrationApi(),
    ]);

    set({
      workoutData: workout,
      nutritionData: nutrition,
      hydrationData: hydration,
      loading: false,
    });
  },

  toggleWorkoutComplete: async (sections: {
    warmup: boolean;
    mainWorkout: boolean;
    cooldown: boolean;
  }) => {
    const { workoutData, fetchDashboardData } = get();

    // Type guard for discriminated union
    if (!workoutData || !workoutData.hasActivePlan || !workoutData.workout?.id)
      return;

    const result = await completeWorkoutApi({
      sessionId: workoutData.workout.id,
      sections,
    });

    // Refresh data
    await fetchDashboardData();

    return result;
  },

  completeMeal: async (payload: {
    mealType: string;
    mealName?: string;
    calories?: number;
    proteinGrams?: number;
    carbsGrams?: number;
    fatsGrams?: number;
    notes?: string;
    status?: "PENDING" | "COMPLETED" | "SKIPPED" | "MISSED";
  }): Promise<{ success: boolean; mealId: string } | undefined> => {
    const { nutritionData, fetchDashboardData } = get();

    if (
      !nutritionData ||
      !nutritionData.hasActivePlan ||
      !nutritionData.planDayId
    )
      return;

    const result = await completeMealApi({
      planDayId: nutritionData.planDayId,
      ...payload,
    });

    // Refresh data
    await fetchDashboardData();

    return result;
  },

  addWater: async (amount: number) => {
    const { fetchDashboardData } = get();

    await addWaterApi(amount);
    await fetchDashboardData();
  },

  updateHydrationTarget: async (target: number) => {
    const { fetchDashboardData } = get();

    if (!target || target <= 0) {
      throw new Error("Please enter a valid target");
    }

    await updateHydrationTargetApi(target);
    await fetchDashboardData();
  },

  reset: () =>
    set({
      workoutData: null,
      nutritionData: null,
      hydrationData: null,
      loading: true,
    }),
}));
