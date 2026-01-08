"use client";

import { useEffect } from "react";
import { useChatStore } from "@/stores/chat.store";
import { ChatSidebar } from "./chat-sidebar";
import { ChatHeader } from "./chat-header";

export function ChatShell({ children }: { children: React.ReactNode }) {
  const { isSidebarOpen, setSidebarOpen, fetchChats } = useChatStore();

  useEffect(() => {
    fetchChats();
  }, [fetchChats]);

  return (
    <section
      className={`relative overflow-hidden h-full w-full lg:gap-x-3 p-3 ${
        isSidebarOpen ? "grid grid-cols-1 lg:grid-cols-5" : "flex"
      }`}
    >
      {/* Overlay for mobile & tablet */}
      {isSidebarOpen && (
        <div
          className="absolute rounded-2xl inset-0 bg-black/40 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <ChatSidebar />

      <div className="col-span-4 flex-1 flex flex-col min-h-0 pt-0.5">
        <ChatHeader />
        {children}
      </div>
    </section>
  );
}
