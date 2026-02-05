/**
 * API route constants used throughout the client application.
 * Paths are relative to apiClient.baseURL ("/api").
 */
const API_ROUTES = {
  onboarding: "/onboarding",
  dashboard: {
    workout: "/dashboard/workout",
    nutrition: "/dashboard/nutrition",
    hydration: "/dashboard/hydration",
    overview: "/dashboard/overview",
  },
  plans: {
    workout: "/plans/workout",
    workoutById: "/plans/workout/{planId}",
    nutrition: "/plans/nutrition",
    nutritionById: "/plans/nutrition/{planId}",
  },
  chat: {
    byId: "/chat/{chatId}",
    history: "/chat/history",
  },
} as const;

export default API_ROUTES;
