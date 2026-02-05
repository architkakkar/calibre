import { create } from "zustand";
import apiClient from "@/lib/client/api-client";
import type { UserResponse } from "@/lib/validators/user.validator";

type GlobalState = {
  // States
  isLoading: boolean;
  loaderMessage: string | null;
  user: UserResponse | null;

  // Actions
  showLoader: (message?: string) => void;
  hideLoader: () => void;
  fetchUser: () => Promise<void>;
};

export const useGlobalStore = create<GlobalState>((set) => ({
  isLoading: false,
  loaderMessage: null,
  user: null,

  showLoader: (message?: string) =>
    set(() => ({
      isLoading: true,
      loaderMessage: message || null,
    })),

  hideLoader: () =>
    set(() => ({
      isLoading: false,
      loaderMessage: null,
    })),

  fetchUser: async () => {
    try {
      const response = await apiClient.get("/user");
      set({ user: response.data });
    } catch (error) {
      console.error("Error fetching user:", error);
      set({ user: null });
    }
  },
}));
