import { create } from "zustand";

type GlobalState = {
  // States
  isLoading: boolean;
  loaderMessage: string | null;

  // Actions
  showLoader: (message?: string) => void;
  hideLoader: () => void;
};

export const useGlobalStore = create<GlobalState>((set) => ({
  isLoading: false,
  loaderMessage: null,

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
}));
