"use client";

import { useWorkoutPlanStore } from "@/stores/workout-plan.store";
import { cn } from "@/lib/shared/utils";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Calendar03Icon,
  Clock01Icon,
  Target01Icon,
  TrendingUp,
  Location01Icon,
  ZapIcon,
  Tap06Icon,
} from "@hugeicons/core-free-icons";

export function WorkoutPlanList() {
  const { plans, selectPlan, fetchPlanDetails, activePlanId } =
    useWorkoutPlanStore();

  if (plans.length === 0) {
    return null;
  }

  // Sort plans with active plan first
  const sortedPlans = [...plans].sort((a, b) => {
    if (a.id === activePlanId) return -1;
    if (b.id === activePlanId) return 1;
    return 0;
  });

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 p-5 overflow-y-auto max-h-full">
      {sortedPlans.map((plan, index) => {
        const isActive = plan.id === activePlanId;
        const totalWorkouts =
          plan.durationWeeks *
          (parseInt(plan.weeklyFrequency.replace(/\D/g, "")) || 4);

        return (
          <div
            key={plan.id}
            onClick={() => {
              selectPlan(plan.id);
              fetchPlanDetails(plan.id);
            }}
            style={{ animationDelay: `${index * 100}ms` }}
            className={cn(
              "group relative rounded-2xl transition-all duration-500 animate-in fade-in slide-in-from-bottom-4 bg-card overflow-hidden hover:-translate-y-1 min-h-80 cursor-pointer",
              isActive
                ? "border-l-4 border-l-green-500 shadow-xl shadow-green-500/5 hover:shadow-2xl hover:shadow-green-500/10"
                : "border-l-4 border-l-muted/50 shadow-lg hover:shadow-xl hover:border-l-primary/50 ",
            )}
          >
            {isActive && (
              <>
                <div className="absolute inset-0 bg-linear-to-r from-green-500/5 via-transparent to-transparent pointer-events-none" />
                <div className="absolute inset-0 bg-linear-to-b from-transparent to-green-500/5 pointer-events-none" />
              </>
            )}

            <div className="flex flex-col md:flex-row items-stretch min-h-70 h-full">
              {/* Left: Hero Circle Section */}
              <div className="flex flex-row md:flex-col items-center justify-around md:gap-0 p-4 md:p-6 bg-muted/50 min-h-50">
                <div
                  className={cn(
                    "relative flex h-32 w-32 flex-col items-center justify-center rounded-full border-[3px] bg-background/50 shadow-lg shadow-black/10 transition-all duration-500 group-hover:scale-105 shrink-0",
                    isActive
                      ? "border-green-500/70 shadow-green-500/20 group-hover:shadow-green-500/40"
                      : "border-background/50 group-hover:border-primary/50 group-hover:shadow-primary/20",
                  )}
                >
                  <div className="text-3xl md:text-4xl font-black text-foreground">
                    {plan.durationWeeks}
                  </div>
                  <div className="text-[9px] md:text-[10px] font-semibold text-muted-foreground uppercase tracking-widest mt-0.5">
                    Week Program
                  </div>
                </div>
                <div className="md:mt-5 text-center space-y-2.5 md:flex-none flex flex-col justify-center">
                  <div>
                    <div className="text-xl font-bold text-foreground">
                      {totalWorkouts}
                    </div>
                    <div className="text-[10px] text-muted-foreground uppercase tracking-wide mt-0.5">
                      Total Sessions
                    </div>
                  </div>
                  {isActive && (
                    <div className="flex items-center justify-center gap-1.5 rounded-lg bg-linear-to-r from-green-500/20 to-emerald-500/10 border border-green-500/40 px-2.5 py-1.5 backdrop-blur-sm shadow-sm">
                      <span className="h-2 w-2 rounded-full bg-green-400 animate-pulse" />
                      <span className="text-[10px] font-bold text-green-400 uppercase tracking-wide">
                        Active
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Right: Content Section */}
              <div className="flex-1 flex flex-col p-4 md:p-5 space-y-3 md:space-y-4 relative">
                <div className="space-y-1.5">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg md:text-xl font-bold text-foreground leading-tight mb-1.5  pr-12 md:pr-20">
                        {plan.name}
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {plan.description}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row lg:flex-col xl:flex-row items-stretch sm:items-center lg:items-start xl:items-stretch gap-2 sm:gap-3.5 lg:gap-3.5 xl:gap-2 py-2.5 px-3.5 rounded-lg bg-background/50 border border-border/40 shadow-inner shadow-black/5 transition-all duration-300 group-hover:border-border/60">
                  <div className="flex items-center gap-2 flex-1">
                    <div className="p-1.5 rounded-lg bg-cyan-500/10 transition-all duration-300 group-hover:bg-cyan-500/20">
                      <HugeiconsIcon
                        icon={ZapIcon}
                        className="h-3.5 w-3.5 text-cyan-500 shrink-0 transition-transform duration-300"
                      />
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground">
                        Frequency
                      </div>
                      <div className="text-sm font-bold text-foreground">
                        {plan.weeklyFrequency.replace(/\D/g, "")}x/week
                      </div>
                    </div>
                  </div>
                  <div className="hidden sm:block lg:hidden xl:block h-8 w-px bg-border" />
                  <div
                    className="flex items-center gap-2 flex-1"
                    style={{ transitionDelay: "50ms" }}
                  >
                    <div className="p-1.5 rounded-lg bg-amber-500/10 transition-all duration-300 group-hover:bg-amber-500/20">
                      <HugeiconsIcon
                        icon={Clock01Icon}
                        className="h-3.5 w-3.5 text-amber-500 shrink-0 transition-transform duration-300"
                      />
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground">
                        Duration
                      </div>
                      <div className="text-sm font-bold text-foreground">
                        {plan.sessionDurationMinutes} min
                      </div>
                    </div>
                  </div>
                  <div className="hidden sm:block lg:hidden xl:block h-8 w-px bg-border" />
                  <div
                    className="flex items-center gap-2 flex-1"
                    style={{ transitionDelay: "100ms" }}
                  >
                    <div className="p-1.5 rounded-lg bg-purple-500/10 transition-all duration-300 group-hover:bg-purple-500/20">
                      <HugeiconsIcon
                        icon={Location01Icon}
                        className="h-3.5 w-3.5 text-purple-500 shrink-0 transition-transform duration-300"
                      />
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground">
                        Location
                      </div>
                      <div className="text-sm font-bold text-foreground capitalize line-clamp-1">
                        {plan.trainingEnvironment.replace(/_/g, " ")}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  {plan.fitnessLevel && (
                    <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-500/15 text-[11px] font-semibold text-emerald-400 transition-all duration-300 hover:bg-emerald-500/25 hover:scale-105">
                      <HugeiconsIcon
                        icon={TrendingUp}
                        className="h-3.5 w-3.5"
                      />
                      <span className="capitalize">{plan.fitnessLevel}</span>
                    </div>
                  )}
                  {plan.primaryGoals &&
                    plan.primaryGoals.length > 0 &&
                    plan.primaryGoals.map((goal, idx) => (
                      <div
                        key={idx}
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-blue-500/15 text-[11px] font-semibold text-blue-400 transition-all duration-300 hover:bg-blue-500/25 hover:scale-105"
                      >
                        <HugeiconsIcon
                          icon={Target01Icon}
                          className="h-3.5 w-3.5"
                        />
                        <span className="capitalize">
                          {goal.replace(/_/g, " ")}
                        </span>
                      </div>
                    ))}
                </div>

                <div className="flex-1" />
                <div className="flex items-center justify-between pt-2.5 border-t border-border/80">
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <HugeiconsIcon
                      icon={Calendar03Icon}
                      className="h-3.5 w-3.5"
                    />
                    <span>
                      {plan.isActive && plan.startDate ? "Started " : "Created "}
                      {new Date(
                        plan.isActive && plan.startDate
                          ? plan.startDate
                          : plan.createdAt,
                      ).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">
                    <span>{isActive ? "Continue" : "View Plan"}</span>
                    <HugeiconsIcon
                      icon={Tap06Icon}
                      className="h-4 w-4 transition-transform group-hover:scale-110"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
