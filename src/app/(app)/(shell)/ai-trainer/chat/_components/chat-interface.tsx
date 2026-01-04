"use client";

import { useEffect, useRef, useState } from "react";
import Markdown from "markdown-to-jsx";
import { Button } from "@/components/ui/button";
import { UIMessage } from "@ai-sdk/react";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  SentIcon,
  SpoonAndKnifeIcon,
  Dumbbell01Icon,
  Info,
} from "@hugeicons/core-free-icons";

interface ChatInterfaceProps {
  messages: UIMessage[];
  onSendMessage: (prompt: string) => void;
  isLoading?: boolean;
}

const markdownComponents = {
  h1: ({ children }: any) => (
    <h1 className="text-xl font-semibold mt-6 mb-3">{children}</h1>
  ),

  h2: ({ children }: any) => (
    <h2 className="text-lg font-semibold mt-5 mb-2">{children}</h2>
  ),

  h3: ({ children }: any) => (
    <h3 className="text-base font-semibold mt-4 mb-2 text-primary">
      {children}
    </h3>
  ),

  p: ({ children }: any) => (
    <p className="text-sm leading-relaxed mb-2 text-foreground/90">
      {children}
    </p>
  ),

  ul: ({ children }: any) => (
    <ul className="list-disc pl-5 space-y-1 my-2">{children}</ul>
  ),

  ol: ({ children }: any) => (
    <ol className="list-decimal pl-5 space-y-1 my-2">{children}</ol>
  ),

  li: ({ children }: any) => (
    <li className="text-sm leading-relaxed">{children}</li>
  ),

  strong: ({ children }: any) => (
    <strong className="font-semibold text-foreground">{children}</strong>
  ),

  blockquote: ({ children }: any) => (
    <blockquote className="border-l-2 border-primary/40 pl-3 italic text-sm text-muted-foreground my-3">
      {children}
    </blockquote>
  ),

  hr: () => <hr className="my-4 border-muted-foreground/30" />,
};

export function ChatInterface({
  messages,
  onSendMessage,
  isLoading,
}: ChatInterfaceProps) {
  const [prompt, setPrompt] = useState<string>("");
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [shouldAutoScroll, setShouldAutoScroll] = useState(true);

  useEffect(() => {
    if (!shouldAutoScroll) return;

    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, isLoading, shouldAutoScroll]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;
    onSendMessage(prompt);
    setPrompt("");
    textareaRef.current && (textareaRef.current.style.height = "auto");
  };

  const autoResizeTextarea = () => {
    const el = textareaRef.current;
    if (!el) return;

    el.style.height = "auto";
    const maxHeight = 120; // ~5 lines
    el.style.height = Math.min(el.scrollHeight, maxHeight) + "px";
    el.style.overflowY = el.scrollHeight > maxHeight ? "auto" : "hidden";
  };

  const handleScroll = () => {
    const el = scrollRef.current;
    if (!el) return;

    const threshold = 80; // px from bottom
    const isNearBottom =
      el.scrollHeight - el.scrollTop - el.clientHeight < threshold;

    setShouldAutoScroll(isNearBottom);
  };

  return (
    <div className="flex flex-col flex-1 min-h-0 h-[calc(100dvh-205px)] max-h-[calc(100dvh-205px)]">
      {/* Messages Area */}
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="flex-1 min-h-0 overflow-y-auto px-2 flex flex-col gap-2"
      >
        {messages.length === 0 ? (
          <div className="flex-1 flex items-center justify-center -mt-15">
            <div className="flex flex-col items-center gap-4 text-center text-muted-foreground max-w-md">
              <p className="text-sm">
                Start a conversation with Cal, your AI trainer
              </p>

              <div className="flex flex-wrap justify-center gap-2">
                <button
                  type="button"
                  onClick={() => setPrompt("Create a beginner workout plan")}
                  className="px-3 py-1 rounded-full bg-muted text-xs hover:bg-muted/80 transition cursor-pointer"
                >
                  Create a beginner workout plan
                </button>

                <button
                  type="button"
                  onClick={() => setPrompt("Suggest a muscle gain diet")}
                  className="px-3 py-1 rounded-full bg-muted text-xs hover:bg-muted/80 transition cursor-pointer"
                >
                  Suggest a muscle gain diet
                </button>

                <button
                  type="button"
                  onClick={() => setPrompt("Help with back pain")}
                  className="px-3 py-1 rounded-full bg-muted text-xs hover:bg-muted/80 transition cursor-pointer"
                >
                  Help with back pain
                </button>

                <button
                  type="button"
                  onClick={() => setPrompt("Build a weekly workout routine")}
                  className="px-3 py-1 rounded-full bg-muted text-xs hover:bg-muted/80 transition cursor-pointer"
                >
                  Build a weekly routine
                </button>
              </div>
            </div>
          </div>
        ) : (
          messages.map((message) => (
            <div key={message.id} className="flex flex-col gap-2">
              {message.parts.map((part, i) => {
                switch (part.type) {
                  case "text":
                    return (
                      <div
                        key={`${message.id}-${i}`}
                        className={`max-w-[95%] md:max-w-[90%] lg:max-w-[80%] px-3 py-2 rounded-xl text-sm leading-relaxed wrap-break-word whitespace-pre-wrap ${
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
              })}
            </div>
          ))
        )}
        {isLoading && (
          <div className="bg-muted text-foreground self-start max-w-[75%] w-fit px-4 py-3 rounded-xl leading-relaxed">
            <span className="animate-pulse">Cal is thinking...</span>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Input Area */}
      <div className="flex flex-col gap-2 shrink-0 relative mt-2">
        {/* Top shadow overlay */}
        <div className="absolute -top-8 left-0 right-0 h-8 bg-linear-to-t from-background/80 via-background/40 to-transparent pointer-events-none blur-sm" />
        <form
          className={` p-3 border border-border rounded-2xl bg-background/50 backdrop-blur-sm relative transition-all duration-200 ${
            isFocused
              ? "shadow-[0_0_20px_-8px_rgba(139,92,246,0.10)] ring-1 ring-primary/5"
              : ""
          }`}
          onSubmit={handleSubmit}
        >
          <div className="px-2">
            {/* Input */}
            <textarea
              ref={textareaRef}
              id="prompt"
              name="prompt"
              placeholder="Ask Cal about workouts, diet, recovery, or goals…"
              value={prompt}
              onChange={(e) => {
                setPrompt(e.target.value);
                autoResizeTextarea();
              }}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              disabled={isLoading}
              rows={1}
              className="w-full resize-none bg-transparent border-0 text-sm leading-relaxed focus:outline-none focus:ring-0 overflow-hidden text-white"
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSubmit(e as any);
                }
              }}
            />
          </div>
          <div className="flex items-center justify-between px-2 max-h-10">
            {/* Left Icons */}
            <div className="flex items-center gap-2.5">
              <Button
                type="button"
                size="sm"
                variant="outline"
                className="h-8 w-8 p-0 rounded-lg flex items-center justify-center"
              >
                <HugeiconsIcon icon={SpoonAndKnifeIcon} className="size-4" />
              </Button>
              <Button
                type="button"
                size="sm"
                variant="outline"
                className="h-8 w-8 p-0 rounded-lg flex items-center justify-center"
              >
                <HugeiconsIcon icon={Dumbbell01Icon} className="size-4" />
              </Button>
            </div>

            {/* Right Section */}
            <div className="flex items-center gap-2.5">
              <span className="hidden md:block text-xs text-muted-foreground whitespace-nowrap">
                (7 of 20 free chats remaining today)
              </span>
              <span className="block md:hidden text-xs text-muted-foreground whitespace-nowrap">
                (7 free chats)
              </span>
              <Button
                type="submit"
                size="sm"
                variant="outline"
                className="h-8 w-8 p-0 rounded-lg flex items-center justify-center disabled:opacity-30"
                disabled={isLoading || !prompt.trim()}
              >
                <HugeiconsIcon icon={SentIcon} className="size-4" />
              </Button>
            </div>
          </div>
        </form>

        {/* Disclaimer */}
        <p className="md:flex hidden text-xs text-left pl-1 text-muted-foreground/70 items-center gap-1">
          <HugeiconsIcon icon={Info} size={14} />
          AI responses are intended for general guidance and should not be
          considered a substitute for professional medical advice.
        </p>
      </div>
    </div>
  );
}
