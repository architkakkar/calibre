"use client";

import { useWorkoutPlanStore } from "@/stores/workout-plan.store";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/shared/utils";
import {
  Calendar,
  Clock,
  Target,
  TrendingUp,
  MapPin,
  Zap,
  ArrowRight,
  Sparkles,
} from "lucide-react";

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
            style={{ animationDelay: `${index * 100}ms` }}
            className={cn(
              "group relative rounded-2xl transition-all duration-500 animate-in fade-in slide-in-from-bottom-4 bg-card overflow-hidden hover:-translate-y-1 min-h-80",
              isActive
                ? "border-l-4 border-l-green-500 shadow-xl shadow-green-500/5 hover:shadow-2xl hover:shadow-green-500/10"
                : "border-l-4 border-l-muted/50 shadow-lg hover:shadow-xl hover:border-l-primary/50 ",
            )}
          >
            {/* Active Glow Effect */}
            {isActive && (
              <>
                <div className="absolute inset-0 bg-linear-to-r from-green-500/5 via-transparent to-transparent pointer-events-none" />
                <div className="absolute inset-0 bg-linear-to-b from-transparent to-green-500/5 pointer-events-none" />
              </>
            )}

            {/* Main Content - Responsive Layout */}
            <div className="flex flex-col md:flex-row items-stretch min-h-70 h-full">
              {/* Left: Hero Circle Section */}
              <div className="flex flex-row md:flex-col items-center justify-around md:gap-0 p-4 md:p-6 bg-muted/50 min-h-50">
                {/* Duration Circle */}
                <div
                  className={cn(
                    "relative flex h-24 w-24 md:h-32 md:w-32 flex-col items-center justify-center rounded-full border-[3px] bg-card shadow-lg shadow-black/10 transition-all duration-500 group-hover:scale-105 group-hover:rotate-3 shrink-0",
                    isActive
                      ? "border-green-500/70 shadow-green-500/20 group-hover:shadow-green-500/40"
                      : "border-card group-hover:border-primary/50 group-hover:shadow-primary/20",
                  )}
                >
                  <div className="text-3xl md:text-4xl font-black text-foreground">
                    {plan.durationWeeks}
                  </div>
                  <div className="text-[9px] md:text-[10px] font-semibold text-muted-foreground uppercase tracking-widest mt-0.5">
                    Week Plan
                  </div>
                </div>

                {/* Total Workouts */}
                <div className="md:mt-5 text-center space-y-2.5 md:flex-none flex flex-col justify-center">
                  <div>
                    <div className="text-xl font-bold text-foreground">
                      {totalWorkouts}
                    </div>
                    <div className="text-[10px] text-muted-foreground uppercase tracking-wide mt-0.5">
                      Total Workouts
                    </div>
                  </div>

                  {isActive && (
                    <div className="flex items-center justify-center gap-1.5 rounded-lg bg-linear-to-r from-green-500/20 to-emerald-500/10 border border-green-500/40 px-2.5 py-1.5 backdrop-blur-sm shadow-sm animate-pulse">
                      <span className="h-2 w-2 rounded-full bg-green-400" />
                      <span className="text-[10px] font-bold text-green-400 uppercase tracking-wide">
                        Active
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Right: Content Section */}
              <div className="flex-1 flex flex-col p-4 md:p-5 space-y-3 md:space-y-4 relative">
                {/* Top-Right Badge Area */}
                {index === 0 && !isActive && (
                  <div className="absolute top-0 right-0">
                    <div className="flex items-center gap-1.5 rounded-bl-xl rounded-tr-2xl bg-linear-to-br from-secondary/20 to-secondary/10 border-l border-b border-secondary/30 px-3.5 py-2 backdrop-blur-sm shadow-lg">
                      <Sparkles className="h-3.5 w-3.5 text-secondary" />
                      <span className="text-xs font-bold text-secondary uppercase tracking-wide">
                        Featured
                      </span>
                    </div>
                  </div>
                )}

                {/* Header */}
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

                {/* Stats Bar - Responsive */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3.5 py-2.5 px-3.5 rounded-lg bg-muted/40 border border-border/40 shadow-inner shadow-black/5 transition-all duration-300 group-hover:bg-muted/50 group-hover:border-border/60">
                  <div className="flex items-center gap-1.5 flex-1">
                    <div className="p-1.5 rounded-lg bg-cyan-500/10 transition-all duration-300 group-hover:bg-cyan-500/20">
                      <Zap className="h-3.5 w-3.5 text-cyan-500 shrink-0 transition-transform duration-300 group-hover:rotate-12" />
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

                  <div className="hidden sm:block h-8 w-px bg-border" />

                  <div
                    className="flex items-center gap-1.5 flex-1"
                    style={{ transitionDelay: "50ms" }}
                  >
                    <div className="p-1.5 rounded-lg bg-amber-500/10 transition-all duration-300 group-hover:bg-amber-500/20">
                      <Clock className="h-3.5 w-3.5 text-amber-500 shrink-0 transition-transform duration-300 group-hover:-rotate-12" />
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

                  <div className="hidden sm:block h-8 w-px bg-border" />

                  <div
                    className="flex items-center gap-1.5 flex-1"
                    style={{ transitionDelay: "100ms" }}
                  >
                    <div className="p-1.5 rounded-lg bg-purple-500/10 transition-all duration-300 group-hover:bg-purple-500/20">
                      <MapPin className="h-3.5 w-3.5 text-purple-500 shrink-0 transition-transform duration-300 group-hover:scale-110" />
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground">
                        Location
                      </div>
                      <div className="text-sm font-bold text-foreground capitalize line-clamp-1">
                        {plan.trainingEnvironment}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap items-center gap-2">
                  {plan.fitnessLevel && (
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-muted text-xs font-medium text-foreground transition-all duration-300 hover:bg-muted/80 hover:scale-105">
                      <TrendingUp className="h-3 w-3" />
                      <span className="capitalize">{plan.fitnessLevel}</span>
                    </div>
                  )}
                  {plan.primaryGoals && plan.primaryGoals.length > 0 && (
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-muted text-xs font-medium text-foreground transition-all duration-300 hover:bg-muted/80 hover:scale-105">
                      <Target className="h-3 w-3" />
                      <span className="capitalize">
                        {plan.primaryGoals[0].replace(/_/g, " ")}
                      </span>
                    </div>
                  )}
                </div>

                {/* Footer - Spacer and Actions */}
                <div className="flex-1" />

                <div className="flex items-center justify-between pt-2.5 border-t border-border/50">
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <Calendar className="h-3.5 w-3.5" />
                    <span>
                      {isActive ? "Started " : "Created "}
                      {new Date(plan.createdAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </span>
                  </div>

                  <Button
                    onClick={() => {
                      selectPlan(plan.id);
                      fetchPlanDetails(plan.id);
                    }}
                    size="default"
                    className={cn(
                      "gap-2 font-semibold group/btn relative overflow-hidden px-6 py-2.5",
                      isActive && "bg-green-600 hover:bg-green-700",
                    )}
                  >
                    <span className="relative z-10">
                      {isActive ? "Continue" : "View Plan"}
                    </span>
                    <ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-1 relative z-10" />
                    <div className="absolute inset-0 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700 bg-linear-to-r from-transparent via-white/20 to-transparent" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
