"use client";

import { useState } from "react";
import { useNutritionPlanStore } from "@/stores/nutrition-plan.store";
import { cn } from "@/lib/shared/utils";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Calendar03Icon,
  Target01Icon,
  Location01Icon,
  Clock01Icon,
  Wallet01Icon,
  Tap06Icon,
} from "@hugeicons/core-free-icons";
import { NutritionPlanViewDialog } from "./nutrition-plan-view-dialog";

export function NutritionPlanList() {
  const { plans, selectPlan, fetchPlanDetails, activePlanId } =
    useNutritionPlanStore();
  const [open, setOpen] = useState(false);

  if (plans.length === 0) {
    return null;
  }

  const sortedPlans = [...plans].sort((a, b) => {
    if (a.id === activePlanId) return -1;
    if (b.id === activePlanId) return 1;
    return 0;
  });

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 p-4 overflow-y-auto max-h-full">
      {sortedPlans.map((plan, index) => {
        const isActive = plan.id === activePlanId;

        return (
          <div
            key={plan.id}
            onClick={() => {
              selectPlan(plan.id);
              fetchPlanDetails(plan.id);
              setOpen(true);
            }}
            style={{ animationDelay: `${index * 80}ms` }}
            className={cn(
              "group relative rounded-2xl transition-all duration-500 animate-in fade-in slide-in-from-bottom-4 bg-card overflow-hidden hover:-translate-y-1 cursor-pointer",
              isActive
                ? "border-l-4 border-l-green-500 shadow-xl shadow-green-500/5 hover:shadow-2xl hover:shadow-green-500/10"
                : "border-l-4 border-l-muted/50 shadow-lg hover:shadow-xl hover:border-l-primary/50",
            )}
          >
            {isActive && (
              <>
                <div className="absolute inset-0 bg-linear-to-r from-green-500/5 via-transparent to-transparent pointer-events-none" />
                <div className="absolute inset-0 bg-linear-to-b from-transparent to-green-500/5 pointer-events-none" />
              </>
            )}

            <div className="flex flex-col p-4 md:p-5 space-y-4">
              {/* Header */}
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg md:text-xl font-bold text-foreground leading-tight mb-1.5">
                    {plan.name}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">
                    {plan.description}
                  </p>
                </div>

                {isActive && (
                  <div className="flex items-center gap-1.5 rounded-lg bg-linear-to-r from-green-500/20 to-emerald-500/10 border border-green-500/40 px-2.5 py-1.5 backdrop-blur-sm shadow-sm">
                    <span className="h-2 w-2 rounded-full bg-green-400 animate-pulse" />
                    <span className="text-[10px] font-bold text-green-400 uppercase tracking-wide">
                      Active
                    </span>
                  </div>
                )}
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 py-2.5 px-3.5 rounded-lg bg-background/50 border border-border/40 shadow-inner shadow-black/5">
                <div className="flex items-center gap-2">
                  <HugeiconsIcon
                    icon={Target01Icon}
                    className="h-4 w-4 text-blue-500"
                  />
                  <div>
                    <div className="text-xs text-muted-foreground">Goal</div>
                    <div className="text-sm font-semibold text-foreground capitalize">
                      {plan.primaryGoal.replace(/_/g, " ")}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <HugeiconsIcon
                    icon={Location01Icon}
                    className="h-4 w-4 text-purple-500"
                  />
                  <div>
                    <div className="text-xs text-muted-foreground">Diet</div>
                    <div className="text-sm font-semibold text-foreground capitalize">
                      {plan.dietType.replace(/_/g, " ")}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <HugeiconsIcon
                    icon={Clock01Icon}
                    className="h-4 w-4 text-amber-500"
                  />
                  <div>
                    <div className="text-xs text-muted-foreground">
                      Meals / Day
                    </div>
                    <div className="text-sm font-semibold text-foreground">
                      {plan.mealsPerDay}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <HugeiconsIcon
                    icon={Wallet01Icon}
                    className="h-4 w-4 text-emerald-500"
                  />
                  <div>
                    <div className="text-xs text-muted-foreground">Budget</div>
                    <div className="text-sm font-semibold text-foreground capitalize">
                      {plan.budgetLevel}
                    </div>
                  </div>
                </div>
              </div>

              {/* Footer */}
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
                  <span>View Plan</span>
                  <HugeiconsIcon
                    icon={Tap06Icon}
                    className="h-4 w-4 transition-transform group-hover:scale-110"
                  />
                </div>
              </div>
            </div>
          </div>
        );
      })}

      <NutritionPlanViewDialog open={open} onOpenChange={setOpen} />
    </div>
  );
}
