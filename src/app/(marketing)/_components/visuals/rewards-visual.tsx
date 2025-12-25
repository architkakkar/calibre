import { HugeiconsIcon } from "@hugeicons/react";
import {
  Medal01Icon,
  StarIcon,
  CheckmarkBadge01Icon,
  Award01Icon,
} from "@hugeicons/core-free-icons";

export function RewardsVisual() {
  return (
    <div className="relative h-full w-full overflow-hidden">
      <style>
        {`
        @keyframes fill-xp { from { width: 0%; } to { width: 72%; } }
        @keyframes flame-flicker { 0%, 100% { transform: scale(1); opacity: 0.9; } 50% { transform: scale(1.15); opacity: 1; } }
        @keyframes badge-pop { 0% { transform: scale(0); opacity: 0; } 50% { transform: scale(1.1); } 100% { transform: scale(1); opacity: 1; } }
        @keyframes level-pulse { 0%, 100% { box-shadow: 0 0 15px oklch(0.9064 0.0393 74.7776 / 0.4); } 50% { box-shadow: 0 0 25px oklch(0.9064 0.0393 74.7776 / 0.6); } }
        
        .fill-xp { animation: fill-xp 1.5s ease-out forwards; }
        .flame { animation: flame-flicker 0.6s ease-in-out infinite; }
        .badge-1 { animation: badge-pop 0.4s ease-out 0.2s forwards; opacity: 0; }
        .badge-2 { animation: badge-pop 0.4s ease-out 0.4s forwards; opacity: 0; }
        .badge-3 { animation: badge-pop 0.4s ease-out 0.6s forwards; opacity: 0; }
        .badge-4 { animation: badge-pop 0.4s ease-out 0.8s forwards; opacity: 0; }
      `}
      </style>

      {/* Subtle gradient background */}
      <div className="absolute inset-0 bg-linear-to-br from-secondary/8 via-transparent to-primary/5" />

      {/* Decorative glow */}
      <div className="absolute top-6 left-12 w-16 h-16 rounded-full bg-secondary/10 blur-2xl" />

      <div className="relative h-full flex flex-col px-6 pt-3 pb-8 gap-2">
        {/* Top row - Level Badge & Streak */}
        <div className="flex items-center justify-between">
          {/* Level badge */}
          <div className="flex items-center gap-3">
            <div className="relative w-12 h-12 rounded-xl bg-linear-to-br from-primary/20 to-primary/10 border border-secondary/30 flex items-center justify-center level-pulse">
              <span className="text-xl font-bold text-primary">12</span>
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-semibold text-foreground">
                Level 12
              </span>
              <span className="text-[9px] text-primary/80">Pro Athlete</span>
            </div>
          </div>
        </div>

        {/* XP Progress bar */}
        <div className="space-y-1 mt-1">
          <div className="flex justify-between items-center">
            <span className="text-[9px] font-medium text-muted-foreground/80 uppercase tracking-wide">
              Experience
            </span>
            <span className="text-[10px] font-semibold text-primary/90">
              720 / 1000 XP
            </span>
          </div>
          <div className="h-2.5 rounded-full bg-primary/10 border border-primary/20 overflow-hidden">
            <div
              className="h-full rounded-full fill-xp"
              style={{
                background:
                  "linear-gradient(90deg, oklch(0.4346 0.0238 41.6194 / 0.7), oklch(0.9064 0.0393 74.7776), oklch(0.9064 0.0393 74.7776))",
              }}
            />
          </div>
        </div>

        {/* Badge collection */}
        <div className="space-y-1.5">
          <span className="text-[9px] font-medium text-muted-foreground/80 uppercase tracking-wide">
            Badges Earned
          </span>
          <div className="flex items-center gap-2.5">
            <div className="badge-1 w-8 h-8 rounded-xl bg-linear-to-br from-primary/20 to-primary/10 border border-secondary/25 flex items-center justify-center">
              <HugeiconsIcon
                icon={Medal01Icon}
                size={18}
                className="text-primary"
              />
            </div>
            <div className="badge-2 w-8 h-8 rounded-xl bg-linear-to-br from-primary/20 to-primary/10 border border-secondary/25 flex items-center justify-center">
              <HugeiconsIcon
                icon={StarIcon}
                size={18}
                className="text-primary"
              />
            </div>
            <div className="badge-3 w-8 h-8 rounded-xl bg-linear-to-br from-primary/20 to-primary/10 border border-secondary/25 flex items-center justify-center">
              <HugeiconsIcon
                icon={Award01Icon}
                size={18}
                className="text-primary"
              />
            </div>
            <div className="badge-4 w-8 h-8 rounded-xl bg-linear-to-br from-primary/20 to-primary/10 border border-secondary/25 flex items-center justify-center">
              <HugeiconsIcon
                icon={CheckmarkBadge01Icon}
                size={18}
                className="text-primary"
              />
            </div>
            <div className="w-8 h-8 rounded-xl bg-primary/5 border border-dashed border-primary/25 flex items-center justify-center">
              <span className="text-xs font-medium text-muted-foreground/60">
                +3
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom label */}
      <div className="absolute bottom-2 left-0 right-0 flex justify-center">
        <span className="text-[10px] text-muted-foreground/50 tracking-widest uppercase">
          Earn Rewards & Badges
        </span>
      </div>
    </div>
  );
}
