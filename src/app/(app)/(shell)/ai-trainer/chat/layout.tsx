"use client";

import { useState, useEffect } from "react";
import { ChatSidebar } from "./_components/chat-sidebar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { HugeiconsIcon } from "@hugeicons/react";
import { AiChat02Icon, SidebarRight01Icon } from "@hugeicons/core-free-icons";

export default function ChatLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(min-width: 1024px)").matches;
  });

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 1024px)");

    const handler = (e: MediaQueryListEvent) => {
      setIsSidebarOpen(e.matches);
    };

    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  return (
    <section
      className={`h-[calc(100dvh-120px)] max-h-[calc(100dvh-120px)] w-full text-primary border border-border rounded-2xl bg-card/60 p-3 gap-3 ${
        isSidebarOpen ? "lg:grid lg:grid-cols-5 grid" : "flex"
      } relative overflow-hidden`}
    >
      {isSidebarOpen && (
        <div
          className="absolute inset-0 bg-black/40 z-30 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
      <ChatSidebar
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />

      {/* Main chat area */}
      <main className="col-span-4 flex flex-col pt-0.5 flex-1">
        {/* Header */}
        <div className="px-1">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setIsSidebarOpen(true)}
            >
              <HugeiconsIcon icon={SidebarRight01Icon} className="size-5" />
            </Button>
            <div className="rounded-lg bg-primary/15 p-1.5">
              <HugeiconsIcon
                icon={AiChat02Icon}
                className="size-5 text-primary"
              />
            </div>
            <h1 className="text-xl font-extrabold tracking-tight">
              Cal – Your AI Trainer
            </h1>
          </div>
          <Separator className="my-3" />
        </div>

        {/* Chat content (messages + input) */}
        <div className="flex-1 flex flex-col min-h-0 h-full">{children}</div>
      </main>
    </section>
  );
}
