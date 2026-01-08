import { create } from "zustand";
import { fetchChatsApi, deleteChatApi } from "@/lib/client/api/chat.api";

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
  removeChat: (chatId: string) => Promise<void>;
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
    } catch (error) {
      console.error("Failed to fetch chats", error);
    } finally {
      set({ isLoadingChats: false });
    }
  },

  removeChat: async (chatId: string) => {
    await deleteChatApi(chatId);

    set((state) => ({
      chats: state.chats.filter((chat) => chat.id !== chatId),
    }));
  },
}));
