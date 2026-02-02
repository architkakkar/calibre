"use client";

import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  SentIcon,
  Dumbbell01Icon,
  Info,
  Restaurant01Icon,
  Tick02Icon,
} from "@hugeicons/core-free-icons";

interface ChatInputProps {
  onSend: (
    prompt: string,
    planContext?: { workout: boolean; nutrition: boolean },
  ) => void;
}

export function ChatInput({ onSend }: ChatInputProps) {
  const [prompt, setPrompt] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [includeWorkoutPlan, setIncludeWorkoutPlan] = useState(false);
  const [includeNutritionPlan, setIncludeNutritionPlan] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!prompt.trim()) {
      return;
    }

    onSend(prompt, {
      workout: includeWorkoutPlan,
      nutrition: includeNutritionPlan,
    });
    setPrompt("");
  };

  const autoResize = () => {
    const el = textareaRef.current;
    if (!el) {
      return;
    }

    el.style.height = "auto";
    const maxHeight = 120; // ~ 5 lines
    el.style.height = Math.min(el.scrollHeight, maxHeight) + "px";
    el.style.overflowY = el.scrollHeight > maxHeight ? "auto" : "hidden";
  };

  return (
    <TooltipProvider delayDuration={300}>
      <div className="flex flex-col gap-2 shrink-0 relative mt-2">
        {/* Top shadow overlay */}
        <div className="absolute -top-8 left-0 right-0 h-8 bg-linear-to-t from-background/80 via-background/40 to-transparent pointer-events-none blur-sm" />

        <form
          onSubmit={handleSubmit}
          className={`p-3 border border-border rounded-2xl bg-background/50 backdrop-blur-sm transition-all ${
            isFocused
              ? "shadow-[0_0_20px_-8px_rgba(139,92,246,0.10)] ring-1 ring-primary/5"
              : ""
          }`}
        >
          <textarea
            ref={textareaRef}
            rows={1}
            placeholder="Ask Cal about workouts, diet, recovery, or goals…"
            value={prompt}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            onChange={(e) => {
              setPrompt(e.target.value);
              autoResize();
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSubmit(e as React.FormEvent);
              }
            }}
            className="w-full resize-none bg-transparent text-white border-0 text-sm leading-relaxed focus:outline-none overflow-hidden mb-1"
          />
          <div className="flex items-center justify-between">
            <div className="flex gap-2">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    type="button"
                    size="sm"
                    variant={includeWorkoutPlan ? "default" : "outline"}
                    className="h-8 w-8 p-0 relative"
                    onClick={() => setIncludeWorkoutPlan(!includeWorkoutPlan)}
                  >
                    <HugeiconsIcon icon={Dumbbell01Icon} className="size-4" />
                    {includeWorkoutPlan && (
                      <div className="absolute -top-1 -right-1 h-3.5 w-3.5 rounded-full bg-primary flex items-center justify-center">
                        <HugeiconsIcon
                          icon={Tick02Icon}
                          className="size-2.5 text-primary-foreground"
                        />
                      </div>
                    )}
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="top" className="max-w-40 text-center">
                  <p className="text-xs">
                    {includeWorkoutPlan
                      ? "Active workout plan included in context"
                      : "Click to include your active workout plan in the conversation"}
                  </p>
                </TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    type="button"
                    size="sm"
                    variant={includeNutritionPlan ? "default" : "outline"}
                    className="h-8 w-8 p-0 relative"
                    onClick={() =>
                      setIncludeNutritionPlan(!includeNutritionPlan)
                    }
                  >
                    <HugeiconsIcon icon={Restaurant01Icon} className="size-4" />
                    {includeNutritionPlan && (
                      <div className="absolute -top-1 -right-1 h-3.5 w-3.5 rounded-full bg-primary flex items-center justify-center">
                        <HugeiconsIcon
                          icon={Tick02Icon}
                          className="size-2.5 text-primary-foreground"
                        />
                      </div>
                    )}
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="top" className="max-w-40 text-center">
                  <p className="text-xs">
                    {includeNutritionPlan
                      ? "Active nutrition plan included in context"
                      : "Click to include your active nutrition plan in the conversation"}
                  </p>
                </TooltipContent>
              </Tooltip>
            </div>
            <div className="flex items-center gap-2">
              {/* POST MVP */}
              {/* <span className="hidden md:block text-xs text-muted-foreground">
                (7 of 20 free chats remaining today)
              </span>
              <span className="block md:hidden text-xs text-muted-foreground">
                (7 free chats)
              </span> */}
              <Button
                type="submit"
                size="sm"
                variant="outline"
                className="h-8 w-8 p-0"
                disabled={!prompt.trim()}
              >
                <HugeiconsIcon icon={SentIcon} className="size-4" />
              </Button>
            </div>
          </div>
        </form>

        <p className="hidden md:flex text-xs text-muted-foreground/70 items-center gap-1 pl-1">
          <HugeiconsIcon icon={Info} size={14} />
          AI responses are intended for general guidance and should not be
          considered a substitute for professional medical advice.
        </p>
      </div>
    </TooltipProvider>
  );
}
