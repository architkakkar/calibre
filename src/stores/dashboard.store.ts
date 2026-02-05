import { create } from "zustand";
import type { TodayWorkoutResponse as WorkoutData } from "@/lib/validators/dashboard.validator";
import {
  getTodayWorkoutApi,
  completeWorkoutApi,
  getTodayNutritionApi,
  logMealApi,
  getTodayHydrationApi,
  addWaterApi,
  updateHydrationTargetApi,
} from "@/lib/client/api/dashboard.api";

export interface NutritionData {
  hasActivePlan: boolean;
  planName?: string;
  planDayId?: string;
  targets?: {
    calories: number;
    protein: number;
    carbs: number;
    fats: number;
  };
  loggedMeals?: Array<{
    id: string;
    type: string;
    name: string;
    notes: string;
  }>;
}

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
  logMeal: (payload: {
    mealType: string;
    mealName: string;
    notes: string;
  }) => Promise<void>;
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

  logMeal: async (payload: {
    mealType: string;
    mealName: string;
    notes: string;
  }) => {
    const { nutritionData, fetchDashboardData } = get();
    if (!nutritionData?.planDayId || !payload.mealType) {
      throw new Error("Please fill in all required fields");
    }

    await logMealApi({
      planDayId: nutritionData.planDayId,
      ...payload,
    });

    await fetchDashboardData();
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
