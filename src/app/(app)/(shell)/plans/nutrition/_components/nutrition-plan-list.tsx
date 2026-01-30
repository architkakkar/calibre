"use client";

import { useState } from "react";
import { useNutritionPlanStore } from "@/stores/nutrition-plan.store";
import { cn } from "@/lib/shared/utils";
import { NutritionPlanViewDialog } from "./nutrition-plan-view-dialog";
import { MacroRingChart } from "./macro-ring-chart";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Calendar03Icon,
  Target01Icon,
  Leaf01Icon,
  Clock01Icon,
  Wallet01Icon,
  Tap06Icon,
  Restaurant01Icon,
  BookOpen02Icon,
  ChickenThighsIcon,
  EggsIcon,
  FishFoodIcon,
  AlertCircleIcon,
} from "@hugeicons/core-free-icons";

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

  const getDietConfig = (dietType: string) => {
    switch (dietType) {
      case "vegetarian":
        return {
          icon: Leaf01Icon,
          bgColor: "bg-green-500/10",
          hoverBgColor: "group-hover:bg-green-500/20",
          iconColor: "text-green-500",
        };
      case "non_vegetarian":
        return {
          icon: ChickenThighsIcon,
          bgColor: "bg-red-500/10",
          hoverBgColor: "group-hover:bg-red-500/20",
          iconColor: "text-red-500",
        };
      case "eggetarian":
        return {
          icon: EggsIcon,
          bgColor: "bg-yellow-500/10",
          hoverBgColor: "group-hover:bg-yellow-500/20",
          iconColor: "text-yellow-500",
        };
      case "vegan":
        return {
          icon: Leaf01Icon,
          bgColor: "bg-emerald-500/10",
          hoverBgColor: "group-hover:bg-emerald-500/20",
          iconColor: "text-emerald-500",
        };
      case "pescatarian":
        return {
          icon: FishFoodIcon,
          bgColor: "bg-cyan-500/10",
          hoverBgColor: "group-hover:bg-cyan-500/20",
          iconColor: "text-cyan-500",
        };
      default:
        return {
          icon: Leaf01Icon,
          bgColor: "bg-purple-500/10",
          hoverBgColor: "group-hover:bg-purple-500/20",
          iconColor: "text-purple-500",
        };
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 p-4 overflow-y-auto max-h-full">
      {sortedPlans.map((plan, index) => {
        const isActive = plan.id === activePlanId;
        const dietConfig = getDietConfig(plan.dietType);

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
                : "border-l-4 border-l-muted/50 shadow-lg hover:shadow-xl hover:border-l-primary/50",
            )}
          >
            {isActive && (
              <>
                <div className="absolute inset-0 bg-linear-to-r from-green-500/5 via-transparent to-transparent pointer-events-none" />
                <div className="absolute inset-0 bg-linear-to-b from-transparent to-green-500/5 pointer-events-none" />
              </>
            )}

            <div className="flex flex-col md:flex-row items-stretch min-h-70 h-full">
              {/* Left: Calorie & Macro Section */}
              <div className="flex flex-col items-center justify-around gap-4 p-4 md:p-6 bg-muted/50 min-h-50">
                <div className="flex flex-col items-center gap-2">
                  <MacroRingChart
                    proteinGrams={plan.macros.proteinGrams}
                    carbsGrams={plan.macros.carbsGrams}
                    fatsGrams={plan.macros.fatsGrams}
                    size="lg"
                    showLabels={false}
                  />
                  <div className="flex items-center gap-2 text-[10px]">
                    <div className="flex items-center gap-1">
                      <div className="h-1.5 w-1.5 rounded-full bg-blue-500" />
                      <span className="text-muted-foreground font-medium">
                        P: {plan.macros.proteinGrams}g
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="h-1.5 w-1.5 rounded-full bg-amber-500" />
                      <span className="text-muted-foreground font-medium">
                        C: {plan.macros.carbsGrams}g
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                      <span className="text-muted-foreground font-medium">
                        F: {plan.macros.fatsGrams}g
                      </span>
                    </div>
                  </div>
                </div>
                <div className="text-center space-y-2 w-full">
                  <div className="flex flex-col items-center gap-1">
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl md:text-3xl font-black text-foreground">
                        {plan.averageDailyCalories.toLocaleString()}
                      </span>
                      <span className="text-xs text-muted-foreground font-medium">
                        cal/day
                      </span>
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
                    <div
                      className={cn(
                        "p-1.5 rounded-lg transition-all duration-300",
                        dietConfig.bgColor,
                        dietConfig.hoverBgColor,
                      )}
                    >
                      <HugeiconsIcon
                        icon={dietConfig.icon}
                        className={cn(
                          "h-3.5 w-3.5 shrink-0 transition-transform duration-300",
                          dietConfig.iconColor,
                        )}
                      />
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground">Diet</div>
                      <div className="text-sm font-bold text-foreground capitalize line-clamp-1">
                        {plan.dietType.replace(/_/g, " ")}
                      </div>
                    </div>
                  </div>
                  <div className="hidden sm:block lg:hidden xl:block h-8 w-px bg-border" />
                  <div
                    className="flex items-center gap-2 flex-1"
                    style={{ transitionDelay: "50ms" }}
                  >
                    <div className="p-1.5 rounded-lg bg-blue-500/10 transition-all duration-300 group-hover:bg-blue-500/20">
                      <HugeiconsIcon
                        icon={Clock01Icon}
                        className="h-3.5 w-3.5 text-blue-500 shrink-0 transition-transform duration-300"
                      />
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground">
                        Meals / Day
                      </div>
                      <div className="text-sm font-bold text-foreground">
                        {plan.mealsPerDay === "5_plus"
                          ? "5+"
                          : plan.mealsPerDay}
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
                        icon={Wallet01Icon}
                        className="h-3.5 w-3.5 text-purple-500 shrink-0 transition-transform duration-300"
                      />
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground">
                        Budget
                      </div>
                      <div className="text-sm font-bold text-foreground capitalize line-clamp-1">
                        {plan.budgetLevel}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-blue-500/15 text-[11px] font-semibold text-blue-400 transition-all duration-300 hover:bg-blue-500/25 hover:scale-105">
                    <HugeiconsIcon
                      icon={Target01Icon}
                      className="h-3.5 w-3.5"
                    />
                    <span className="capitalize">
                      {plan.primaryGoal.replace(/_/g, " ")}
                    </span>
                  </div>
                  <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-500/15 text-[11px] font-semibold text-emerald-400 transition-all duration-300 hover:bg-emerald-500/25 hover:scale-105">
                    <HugeiconsIcon
                      icon={BookOpen02Icon}
                      className="h-3.5 w-3.5"
                    />
                    <span>{plan.totalMealOptions} recipes</span>
                  </div>
                  {plan.eatingOutFrequency &&
                    plan.eatingOutFrequency !== "Not specified" && (
                      <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-500/15 text-[11px] font-semibold text-amber-400 transition-all duration-300 hover:bg-amber-500/25 hover:scale-105">
                        <HugeiconsIcon
                          icon={Restaurant01Icon}
                          className="h-3.5 w-3.5"
                        />
                        <span>
                          Dining:{" "}
                          <span className="capitalize">
                            {plan.eatingOutFrequency}
                          </span>
                        </span>
                      </div>
                    )}
                </div>

                {plan.allergies && plan.allergies.length > 0 && (
                  <div className="flex flex-wrap items-center gap-2">
                    {plan.allergies.slice(0, 3).map((allergy, idx) => (
                      <div
                        key={idx}
                        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 text-[11px] font-semibold text-rose-400 transition-all duration-300 hover:bg-rose-500/20 hover:border-rose-500/30 hover:scale-105"
                      >
                        <HugeiconsIcon
                          icon={AlertCircleIcon}
                          className="h-3 w-3"
                        />
                        <span className="capitalize">{allergy}-free</span>
                      </div>
                    ))}
                    {plan.allergies.length > 3 && (
                      <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-rose-500/10 border border-rose-500/30 text-[11px] font-bold text-rose-300 transition-all duration-300 hover:bg-rose-500/20 hover:border-rose-500/40 hover:scale-105">
                        <span>+{plan.allergies.length - 3} more</span>
                      </div>
                    )}
                  </div>
                )}

                <div className="flex-1" />

                <div className="flex items-center justify-between pt-2.5 border-t border-border/80">
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <HugeiconsIcon
                      icon={Calendar03Icon}
                      className="h-3.5 w-3.5"
                    />
                    <span>
                      {plan.isActive && plan.startDate
                        ? "Started "
                        : "Created "}
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
          </div>
        );
      })}
      <NutritionPlanViewDialog open={open} onOpenChange={setOpen} />
    </div>
  );
}
