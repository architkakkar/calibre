import apiClient from "@/lib/client/api-client";
import API_ROUTES from "@/lib/client/api-routes";

type CreateWorkoutPlanPayload = {
  planTemplateId: string;
  planTemplateVersion: string;
  answers: Record<string, unknown>;
};

type CreateWorkoutPlanResponse = {
  workoutPlanId: string;
  status: "queued" | "generated";
};

export async function createWorkoutPlanApi(
  payload: CreateWorkoutPlanPayload,
): Promise<CreateWorkoutPlanResponse> {
  const response = await apiClient.post(API_ROUTES.plans.workout, payload);

  return response.data;
}

export async function getWorkoutPlansApi() {
  const response = await apiClient.get(API_ROUTES.plans.workout);

  return response.data;
}
