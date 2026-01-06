import { create } from "zustand";
import { fetchChatsApi } from "@/lib/client/api/chat.api";

export interface ChatSummary {
  id: string;
  title: string | null;
  updatedAt: string;
}

interface ChatUIState {
  // States
  chats: ChatSummary[];
  isLoadingChats: boolean;
  isSidebarOpen: boolean;

  // Actions
  setSidebarOpen: (open: boolean) => void;
  toggleSidebar: () => void;
  fetchChats: () => Promise<void>;
}

export const useChatStore = create<ChatUIState>((set) => ({
  chats: [],
  isLoadingChats: false,
  isSidebarOpen: false,

  setSidebarOpen: (open) => set({ isSidebarOpen: open }),

  toggleSidebar: () =>
    set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),

  fetchChats: async () => {
    try {
      set({ isLoadingChats: true });
      const data = await fetchChatsApi();
      set({ chats: data.chats ?? [] });
    } catch (e) {
      console.error("Failed to fetch chats", e);
    } finally {
      set({ isLoadingChats: false });
    }
  },
}));
