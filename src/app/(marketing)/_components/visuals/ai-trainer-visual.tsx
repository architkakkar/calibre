import { HugeiconsIcon } from "@hugeicons/react";
import { AiChat02Icon } from "@hugeicons/core-free-icons";

export function AITrainerVisual() {
  return (
    <div className="relative h-full w-full overflow-hidden bg-linear-to-br from-primary/5 via-transparent to-primary/8 p-3">
      <style>
        {`
        @keyframes prompt-cycle {
          0% { opacity: 0; transform: translateY(8px); }
          5% { opacity: 1; transform: translateY(0); }
          85% { opacity: 1; transform: translateY(0); }
          92% { opacity: 0; transform: translateY(-8px); }
          100% { opacity: 0; transform: translateY(-8px); }
        }
        
        @keyframes response-cycle {
          0% { opacity: 0; transform: translateY(8px); }
          12% { opacity: 0; transform: translateY(8px); }
          18% { opacity: 1; transform: translateY(0); }
          85% { opacity: 1; transform: translateY(0); }
          92% { opacity: 0; transform: translateY(-8px); }
          100% { opacity: 0; transform: translateY(-8px); }
        }
        
        @keyframes typing-pulse { 0%, 60% { opacity: 0.4; } 100% { opacity: 1; } }
        
        .prompt-anim { animation: prompt-cycle 8s ease-in-out infinite; }
        .response-anim { animation: response-cycle 8s ease-in-out infinite; }
        
        .typing-dot { animation: typing-pulse 1s ease-in-out infinite; }
        .typing-dot:nth-child(2) { animation-delay: 0.2s; }
        .typing-dot:nth-child(3) { animation-delay: 0.4s; }
      `}
      </style>

      <div className="relative h-full flex flex-col justify-center space-y-2.5 pt-4">
        {/* User prompt */}
        <div className="prompt-anim flex justify-end">
          <div className="bg-primary/20 border border-primary/30 rounded-2xl rounded-tr-sm px-3 py-1.5 max-w-[75%] shadow-lg shadow-primary/5">
            <p className="text-[10px] text-foreground/90 font-medium">
              My lower back hurts during deadlifts, what should I do?
            </p>
          </div>
        </div>

        {/* AI response */}
        <div className="response-anim flex items-end gap-2">
          <div className="w-6 h-6 rounded-full bg-primary/15 border border-primary/25 flex items-center justify-center shrink-0">
            <HugeiconsIcon
              icon={AiChat02Icon}
              size={14}
              className="text-primary"
            />
          </div>
          <div className="bg-muted/60 border border-border/30 rounded-2xl rounded-tl-sm px-3 py-1.5 max-w-[75%]">
            <p className="text-[10px] text-foreground/80 font-medium leading-tight">
              Keep your back neutral, engage core and drive through your heels
            </p>
            <div className="flex gap-1 mt-1">
              <div className="w-1 h-1 rounded-full bg-primary typing-dot" />
              <div className="w-1 h-1 rounded-full bg-primary typing-dot" />
              <div className="w-1 h-1 rounded-full bg-primary typing-dot" />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom label */}
      <div className="absolute bottom-2 left-0 right-0 flex justify-center">
        <span className="text-[10px] text-muted-foreground/50 tracking-widest uppercase">
          AI Trainer · Ask Anything
        </span>
      </div>
    </div>
  );
}
