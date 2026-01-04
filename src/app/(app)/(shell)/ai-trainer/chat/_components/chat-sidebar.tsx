"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  SidebarLeft01Icon,
  SidebarRight01Icon,
  Trash2,
  Add01Icon,
} from "@hugeicons/core-free-icons";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/shared/utils";

interface ChatSession {
  id: string;
  title: string;
  timestamp: Date;
}

interface ChatSidebarProps {
  currentChatId?: string;
  chats?: ChatSession[];
}

const MOCK_CHATS: ChatSession[] = [
  {
    id: "1",
    title: "Lower back pain during deadlifts",
    timestamp: new Date(new Date().getTime() - 86400000),
  },
  {
    id: "2",
    title: "Best workout routine for beginners over 3 days",
    timestamp: new Date(new Date().getTime() - 172800000),
  },
  {
    id: "3",
    title: "Diet plan for muscle gain",
    timestamp: new Date(new Date().getTime() - 259200000),
  },
  {
    id: "4",
    title: "How to improve flexibility",
    timestamp: new Date(new Date().getTime() - 345600000),
  },
  {
    id: "5",
    title: "Morning stretching routine",
    timestamp: new Date(new Date().getTime() - 432000000),
  },
  {
    id: "6",
    title: "Morning stretching routine",
    timestamp: new Date(new Date().getTime() - 832000000),
  },
];

// Helper to format relative time
const formatRelativeTime = (date: Date) => {
  const diff = Date.now() - date.getTime();
  const day = 86400000;
  if (diff < day) return "Today";
  if (diff < day * 2) return "Yesterday";
  const days = Math.floor(diff / day);
  return `${days}d ago`;
};

// Helper to group chats by time buckets
const groupChatsByTime = (chats: ChatSession[]) => {
  const now = Date.now();
  const day = 86400000;

  return {
    Today: chats.filter((c) => now - c.timestamp.getTime() < day),
    "This Week": chats.filter(
      (c) =>
        now - c.timestamp.getTime() >= day &&
        now - c.timestamp.getTime() < day * 7
    ),
    Earlier: chats.filter((c) => now - c.timestamp.getTime() >= day * 7),
  };
};

export function ChatSidebar({
  currentChatId,
  chats = MOCK_CHATS,
  isSidebarOpen,
  setIsSidebarOpen,
}: ChatSidebarProps & {
  isSidebarOpen: boolean;
  setIsSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [hoveredChatId, setHoveredChatId] = useState<string | null>(null);

  const handleDeleteChat = (
    e: React.MouseEvent<HTMLButtonElement>,
    chatId: string
  ) => {
    e.preventDefault();
    e.stopPropagation();
    // TODO: Implement delete chat logic
    console.log("Delete chat:", chatId);
  };

  const groupedChats = groupChatsByTime(chats);

  return (
    <aside
      className={cn(
        "bg-background rounded-xl p-3 flex flex-col gap-3 border border-border",

        // MOBILE + TABLET → floating drawer
        "absolute inset-y-0 left-0 z-40 w-72 max-w-full transition-transform duration-300 lg:relative lg:inset-auto lg:z-auto",

        // Slide animation (mobile + tablet)
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
        onClick={() => setIsSidebarOpen((prev) => !prev)}
      >
        <HugeiconsIcon
          icon={isSidebarOpen ? SidebarLeft01Icon : SidebarRight01Icon}
          className="size-5"
        />
      </Button>

      {isSidebarOpen ? (
        <>
          {/* New Chat Button */}
          <Link href="/ai-trainer/chat/new">
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
                          onClick={() => {
                            if (window.innerWidth < 1024) {
                              setIsSidebarOpen(false);
                            }
                          }}
                        >
                          <span className="truncate pr-6 font-medium">
                            {chat.title}
                          </span>
                          <span className="text-[11px] text-muted-foreground">
                            {formatRelativeTime(chat.timestamp)}
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
          <Link href="/ai-trainer/chat/new">
            <Button variant="outline" className="w-full" size="sm">
              <HugeiconsIcon icon={Add01Icon} className="size-4" />
            </Button>
          </Link>
        </>
      )}
    </aside>
  );
}
