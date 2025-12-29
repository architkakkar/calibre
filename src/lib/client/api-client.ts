import axios, { AxiosError, AxiosInstance } from "axios";

/**
 * Central Axios client for all client-side API calls.
 */
const apiClient: AxiosInstance = axios.create({
  baseURL: "/api",
  withCredentials: true,
  timeout: 15000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor: Runs before every request
apiClient.interceptors.request.use(
  (config) => {
    // Example: attach auth token later if needed
    // const token = getAuthToken();
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }

    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor: Runs for every response / error
apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    // Central place for handling HTTP errors
    if (error.response) {
      const status = error.response.status;

      // Example global handling (optional)
      if (status === 401) {
        // auth expired / unauthorized
        // e.g. redirect to login, clear store, etc.
      }

      if (status >= 500) {
        // server error logging hook
      }
    }

    return Promise.reject(error);
  }
);

export default apiClient;
