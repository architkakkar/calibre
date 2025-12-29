import apiClient from "@/lib/client/api-client";
import API_ROUTES from "@/lib/client/api-routes";
import type { OnboardingPayload } from "@/lib/validators/onboarding.validator";

export async function submitOnboarding(payload: OnboardingPayload) {
  const { data } = await apiClient.post(API_ROUTES.onboarding, payload);

  return data;
}
