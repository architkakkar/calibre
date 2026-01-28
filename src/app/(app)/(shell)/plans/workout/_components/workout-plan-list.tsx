"use client";

import { useWorkoutPlanStore } from "@/stores/workout-plan.store";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/shared/utils";
import {
  Dumbbell,
  Calendar,
  Clock,
  Target,
  TrendingUp,
  MapPin,
  Zap,
  ArrowRight,
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
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-6 overflow-y-auto max-h-full">
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
              "group relative rounded-2xl transition-all duration-300 animate-in fade-in slide-in-from-bottom-4 bg-card overflow-hidden",
              isActive
                ? "border-l-4 border-l-green-500 shadow-xl shadow-green-500/5"
                : "border-l-4 border-l-transparent shadow-lg hover:shadow-xl",
            )}
          >
            {/* Active Glow Effect */}
            {isActive && (
              <div className="absolute inset-0 bg-linear-to-r from-green-500/5 via-transparent to-transparent pointer-events-none" />
            )}

            {/* Main Content - Horizontal Layout */}
            <div className="flex items-stretch min-h-70">
              {/* Left: Hero Circle Section */}
              <div className="flex flex-col items-center justify-center p-8 bg-muted/30 min-h-50">
                <div className="relative">
                  {/* Duration Circle */}
                  <div
                    className={cn(
                      "relative flex h-36 w-36 flex-col items-center justify-center rounded-full border-4 bg-card shadow-lg transition-all",
                      isActive
                        ? "border-green-500/60 shadow-green-500/20"
                        : "border-border/50",
                    )}
                  >
                    <div className="text-5xl font-black text-foreground">
                      {plan.durationWeeks}
                    </div>
                    <div className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest mt-1">
                      Week Plan
                    </div>
                  </div>

                  {/* Active Indicator */}
                  {isActive && (
                    <div className="absolute -top-2 -right-2 flex items-center justify-center h-8 w-8 rounded-full bg-green-500 shadow-lg animate-pulse">
                      <div className="h-2 w-2 rounded-full bg-white" />
                    </div>
                  )}
                </div>

                {/* Total Workouts */}
                <div className="mt-6 text-center">
                  <div className="text-2xl font-bold text-foreground">
                    {totalWorkouts}
                  </div>
                  <div className="text-[10px] text-muted-foreground uppercase tracking-wide">
                    Total Workouts
                  </div>
                </div>
              </div>

              {/* Right: Content Section */}
              <div className="flex-1 flex flex-col p-6 space-y-5">
                {/* Header */}
                <div className="space-y-2">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <h3 className="text-2xl font-bold text-foreground leading-tight mb-2 line-clamp-1">
                        {plan.name}
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">
                        {plan.description}
                      </p>
                    </div>
                    <div className="p-2.5 rounded-xl bg-primary/10 shrink-0">
                      <Dumbbell className="h-5 w-5 text-primary" />
                    </div>
                  </div>
                </div>

                {/* Stats Bar - Horizontal */}
                <div className="flex items-center gap-4 py-3 px-4 rounded-lg bg-muted/30 border border-border/50">
                  <div className="flex items-center gap-2 flex-1">
                    <Zap className="h-4 w-4 text-cyan-500 shrink-0" />
                    <div>
                      <div className="text-xs text-muted-foreground">
                        Frequency
                      </div>
                      <div className="text-sm font-bold text-foreground">
                        {plan.weeklyFrequency.replace(/\D/g, "")}x/week
                      </div>
                    </div>
                  </div>

                  <div className="h-8 w-px bg-border" />

                  <div className="flex items-center gap-2 flex-1">
                    <Clock className="h-4 w-4 text-amber-500 shrink-0" />
                    <div>
                      <div className="text-xs text-muted-foreground">
                        Duration
                      </div>
                      <div className="text-sm font-bold text-foreground">
                        {plan.sessionDurationMinutes} min
                      </div>
                    </div>
                  </div>

                  <div className="h-8 w-px bg-border" />

                  <div className="flex items-center gap-2 flex-1">
                    <MapPin className="h-4 w-4 text-primary shrink-0" />
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
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-muted text-xs font-medium text-foreground">
                      <TrendingUp className="h-3 w-3" />
                      <span className="capitalize">{plan.fitnessLevel}</span>
                    </div>
                  )}
                  {plan.primaryGoals && plan.primaryGoals.length > 0 && (
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-muted text-xs font-medium text-foreground">
                      <Target className="h-3 w-3" />
                      <span className="capitalize">
                        {plan.primaryGoals[0].replace(/_/g, " ")}
                      </span>
                    </div>
                  )}
                </div>

                {/* Footer - Spacer and Actions */}
                <div className="flex-1" />

                <div className="flex items-center justify-between pt-3 border-t border-border/50">
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <Calendar className="h-3.5 w-3.5" />
                    <span>
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
                    size="sm"
                    className={cn(
                      "gap-1.5 font-semibold group/btn",
                      isActive && "bg-green-600 hover:bg-green-700",
                    )}
                  >
                    {isActive ? "Continue" : "View Plan"}
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover/btn:translate-x-0.5" />
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
