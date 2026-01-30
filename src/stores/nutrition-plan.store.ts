import { create } from "zustand";
import {
  createNutritionPlanApi,
  getNutritionPlansApi,
  getNutritionPlanDetailsApi,
} from "@/lib/client/api/nutrition-plan.api";
import { NutritionPlan } from "@/lib/validators/nutrition-plan.validator";

export type NutritionPlanDetails = NutritionPlan;

export type NutritionPlanSummary = {
  id: string;
  name: string;
  description: string;
  durationWeeks: number;
  isActive: boolean;
  primaryGoal: string;
  dietType: string;
  mealsPerDay: string;
  budgetLevel: string;
  startDate: Date | null;
  createdAt: Date;
};

type CreateNutritionPlanPayload = {
  planTemplateId: string;
  planTemplateVersion: string;
  answers: Record<string, unknown>;
};

type NutritionPlanState = {
  // States
  plans: NutritionPlanSummary[];
  activePlanId: string | null;
  selectedPlanId: string | null;
  planDetails: NutritionPlanDetails | null;

  // Derived States
  hasPlans: boolean;
  isFetchingPlans: boolean;
  error: string | null;

  // Actions
  fetchPlans: () => Promise<void>;
  createPlan: (payload: CreateNutritionPlanPayload) => Promise<void>;
  fetchPlanDetails: (planId: string) => Promise<void>;
  selectPlan: (planId: string) => void;
  reset: () => void;
};

export const useNutritionPlanStore = create<NutritionPlanState>((set, get) => ({
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
      const plans: NutritionPlanSummary[] = await getNutritionPlansApi();
      const activePlan = plans.find((p) => p.isActive);
      set({
        plans,
        activePlanId: activePlan ? activePlan.id : null,
        hasPlans: plans.length > 0,
        isFetchingPlans: false,
      });
    } catch {
      set({
        error: "Failed to fetch nutrition plans",
        isFetchingPlans: false,
      });
    }
  },

  createPlan: async (payload) => {
    set({ error: null });

    try {
      await createNutritionPlanApi(payload);
      await get().fetchPlans(); // refresh plans after successful creation
    } catch (err) {
      set({ error: "Failed to create nutrition plan" });
      throw err;
    }
  },

  fetchPlanDetails: async (planId: string) => {
    set({ error: null });

    try {
      const details: NutritionPlanDetails =
        await getNutritionPlanDetailsApi(planId);
      set({
        planDetails: details,
        selectedPlanId: planId,
      });
    } catch {
      set({ error: "Failed to fetch nutrition plan details" });
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
