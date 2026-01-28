import axios, { AxiosError, AxiosInstance } from "axios";

/**
 * Semantic error categories used by the UI layer.
 * These abstract away raw HTTP / Axios details.
 */
export type ApiErrorType =
  | "VALIDATION"
  | "UNAUTHORIZED"
  | "FORBIDDEN"
  | "NOT_FOUND"
  | "SERVER"
  | "NETWORK"
  | "UNKNOWN";

/**
 * Central Axios client for all client-side API calls.
 * Handles HTTP concerns only (base URL, timeouts, headers, errors).
 */
const apiClient: AxiosInstance = axios.create({
  baseURL: "/api",
  withCredentials: true,
  timeout: 300000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor
apiClient.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => Promise.reject(error),
);

// Response interceptor
apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    let errorType: ApiErrorType = "UNKNOWN";

    if (error.response) {
      const status = error.response.status;

      if (status === 400) errorType = "VALIDATION";
      else if (status === 401) errorType = "UNAUTHORIZED";
      else if (status === 403) errorType = "FORBIDDEN";
      else if (status === 404) errorType = "NOT_FOUND";
      else if (status >= 500) errorType = "SERVER";
    } else if (error.request) {
      errorType = "NETWORK";
    }

    (error as AxiosError & { apiErrorType?: ApiErrorType }).apiErrorType =
      errorType;

    return Promise.reject(error);
  },
);

export default apiClient;
