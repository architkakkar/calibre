export function WorkoutVisual() {
  return (
    <div className="relative h-full w-full overflow-hidden">
      <style>
        {`
        @keyframes float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-6px); } }
        @keyframes pulse-ring { 0%, 100% { transform: scale(1); opacity: 0.3; } 50% { transform: scale(1.15); opacity: 0.6; } }
        @keyframes glow { 0%, 100% { filter: drop-shadow(0 0 8px rgba(var(--primary-rgb), 0.3)); } 50% { filter: drop-shadow(0 0 20px rgba(var(--primary-rgb), 0.5)); } }
        .float { animation: float 4s ease-in-out infinite; }
        .pulse-ring { animation: pulse-ring 3s ease-in-out infinite; }
        .glow { animation: glow 3s ease-in-out infinite; }
      `}
      </style>

      {/* Subtle gradient background */}
      <div className="absolute inset-0 bg-linear-to-br from-primary/8 via-transparent to-primary/5" />

      {/* Decorative circles */}
      <div className="absolute top-4 right-6 w-20 h-20 rounded-full bg-primary/5 blur-2xl" />
      <div className="absolute bottom-8 left-4 w-16 h-16 rounded-full bg-primary/8 blur-xl" />

      <div className="relative h-full w-full flex items-center justify-center pb-6">
        {/* Central visual */}
        <div className="relative">
          {/* Outer ring */}
          <div className="absolute inset-0 -m-6 rounded-full border border-primary/10 pulse-ring" />
          <div className="absolute inset-0 -m-3 rounded-full border border-primary/15" />

          {/* Dumbbell illustration */}
          <div className="relative w-28 h-28 flex items-center justify-center float">
            <svg viewBox="0 0 80 80" className="w-full h-full glow">
              {/* Left weight */}
              <rect
                x="8"
                y="28"
                width="12"
                height="24"
                rx="3"
                fill="url(#weightGrad)"
              />
              <rect
                x="4"
                y="32"
                width="6"
                height="16"
                rx="2"
                fill="url(#weightGrad)"
                opacity="0.8"
              />

              {/* Bar */}
              <rect
                x="20"
                y="36"
                width="40"
                height="8"
                rx="4"
                fill="url(#barGrad)"
              />

              {/* Right weight */}
              <rect
                x="60"
                y="28"
                width="12"
                height="24"
                rx="3"
                fill="url(#weightGrad)"
              />
              <rect
                x="70"
                y="32"
                width="6"
                height="16"
                rx="2"
                fill="url(#weightGrad)"
                opacity="0.8"
              />

              {/* Shine effects */}
              <rect
                x="10"
                y="30"
                width="2"
                height="8"
                rx="1"
                fill="white"
                opacity="0.3"
              />
              <rect
                x="62"
                y="30"
                width="2"
                height="8"
                rx="1"
                fill="white"
                opacity="0.3"
              />

              <defs>
                <linearGradient
                  id="weightGrad"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="100%"
                >
                  <stop
                    offset="0%"
                    stopColor="hsl(var(--primary))"
                    stopOpacity="0.9"
                  />
                  <stop
                    offset="100%"
                    stopColor="hsl(var(--primary))"
                    stopOpacity="0.5"
                  />
                </linearGradient>
                <linearGradient id="barGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop
                    offset="0%"
                    stopColor="hsl(var(--primary))"
                    stopOpacity="0.4"
                  />
                  <stop
                    offset="50%"
                    stopColor="hsl(var(--primary))"
                    stopOpacity="0.6"
                  />
                  <stop
                    offset="100%"
                    stopColor="hsl(var(--primary))"
                    stopOpacity="0.4"
                  />
                </linearGradient>
              </defs>
            </svg>
          </div>

          {/* Floating stat badges */}
          <div className="absolute -top-2 -right-4 px-2 py-1 rounded-full bg-card/80 border border-border/30 backdrop-blur-sm shadow-lg">
            <span className="text-[9px] font-semibold text-primary/80">
              +12%
            </span>
          </div>
          <div className="absolute -bottom-1 -left-6 px-2 py-1 rounded-full bg-card/80 border border-border/30 backdrop-blur-sm shadow-lg">
            <span className="text-[9px] font-medium text-foreground/70">
              4×8
            </span>
          </div>
        </div>
      </div>

      {/* Bottom label */}
      <div className="absolute bottom-2 left-0 right-0 flex justify-center">
        <span className="text-[10px] text-muted-foreground/50 tracking-widest uppercase">
          Personalized Workout Plans
        </span>
      </div>
    </div>
  );
}
