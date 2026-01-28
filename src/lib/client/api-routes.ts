/**
 * API route constants used throughout the client application.
 * Paths are relative to apiClient.baseURL ("/api").
 */
const API_ROUTES = {
  onboarding: "/onboarding",
  chat: {
    byId: "/chat/[chatId]",
    history: "/chat/history",
  },
  plans: {
    workout: "/plans/workout",
    workoutById: "/plans/workout/[planId]",
  },
} as const;

export default API_ROUTES;
