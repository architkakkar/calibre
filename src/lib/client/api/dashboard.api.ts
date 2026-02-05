import apiClient from "@/lib/client/api-client";
import API_ROUTES from "@/lib/client/api-routes";
import type {
  CompleteWorkoutResponse,
  CompleteMealResponse,
  AddWaterResponse,
  UpdateHydrationTargetResponse,
} from "@/lib/validators/dashboard.validator";

// Workout API
export async function getTodayWorkoutApi() {
  const response = await apiClient.get(API_ROUTES.dashboard.workout);

  return response.data;
}

export async function completeWorkoutApi(payload: {
  sessionId: string;
  sections: {
    warmup: boolean;
    mainWorkout: boolean;
    cooldown: boolean;
  };
  difficultyRating?: number;
  notes?: string;
}): Promise<CompleteWorkoutResponse> {
  const response = await apiClient.post(API_ROUTES.dashboard.workout, payload);
  return response.data;
}

// Nutrition API
export async function getTodayNutritionApi() {
  const response = await apiClient.get(API_ROUTES.dashboard.nutrition);
  return response.data;
}

export async function completeMealApi(payload: {
  planDayId: string;
  mealType: string;
  mealName?: string;
  calories?: number;
  proteinGrams?: number;
  carbsGrams?: number;
  fatsGrams?: number;
  notes?: string;
  status?: "PENDING" | "COMPLETED" | "SKIPPED" | "MISSED";
}): Promise<CompleteMealResponse> {
  const response = await apiClient.post(
    API_ROUTES.dashboard.nutrition,
    payload,
  );
  return response.data;
}

// Hydration API
export async function getTodayHydrationApi() {
  const response = await apiClient.get(API_ROUTES.dashboard.hydration);
  return response.data;
}

export async function addWaterApi(amountMl: number): Promise<AddWaterResponse> {
  const response = await apiClient.post(API_ROUTES.dashboard.hydration, {
    amountMl,
  });
  return response.data;
}

export async function updateHydrationTargetApi(
  dailyTargetMl: number,
): Promise<UpdateHydrationTargetResponse> {
  const response = await apiClient.patch(API_ROUTES.dashboard.hydration, {
    dailyTargetMl,
  });
  return response.data;
}
