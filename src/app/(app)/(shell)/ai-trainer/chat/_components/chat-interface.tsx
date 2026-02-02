"use client";

import { useEffect, useRef, useState } from "react";
import { ChatStatus } from "ai";
import { UIMessage } from "@ai-sdk/react";
import Markdown from "markdown-to-jsx";
import { useChatStore } from "@/stores/chat.store";
import { ChatInput } from "./chat-input";
import { ChatEmptyState } from "./chat-empty-state";
import { markdownComponents } from "@/lib/client/markdown";

interface ChatInterfaceProps {
  messages: UIMessage[];
  onSendMessage: (prompt: string, planContext?: { workout: boolean; nutrition: boolean }) => void;
  status: ChatStatus;
}

export function ChatInterface({
  messages,
  onSendMessage,
  status,
}: ChatInterfaceProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const [shouldAutoScroll, setShouldAutoScroll] = useState(true);
  const isPreparingResponse = status === "submitted";
  const isError = status === "error";
  const { fetchChats } = useChatStore();

  useEffect(() => {
    if (!shouldAutoScroll) {
      return;
    }

    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, shouldAutoScroll]);

  useEffect(() => {
    // First assistant response completed
    if (
      messages.filter((message) => message.role === "assistant").length === 1 &&
      status === "ready"
    ) {
      fetchChats();
    }
  }, [messages, status, fetchChats]);

  const handleScroll = () => {
    const el = scrollRef.current;
    if (!el) {
      return;
    }

    const threshold = 80; // px from bottom
    setShouldAutoScroll(
      el.scrollHeight - el.scrollTop - el.clientHeight < threshold
    );
  };

  return (
    <div className="flex flex-col flex-1 min-h-0">
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="flex-1 overflow-y-auto px-2 flex flex-col gap-2"
      >
        {messages.length === 0 ? (
          <ChatEmptyState onSend={onSendMessage} />
        ) : (
          <>
            {messages.map((message) =>
              message.parts.map((part, i) => {
                switch (part.type) {
                  case "text":
                    return (
                      <div
                        key={`${message.id}-${part.type}-${i}`}
                        className={`max-w-[95%] md:max-w-[90%] lg:max-w-[80%] rounded-xl text-sm leading-relaxed wrap-break-word ${
                          message.role === "user"
                            ? "px-2.5 py-1.5 bg-primary/25 text-primary self-end rounded-tr-xs"
                            : "px-3 py-2 bg-muted text-foreground self-start rounded-tl-xs"
                        }`}
                      >
                        <Markdown options={{ overrides: markdownComponents }}>
                          {part.text}
                        </Markdown>
                      </div>
                    );
                  default:
                    return null;
                }
              })
            )}
          </>
        )}
        {isPreparingResponse && (
          <div className="max-w-[95%] md:max-w-[90%] lg:max-w-[80%] rounded-xl text-sm leading-relaxed wrap-break-word px-3 py-2 bg-muted text-foreground self-start rounded-tl-xs">
            <span className="animate-pulse">Cal is thinking...</span>
          </div>
        )}
        {isError && (
          <div className="max-w-[95%] md:max-w-[90%] lg:max-w-[80%] rounded-xl text-sm leading-relaxed wrap-break-word px-3 py-2 bg-destructive/15 text-destructive self-start rounded-tl-xs">
            An error occurred. Please try again.
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      <ChatInput onSend={onSendMessage} />
    </div>
  );
}
