/**
 * API route constants used throughout the client application.
 * Paths are relative to apiClient.baseURL ("/api").
 */
const API_ROUTES = {
  onboarding: "/onboarding",
  chat: {
    history: "/chat/history",
  },
} as const;

export default API_ROUTES;
