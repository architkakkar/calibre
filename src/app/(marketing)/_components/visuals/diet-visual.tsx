import { HugeiconsIcon } from "@hugeicons/react";
import {
  SpaghettiIcon,
  ChickenThighsIcon,
  AvocadoIcon,
  RiceBowl01Icon,
} from "@hugeicons/core-free-icons";

export function DietVisual() {
  return (
    <div className="relative h-full w-full overflow-hidden">
      <style>
        {`
        @keyframes float { 0%, 100% { transform: translateY(0) rotate(0deg); } 50% { transform: translateY(-5px) rotate(2deg); } }
        @keyframes float-alt { 0%, 100% { transform: translateY(0) rotate(0deg); } 50% { transform: translateY(-4px) rotate(-2deg); } }
        @keyframes orbit { 0% { transform: rotate(0deg) translateX(60px) rotate(0deg); } 100% { transform: rotate(360deg) translateX(60px) rotate(-360deg); } }
        @keyframes fill-ring { from { stroke-dashoffset: 226; } to { stroke-dashoffset: 56; } }
        @keyframes shimmer { 0% { opacity: 0.3; } 50% { opacity: 0.6; } 100% { opacity: 0.3; } }
        .float { animation: float 3.5s ease-in-out infinite; }
        .float-alt { animation: float-alt 4s ease-in-out infinite; }
        .orbit { animation: orbit 20s linear infinite; }
        .ring-fill { animation: fill-ring 2s ease-out forwards; }
        .shimmer { animation: shimmer 2s ease-in-out infinite; }
      `}
      </style>

      {/* Soft gradient background */}
      <div className="absolute inset-0 bg-linear-to-br from-secondary/10 via-transparent to-primary/8" />

      {/* Decorative blurs */}
      <div className="absolute top-4 right-10 w-20 h-20 rounded-full bg-secondary/15 blur-2xl" />
      <div className="absolute bottom-6 left-8 w-16 h-16 rounded-full bg-primary/10 blur-xl" />

      <div className="relative h-full w-full flex items-center justify-center -mt-2">
        <div className="relative w-40 h-40">
          {/* Outer glow ring */}
          <div className="absolute inset-0 rounded-full bg-emerald-500/5 blur-xl shimmer" />

          {/* Main plate/ring */}
          <svg viewBox="0 0 120 120" className="w-full h-full relative">
            {/* Plate background */}
            <circle cx="60" cy="60" r="54" fill="url(#plateBg)" opacity="0.4" />

            {/* Outer decorative ring */}
            <circle
              cx="60"
              cy="60"
              r="54"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.5"
              className="text-border/15"
            />

            {/* Progress track */}
            <circle
              cx="60"
              cy="60"
              r="36"
              fill="none"
              stroke="currentColor"
              strokeWidth="8"
              className="text-border/10"
              strokeLinecap="round"
            />

            {/* Progress fill */}
            <circle
              cx="60"
              cy="60"
              r="36"
              fill="none"
              stroke="url(#progressGrad)"
              strokeWidth="8"
              strokeDasharray="226"
              strokeDashoffset="226"
              strokeLinecap="round"
              className="ring-fill"
              transform="rotate(-90 60 60)"
            />

            {/* Inner circle */}
            <circle cx="60" cy="60" r="28" fill="url(#innerBg)" />

            <defs>
              <radialGradient id="plateBg" cx="50%" cy="30%" r="60%">
                <stop
                  offset="0%"
                  stopColor="hsl(var(--card))"
                  stopOpacity="0.8"
                />
                <stop
                  offset="100%"
                  stopColor="hsl(var(--card))"
                  stopOpacity="0.3"
                />
              </radialGradient>
              <linearGradient
                id="progressGrad"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="0%"
              >
                <stop offset="0%" stopColor="oklch(0.4346 0.0238 41.6194)" />
                <stop offset="50%" stopColor="oklch(0.9064 0.0393 74.7776)" />
                <stop offset="100%" stopColor="oklch(0.4346 0.0238 41.6194)" />
              </linearGradient>
              <radialGradient id="innerBg" cx="50%" cy="40%" r="60%">
                <stop
                  offset="0%"
                  stopColor="hsl(var(--card))"
                  stopOpacity="0.9"
                />
                <stop
                  offset="100%"
                  stopColor="hsl(var(--card))"
                  stopOpacity="0.6"
                />
              </radialGradient>
            </defs>
          </svg>

          {/* Center content */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="text-lg font-bold text-foreground/90">1,450</div>
              <div className="text-[9px] text-muted-foreground/60 -mt-0.5">
                of 2,000 cal
              </div>
            </div>
          </div>

          {/* Orbiting food items */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="orbit" style={{ animationDelay: "0s" }}>
              <div className="w-10 h-10 rounded-xl bg-card/90 border border-border/30 flex items-center justify-center shadow-lg backdrop-blur-sm float">
                <HugeiconsIcon icon={SpaghettiIcon} />
              </div>
            </div>
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="orbit" style={{ animationDelay: "-5s" }}>
              <div className="w-10 h-10 rounded-xl bg-card/90 border border-border/30 flex items-center justify-center shadow-lg backdrop-blur-sm float-alt">
                <HugeiconsIcon icon={ChickenThighsIcon} />
              </div>
            </div>
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="orbit" style={{ animationDelay: "-10s" }}>
              <div className="w-10 h-10 rounded-xl bg-card/90 border border-border/30 flex items-center justify-center shadow-lg backdrop-blur-sm float">
                <HugeiconsIcon icon={AvocadoIcon} />
              </div>
            </div>
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="orbit" style={{ animationDelay: "-15s" }}>
              <div className="w-10 h-10 rounded-xl bg-card/90 border border-border/30 flex items-center justify-center shadow-lg backdrop-blur-sm float-alt">
                <HugeiconsIcon icon={RiceBowl01Icon} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom label */}
      <div className="absolute bottom-2 left-0 right-0 flex justify-center">
        <span className="text-[10px] text-muted-foreground/50 tracking-widest uppercase">
          Personalized Diet Plans
        </span>
      </div>
    </div>
  );
}
