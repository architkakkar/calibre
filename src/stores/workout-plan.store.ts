import { create } from "zustand";
import {
  createWorkoutPlanApi,
  getWorkoutPlansApi,
  getWorkoutPlanDetailsApi,
} from "@/lib/client/api/workout-plan.api";
import { WorkoutPlan } from "@/lib/validators/workout-plan.validator";

type WorkoutPlanDetails = WorkoutPlan;

type WorkoutPlanSummary = {
  id: string;
  name: string;
  description: string;
  durationWeeks: number;
  isActive: boolean;
  primaryGoals: string[];
  fitnessLevel: string;
  weeklyFrequency: string;
  sessionDurationMinutes: number;
  trainingEnvironment: string;
  startDate: Date | null;
  createdAt: Date;
};

type CreateWorkoutPlanPayload = {
  planTemplateId: string;
  planTemplateVersion: string;
  answers: Record<string, unknown>;
};

type WorkoutPlanState = {
  // States
  plans: WorkoutPlanSummary[];
  activePlanId: string | null;
  selectedPlanId: string | null;
  planDetails: WorkoutPlanDetails | null;

  // Derived States
  hasPlans: boolean;
  isFetchingPlans: boolean;
  error: string | null;

  // Actions
  fetchPlans: () => Promise<void>;
  createPlan: (payload: CreateWorkoutPlanPayload) => Promise<void>;
  fetchPlanDetails: (planId: string) => Promise<void>;
  selectPlan: (planId: string | null) => void;
  reset: () => void;
};

export const useWorkoutPlanStore = create<WorkoutPlanState>((set, get) => ({
  plans: [],
  activePlanId: null,
  selectedPlanId: null,
  planDetails: null,

  hasPlans: false,
  isFetchingPlans: true,
  error: null,

  fetchPlans: async () => {
    set({ isFetchingPlans: true, error: null });

    try {
      const plans: WorkoutPlanSummary[] = await getWorkoutPlansApi();
      const activePlan = plans.find((p) => p.isActive) ?? null;

      set({
        plans,
        activePlanId: activePlan ? activePlan.id : null,
        hasPlans: plans.length > 0,
        isFetchingPlans: false,
      });
    } catch {
      set({
        error: "Failed to fetch workout plans",
        isFetchingPlans: false,
      });
    }
  },

  createPlan: async (payload: CreateWorkoutPlanPayload) => {
    set({ error: null });

    try {
      await createWorkoutPlanApi(payload);

      // refresh plans after successful creation
      await get().fetchPlans();
    } catch (err) {
      set({
        error: "Failed to create workout plan",
      });
      throw err;
    }
  },

  fetchPlanDetails: async (planId: string) => {
    set({ error: null });

    try {
      const details: WorkoutPlanDetails =
        await getWorkoutPlanDetailsApi(planId);

      set({
        planDetails: details,
        selectedPlanId: planId,
      });
    } catch {
      set({
        error: "Failed to fetch workout plan details",
      });
    }
  },

  selectPlan: (planId) => {
    set({
      selectedPlanId: planId,
      planDetails: null,
    });
  },

  reset: () => {
    set({
      plans: [],
      activePlanId: null,
      selectedPlanId: null,
      planDetails: null,
      hasPlans: false,
      isFetchingPlans: false,
      error: null,
    });
  },
}));
