"use client";

import { useState } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Fire02Icon,
  CoinsDollarIcon,
  Award01Icon,
  CheckmarkCircle01Icon,
  Calendar03Icon,
  ZapIcon,
  StarIcon,
  Target03Icon,
  InformationCircleIcon,
  ArrowDown01Icon,
} from "@hugeicons/core-free-icons";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export function StreakActivityPopup() {
  const [isInfoExpanded, setIsInfoExpanded] = useState(false);

  // Mock data for demonstration
  const weeklyGoal = 7;
  const daysCompleted = 5;
  const totalWorkouts = 32;
  const thisWeekWorkouts = 4;
  const longestStreak = 18;
  const level = 7;
  const nextLevelWorkouts = 5;
  const streak = 12;
  const coins = 350;

  return (
    <Popover>
      <PopoverTrigger>
        <div className="h-8 gap-1.5 rounded-lg px-2.5 flex items-center text-xs font-medium text-foreground hover:bg-orange-500/5! hover:text-orange-500 transition-all cursor-pointer">
          <HugeiconsIcon icon={Fire02Icon} className="size-4 text-orange-500" />
          <span className="hidden lg:inline">12</span>
        </div>
      </PopoverTrigger>
      <PopoverContent
        className="p-0 border-border/50 shadow-xl w-full"
        align="end"
        sideOffset={8}
      >
        <div className="w-112.5 max-h-125 overflow-scroll p-6">
          {/* Premium Header Section */}
          <div className="relative mb-6 overflow-hidden rounded-2xl border border-border/50 bg-linear-to-br from-background via-card to-background p-6 shadow-xl">
            {/* Subtle background pattern */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(255,165,0,0.08),transparent_50%)]" />

            <div className="relative flex items-center justify-between">
              {/* Left: Streak Info */}
              <div className="flex items-center gap-4">
                <div className="relative">
                  {/* Glow effect behind icon */}
                  <div className="absolute inset-0 rounded-2xl bg-orange-500/20 blur-xl" />
                  <div className="relative flex size-16 items-center justify-center rounded-2xl bg-linear-to-br from-orange-500/15 to-red-500/15 ring-1 ring-orange-500/20 backdrop-blur-sm">
                    <HugeiconsIcon
                      icon={Fire02Icon}
                      className="size-8 text-orange-500"
                    />
                  </div>
                </div>

                <div>
                  <div className="mb-1 flex items-baseline gap-2">
                    <h2 className="text-4xl font-black tracking-tight text-foreground">
                      {streak}
                    </h2>
                    <span className="text-lg font-semibold text-muted-foreground">
                      day streak
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Keep pushing forward
                  </p>
                </div>
              </div>

              {/* Right: Level & Progress */}
              <div className="flex flex-col items-end gap-2">
                <div className="flex items-center gap-2 rounded-xl bg-violet-500/10 px-3 py-1.5 ring-1 ring-violet-500/20">
                  <div className="flex items-center gap-1.5">
                    <div className="rounded-md bg-violet-500/20 p-1">
                      <HugeiconsIcon
                        icon={Award01Icon}
                        className="size-3.5 text-violet-500"
                      />
                    </div>
                    <div className="text-left">
                      <p className="text-[9px] font-medium uppercase tracking-wider text-violet-500/70">
                        Level
                      </p>
                      <p className="text-sm font-bold leading-none text-foreground">
                        {level}
                      </p>
                    </div>
                  </div>
                </div>
                <p className="text-[10px] text-muted-foreground">
                  {nextLevelWorkouts} workouts until Level {level + 1}
                </p>
              </div>
            </div>

            {/* Bottom: Mini stats bar */}
            <div className="mt-4 flex items-center justify-between border-t border-border/50 pt-4">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1.5">
                  <div className="rounded-md bg-emerald-500/10 p-1">
                    <HugeiconsIcon
                      icon={CoinsDollarIcon}
                      className="size-3.5 text-emerald-500"
                    />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-foreground">{coins}</p>
                    <p className="text-[9px] text-muted-foreground">Coins</p>
                  </div>
                </div>

                <Separator orientation="vertical" className="h-8" />

                <div className="flex items-center gap-1.5">
                  <div className="rounded-md bg-amber-500/10 p-1">
                    <HugeiconsIcon
                      icon={Award01Icon}
                      className="size-3.5 text-amber-500"
                    />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-foreground">
                      {totalWorkouts}
                    </p>
                    <p className="text-[9px] text-muted-foreground">Workouts</p>
                  </div>
                </div>

                <Separator orientation="vertical" className="h-8" />

                <div className="flex items-center gap-1.5">
                  <div className="rounded-md bg-orange-500/10 p-1">
                    <HugeiconsIcon
                      icon={ZapIcon}
                      className="size-3.5 text-orange-500"
                    />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-foreground">
                      {longestStreak}
                    </p>
                    <p className="text-[9px] text-muted-foreground">Best</p>
                  </div>
                </div>
              </div>

              <div className="text-right">
                <p className="text-[10px] font-medium text-primary">
                  Top 5% this week
                </p>
              </div>
            </div>
          </div>

          {/* How It Works Banner */}
          <div className="mb-5">
            <div
              className="group cursor-pointer overflow-hidden rounded-lg border border-blue-500/30 bg-linear-to-r from-blue-500/10 via-cyan-500/10 to-blue-500/10 transition-all hover:border-blue-500/40 hover:shadow-md"
              onClick={() => setIsInfoExpanded(!isInfoExpanded)}
            >
              <div className="flex items-center justify-between p-3">
                <div className="flex items-center gap-2.5">
                  <div className="rounded-full bg-blue-500/20 p-1.5 ring-2 ring-blue-500/30">
                    <HugeiconsIcon
                      icon={InformationCircleIcon}
                      className="size-4 text-blue-600"
                    />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-foreground">
                      How Streaks & Coins Work
                    </p>
                    <p className="text-[10px] text-muted-foreground">
                      {isInfoExpanded
                        ? "Click to collapse"
                        : "Click to learn more"}
                    </p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon-sm"
                  className="size-7 text-blue-600 transition-transform duration-300"
                  style={{
                    transform: isInfoExpanded
                      ? "rotate(180deg)"
                      : "rotate(0deg)",
                  }}
                >
                  <HugeiconsIcon icon={ArrowDown01Icon} className="size-4" />
                </Button>
              </div>

              {/* Expandable Content */}
              <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  isInfoExpanded ? "max-h-50 opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <Separator className="bg-blue-500/20" />
                <div className="grid grid-cols-3 gap-3 p-3">
                  {/* Streaks */}
                  <div className="flex flex-col items-center text-center">
                    <div className="mb-1.5 rounded-full bg-orange-500/20 p-1.5 ring-1 ring-orange-500/30">
                      <HugeiconsIcon
                        icon={Fire02Icon}
                        className="size-3.5 text-orange-600"
                      />
                    </div>
                    <p className="mb-1 text-[11px] font-bold text-foreground">
                      Streaks
                    </p>
                    <p className="text-[10px] leading-snug text-muted-foreground">
                      Daily workouts build streaks. Unlock badges & bonus coins!
                    </p>
                  </div>

                  {/* Coins */}
                  <div className="flex flex-col items-center text-center">
                    <div className="mb-1.5 rounded-full bg-emerald-500/20 p-1.5 ring-1 ring-emerald-500/30">
                      <HugeiconsIcon
                        icon={CoinsDollarIcon}
                        className="size-3.5 text-emerald-600"
                      />
                    </div>
                    <p className="mb-1 text-[11px] font-bold text-foreground">
                      Coins
                    </p>
                    <p className="text-[10px] leading-snug text-muted-foreground">
                      Earn from workouts & goals. Unlock premium features!
                    </p>
                  </div>

                  {/* Levels */}
                  <div className="flex flex-col items-center text-center">
                    <div className="mb-1.5 rounded-full bg-violet-500/20 p-1.5 ring-1 ring-violet-500/30">
                      <HugeiconsIcon
                        icon={Award01Icon}
                        className="size-3.5 text-violet-600"
                      />
                    </div>
                    <p className="mb-1 text-[11px] font-bold text-foreground">
                      Levels
                    </p>
                    <p className="text-[10px] leading-snug text-muted-foreground">
                      Gain XP per workout. Level up for achievements!
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Separator className="my-5 bg-linear-to-r from-transparent via-border to-transparent" />

          {/* Weekly Progress with enhanced styling */}
          <div className="mb-6 overflow-hidden rounded-xl border-2 border-border/50 bg-card/50 backdrop-blur-sm transition-all hover:border-primary/30">
            <div className="p-4">
              <div className="mb-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="absolute inset-0 rounded-xl bg-primary/20 blur-md" />
                    <div className="relative rounded-xl border border-primary/30 bg-linear-to-br from-primary/20 to-primary/10 p-2.5">
                      <HugeiconsIcon
                        icon={Calendar03Icon}
                        className="size-5 text-primary"
                      />
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-foreground">
                      This Week's Progress
                    </p>
                    <p className="text-[10px] text-muted-foreground">
                      {daysCompleted} out of {weeklyGoal} days completed
                    </p>
                  </div>
                </div>
                <Badge variant="secondary" className="gap-1 font-bold">
                  <span className="text-primary">{daysCompleted}</span>
                  <span className="text-muted-foreground">/</span>
                  <span>{weeklyGoal}</span>
                </Badge>
              </div>

              {/* Week Days with enhanced design */}
              <div className="mb-4 grid grid-cols-7 gap-2">
                {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map(
                  (day, index) => {
                    const isCompleted = index < daysCompleted;
                    const isToday = index === daysCompleted;
                    return (
                      <div
                        key={index}
                        className={`group relative cursor-pointer rounded-xl p-2.5 text-center transition-all ${
                          isToday
                            ? "scale-110 bg-primary text-primary-foreground shadow-lg ring-4 ring-primary/30"
                            : isCompleted
                            ? "border-2 border-primary/40 bg-primary/20 hover:scale-105"
                            : "border-2 border-muted bg-muted/30 hover:scale-105 hover:border-primary/20"
                        }`}
                      >
                        <div className="mb-2 text-[10px] font-bold">
                          {day.slice(0, 3)}
                        </div>
                        {isCompleted ? (
                          <HugeiconsIcon
                            icon={CheckmarkCircle01Icon}
                            className={`size-5 mx-auto ${
                              isToday
                                ? "text-primary-foreground"
                                : "text-primary animate-pulse"
                            }`}
                          />
                        ) : (
                          <div className="mx-auto size-5 rounded-full border-2 border-muted-foreground/30 transition-colors group-hover:border-primary" />
                        )}
                      </div>
                    );
                  }
                )}
              </div>

              {/* Weekly Stats */}
              <div className="grid grid-cols-3 gap-3">
                <div className="rounded-lg border border-green-500/20 bg-green-500/10 p-3 text-center">
                  <div className="text-xl font-bold text-green-600">
                    {Math.round((daysCompleted / weeklyGoal) * 100)}%
                  </div>
                  <div className="mt-1 text-[10px] text-muted-foreground">
                    Completion
                  </div>
                </div>
                <div className="rounded-lg border border-blue-500/20 bg-blue-500/10 p-3 text-center">
                  <div className="text-xl font-bold text-blue-600">
                    {thisWeekWorkouts * 45}
                  </div>
                  <div className="mt-1 text-[10px] text-muted-foreground">
                    Active Min
                  </div>
                </div>
                <div className="rounded-lg border border-purple-500/20 bg-purple-500/10 p-3 text-center">
                  <div className="text-xl font-bold text-purple-600">2,100</div>
                  <div className="mt-1 text-[10px] text-muted-foreground">
                    Avg Calories
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Separator className="my-5 bg-linear-to-r from-transparent via-border to-transparent" />

          {/* Achievements Section */}
          <div className="mb-6">
            <div className="mb-3 flex items-center gap-2">
              <div className="rounded-full bg-violet-500/10 p-1.5">
                <HugeiconsIcon
                  icon={StarIcon}
                  className="size-4 text-violet-500"
                />
              </div>
              <span className="text-sm font-bold text-foreground">
                Recent Achievements
              </span>
            </div>

            <div className="space-y-2">
              <div className="group flex items-center gap-3 rounded-lg border border-amber-500/30 bg-linear-to-r from-amber-500/10 to-amber-600/5 p-3 transition-all hover:scale-[1.02] hover:shadow-lg hover:shadow-amber-500/20">
                <div className="rounded-full bg-amber-500/20 p-2 ring-2 ring-amber-500/30 transition-all group-hover:scale-110">
                  <HugeiconsIcon
                    icon={Award01Icon}
                    className="size-4 text-amber-600"
                  />
                </div>
                <div className="flex-1">
                  <p className="text-xs font-bold text-foreground">
                    Week Warrior
                  </p>
                  <p className="text-[10px] text-muted-foreground">
                    Completed 5 workouts this week
                  </p>
                </div>
                <Badge variant="secondary" className="text-[10px] font-bold">
                  +50
                </Badge>
              </div>

              <div className="group flex items-center gap-3 rounded-lg border border-orange-500/30 bg-linear-to-r from-orange-500/10 to-orange-600/5 p-3 transition-all hover:scale-[1.02] hover:shadow-lg hover:shadow-orange-500/20">
                <div className="rounded-full bg-orange-500/20 p-2 ring-2 ring-orange-500/30 transition-all group-hover:scale-110">
                  <HugeiconsIcon
                    icon={Fire02Icon}
                    className="size-4 text-orange-600"
                  />
                </div>
                <div className="flex-1">
                  <p className="text-xs font-bold text-foreground">
                    Streak Master
                  </p>
                  <p className="text-[10px] text-muted-foreground">
                    10+ day streak achieved
                  </p>
                </div>
                <Badge variant="secondary" className="text-[10px] font-bold">
                  +100
                </Badge>
              </div>
            </div>
          </div>

          <Separator className="my-5 bg-linear-to-r from-transparent via-border to-transparent" />

          {/* Motivational Section with enhanced styling */}
          <div className="text-center">
            <div className="mb-3 inline-flex items-center gap-2 rounded-2xl border border-primary/30 bg-linear-to-r from-primary/15 via-secondary/10 to-primary/15 px-5 py-3 shadow-lg shadow-primary/20 backdrop-blur-sm transition-all hover:scale-105 hover:shadow-xl hover:shadow-primary/30">
              <div className="flex items-center gap-2">
                <div className="rounded-full bg-primary/20 p-1.5 ring-2 ring-primary/30">
                  <HugeiconsIcon
                    icon={Calendar03Icon}
                    className="size-4 text-primary"
                  />
                </div>
                <div className="text-left">
                  <p className="text-xs font-bold text-foreground">This Week</p>
                  <p className="text-[10px] text-muted-foreground">
                    {thisWeekWorkouts} workouts completed
                  </p>
                </div>
              </div>
              <Separator orientation="vertical" className="h-8 bg-border/50" />
              <div className="flex items-center gap-1.5">
                <HugeiconsIcon
                  icon={Award01Icon}
                  className="size-5 text-amber-500"
                />
                <span className="text-2xl font-black text-foreground">
                  {thisWeekWorkouts}
                </span>
              </div>
            </div>

            <p className="text-xs font-medium text-muted-foreground">
              {daysCompleted >= weeklyGoal
                ? "🎉 Amazing! You've crushed your weekly goal!"
                : `💪 Only ${weeklyGoal - daysCompleted} more ${
                    weeklyGoal - daysCompleted === 1 ? "day" : "days"
                  } to reach your goal!`}
            </p>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
