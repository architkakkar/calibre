"use client";

import { useEffect, useRef, useState } from "react";
import { UIMessage } from "@ai-sdk/react";
import Markdown from "markdown-to-jsx";
import { ChatInput } from "./chat-input";
import { ChatEmptyState } from "./chat-empty-state";
import { markdownComponents } from "@/lib/client/markdown";

interface ChatInterfaceProps {
  messages: UIMessage[];
  onSendMessage: (prompt: string) => void;
}

export function ChatInterface({ messages, onSendMessage }: ChatInterfaceProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const [shouldAutoScroll, setShouldAutoScroll] = useState(true);

  useEffect(() => {
    if (!shouldAutoScroll) {
      return;
    }

    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, shouldAutoScroll]);

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
                        key={`${message.id}-${i}`}
                        className={`max-w-[95%] md:max-w-[90%] lg:max-w-[80%] rounded-xl text-sm leading-relaxed wrap-break-word whitespace-pre-wrap ${
                          message.role === "user"
                            ? "px-2 py-1 bg-primary/25 text-primary self-end rounded-tr-xs"
                            : "px-4 py-3 bg-muted text-foreground self-start rounded-tl-xs"
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
        {/* Loading state WIP */}
        {/* {isLoading && (
          <div className="bg-muted text-foreground self-start max-w-[75%] w-fit px-4 py-3 rounded-xl leading-relaxed">
            <span className="animate-pulse">Cal is thinking...</span>
          </div>
        )} */}
        <div ref={bottomRef} />
      </div>

      <ChatInput onSend={onSendMessage} />
    </div>
  );
}
