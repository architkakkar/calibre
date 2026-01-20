import apiClient from "@/lib/client/api-client";
import API_ROUTES from "../api-routes";

type CreateWorkoutPlanPayload = {
  planVersion: string;
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
