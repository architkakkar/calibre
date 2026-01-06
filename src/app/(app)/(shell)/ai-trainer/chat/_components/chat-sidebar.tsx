"use client";

import { useState } from "react";
import Link from "next/link";
import { useChatStore } from "@/stores/chat.store";
import { cn, formatRelativeTime, groupChatsByTime } from "@/lib/shared/utils";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  SidebarLeft01Icon,
  SidebarRight01Icon,
  Trash2,
  Add01Icon,
} from "@hugeicons/core-free-icons";

interface ChatSidebarProps {
  currentChatId?: string;
}

export function ChatSidebar({ currentChatId }: ChatSidebarProps) {
  const [hoveredChatId, setHoveredChatId] = useState<string | null>(null);
  const { isSidebarOpen, setSidebarOpen, toggleSidebar, chats } =
    useChatStore();
  const groupedChats = groupChatsByTime(chats);

  const handleDeleteChat = (
    e: React.MouseEvent<HTMLButtonElement>,
    chatId: string
  ) => {
    e.preventDefault();
    e.stopPropagation();
    // TODO: Implement delete chat logic
    console.log("Delete chat:", chatId);
  };

  return (
    <aside
      className={cn(
        "bg-background rounded-xl p-3 flex flex-col gap-3 border border-border",
        // Mobile + Tablet → floating drawer
        "absolute inset-y-0 left-0 z-40 w-72 max-w-full transition-transform duration-300 lg:relative lg:inset-auto lg:z-auto",
        // Slide animation (Mobile + Tablet)
        isSidebarOpen ? "translate-x-0" : "-translate-x-full",
        // Desktop collapse (lg+ only)
        "lg:translate-x-0",
        isSidebarOpen ? "lg:w-full" : "lg:w-14.5",
        // Height only for desktop
        "lg:h-[calc(100dvh-145px)] lg:max-h-[calc(100dvh-145px)]"
      )}
    >
      <Button
        variant="ghost"
        type="button"
        className="h-8.5 w-8.5 self-start flex"
        onClick={toggleSidebar}
      >
        <HugeiconsIcon
          icon={isSidebarOpen ? SidebarLeft01Icon : SidebarRight01Icon}
          className="size-5"
        />
      </Button>

      {isSidebarOpen ? (
        <>
          {/* New Chat Button */}
          <Link href="/ai-trainer/chat">
            <Button variant="outline" className="w-full" size="sm">
              <HugeiconsIcon icon={Add01Icon} className="size-4 mr-1" />
              New Chat
            </Button>
          </Link>

          <Separator />

          {/* Chat History */}
          <div className="flex-1 overflow-y-auto">
            {Object.entries(groupedChats).map(([label, items]) =>
              items.length ? (
                <div key={label} className="mb-3">
                  <h4 className="px-2 mb-1 text-[11px] font-medium uppercase text-muted-foreground">
                    {label}
                  </h4>
                  <div className="flex flex-col gap-1">
                    {items.map((chat) => (
                      <div
                        key={chat.id}
                        className={`group relative rounded-lg transition-colors ${
                          currentChatId === chat.id
                            ? "bg-muted border-l-2 border-primary"
                            : "hover:bg-muted"
                        }`}
                        onMouseEnter={() => setHoveredChatId(chat.id)}
                        onMouseLeave={() => setHoveredChatId(null)}
                      >
                        <Link
                          href={`/ai-trainer/chat/${chat.id}`}
                          className="flex flex-col gap-0.5 text-sm p-2 rounded-lg text-accent-foreground"
                          onClick={() => setSidebarOpen(false)}
                        >
                          <span className="truncate pr-6 font-medium text-[13px]">
                            {chat.title}
                          </span>
                          <span className="text-[11px] text-muted-foreground">
                            {formatRelativeTime(new Date(chat.updatedAt))}
                          </span>

                          {hoveredChatId === chat.id && (
                            <Button
                              size="sm"
                              variant="destructive"
                              className="h-6 w-6 p-0 flex items-center justify-center shrink-0 absolute right-1 top-1.5 opacity-100 transition-opacity"
                              onClick={(e) => handleDeleteChat(e, chat.id)}
                            >
                              <HugeiconsIcon icon={Trash2} className="size-4" />
                            </Button>
                          )}
                        </Link>
                      </div>
                    ))}
                  </div>
                </div>
              ) : null
            )}
          </div>
        </>
      ) : (
        <>
          <Link href="/ai-trainer/chat">
            <Button variant="outline" className="w-full" size="sm">
              <HugeiconsIcon icon={Add01Icon} className="size-4" />
            </Button>
          </Link>
        </>
      )}
    </aside>
  );
}
