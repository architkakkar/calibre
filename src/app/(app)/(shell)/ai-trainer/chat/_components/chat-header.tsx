"use client";

import { useChatStore } from "@/stores/chat.store";
import { Button } from "@/components/ui/button";
import { HugeiconsIcon } from "@hugeicons/react";
import { SidebarRight01Icon, AiChat02Icon } from "@hugeicons/core-free-icons";
import { Separator } from "@/components/ui/separator";

export function ChatHeader() {
  const { setSidebarOpen } = useChatStore();

  return (
    <>
      <header className="flex items-center gap-3">
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden"
          onClick={() => setSidebarOpen(true)}
        >
          <HugeiconsIcon icon={SidebarRight01Icon} className="size-5" />
        </Button>
        <div className="flex items-center gap-3 ml-1">
          <div className="rounded-lg bg-primary/15 p-1.5">
            <HugeiconsIcon
              icon={AiChat02Icon}
              className="size-5 text-primary"
            />
          </div>
          <h1 className="text-xl font-extrabold tracking-tight">
            Cal · AI Trainer
          </h1>
        </div>
      </header>
      <Separator className="my-3" />
    </>
  );
}
