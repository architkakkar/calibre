import apiClient from "@/lib/client/api-client";
import API_ROUTES from "@/lib/client/api-routes";

type CreateNutritionPlanPayload = {
  planTemplateId: string;
  planTemplateVersion: string;
  answers: Record<string, unknown>;
};

type CreateNutritionPlanResponse = {
  nutritionPlanId: string;
  status: "queued" | "generated";
};

export async function createNutritionPlanApi(
  payload: CreateNutritionPlanPayload,
): Promise<CreateNutritionPlanResponse> {
  const response = await apiClient.post(API_ROUTES.plans.nutrition, payload);

  return response.data;
}

export async function getNutritionPlansApi() {
  const response = await apiClient.get(API_ROUTES.plans.nutrition);

  return response.data;
}

export async function getNutritionPlanDetailsApi(planId: string) {
  const url = API_ROUTES.plans.nutritionById.replace("{planId}", planId);
  const response = await apiClient.get(url);

  return response.data;
}
