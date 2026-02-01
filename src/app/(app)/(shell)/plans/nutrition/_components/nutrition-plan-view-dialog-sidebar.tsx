import { Meta, Plan } from "@/lib/validators/nutrition-plan.validator";
import { cn } from "@/lib/shared/utils";
import { HugeiconsIcon } from "@hugeicons/react";
import { Badge } from "@/components/ui/badge";
import {
  BookOpen01Icon,
  Restaurant01Icon,
  Target03Icon,
  ChevronDown,
  ChevronRight,
  Cancel01Icon,
  Sun02Icon,
  SunCloudIcon,
  Moon02Icon,
  StarIcon,
} from "@hugeicons/core-free-icons";

export function NutritionPlanViewDialogSidebar({
  meta,
  plan,
  isActivePlan,
  viewMode,
  setViewMode,
  expandedMealTypes,
  toggleMealType,
  selectedMealType,
  selectMeal,
  sidebarOpen,
  closeSidebar,
}: {
  meta: Meta;
  plan: Plan;
  isActivePlan: boolean;
  viewMode: "overview" | "meals";
  setViewMode: (mode: "overview" | "meals") => void;
  expandedMealTypes: Set<string>;
  toggleMealType: (mealType: string) => void;
  selectedMealType: string | null;
  selectMeal: (mealType: string) => void;
  sidebarOpen: boolean;
  closeSidebar: () => void;
}) {
  const handleOverviewClick = () => {
    setViewMode("overview");
    closeSidebar();
  };

  const handleMealSelect = (mealType: string) => {
    selectMeal(mealType);
    closeSidebar();
  };

  const mealTypeConfig: Record<
    string,
    { icon: typeof Restaurant01Icon; label: string; color: string; bg: string }
  > = {
    breakfast: {
      icon: Sun02Icon,
      label: "Breakfast",
      color: "text-orange-500",
      bg: "bg-orange-500/10",
    },
    lunch: {
      icon: SunCloudIcon,
      label: "Lunch",
      color: "text-blue-500",
      bg: "bg-blue-500/10",
    },
    dinner: {
      icon: Moon02Icon,
      label: "Dinner",
      color: "text-purple-500",
      bg: "bg-purple-500/10",
    },
    snack: {
      icon: StarIcon,
      label: "Snack",
      color: "text-green-500",
      bg: "bg-green-500/10",
    },
  };

  return (
    <>
      {/* Backdrop overlay for mobile */}
      {sidebarOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-40 animate-in fade-in duration-200"
          onClick={closeSidebar}
        />
      )}

      {/* Sidebar */}
      <div
        className={cn(
          "w-80 border-r border-border bg-linear-to-b from-muted/20 to-background flex flex-col min-h-0",
          // Mobile: fixed positioned sidebar that slides in from left
          "lg:relative fixed inset-y-0 left-0 z-50 transition-transform duration-300 ease-in-out",
          // On mobile, hide by default and show when sidebarOpen is true
          sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0",
        )}
      >
        {/* Header */}
        <div className="p-5 border-b border-border bg-card/80 backdrop-blur-sm">
          {/* Mobile close button */}
          <button
            onClick={closeSidebar}
            className="lg:hidden absolute top-4 right-4 p-1.5 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
          >
            <HugeiconsIcon icon={Cancel01Icon} className="h-5 w-5" />
          </button>

          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-xl bg-primary/10 border border-primary/20">
              <HugeiconsIcon
                icon={Restaurant01Icon}
                className="h-5 w-5 text-primary"
              />
            </div>
            <h2 className="font-semibold text-xl text-foreground flex-1">
              {meta.planName}
            </h2>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {meta.planDescription}
          </p>
          <div className="flex items-center gap-2 mt-4">
            {isActivePlan && (
              <Badge
                variant="outline"
                className="bg-emerald-500/10 text-emerald-600 border-emerald-500/20 text-[10px] px-2 py-0.5 h-5 font-semibold"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-green-400 animate-pulse" />
                ACTIVE
              </Badge>
            )}
            <Badge variant="secondary" className="text-xs font-medium">
              <HugeiconsIcon icon={Target03Icon} className="h-3 w-3 mr-1" />
              {plan.targets.averageDailyCalories} cal
            </Badge>
            <Badge variant="secondary" className="text-xs font-medium">
              <HugeiconsIcon icon={Restaurant01Icon} className="h-3 w-3 mr-1" />
              {plan.structure.mealsPerDay} meals
            </Badge>
          </div>
          <button
            onClick={handleOverviewClick}
            className={cn(
              "mt-4 w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 focus-visible:outline-primary focus-visible:outline-1",
              viewMode === "overview"
                ? "bg-primary text-primary-foreground shadow-sm"
                : "bg-muted/50 text-foreground hover:bg-muted",
            )}
          >
            <HugeiconsIcon icon={BookOpen01Icon} className="h-4 w-4" />
            Plan Overview
          </button>
        </div>

        {/* Meal Types Navigation */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden bg-background">
          <div className="p-2.5">
            <div className="mb-2 px-2">
              <p className="text-[10px] font-semibold text-foreground/60 uppercase tracking-wider">
                Meal Templates
              </p>
            </div>
            {plan.meals.templates.map((template) => {
              const config = mealTypeConfig[template.mealType];
              const isExpanded = expandedMealTypes.has(template.mealType);
              const isSelected =
                viewMode === "meals" && selectedMealType === template.mealType;

              return (
                <div key={template.mealType} className="mb-1.5">
                  {/* Meal Type Header */}
                  <button
                    onClick={() => toggleMealType(template.mealType)}
                    className="w-full flex items-center gap-2.5 p-2.5 rounded-lg hover:bg-muted/50 transition-all duration-200 text-left group focus-visible:outline-primary focus-visible:outline-1"
                  >
                    <HugeiconsIcon
                      icon={isExpanded ? ChevronDown : ChevronRight}
                      className="h-4 w-4 text-foreground/50 group-hover:text-foreground/70 transition-colors"
                    />
                    <div
                      className={cn(
                        "flex items-center justify-center w-8 h-8 rounded-lg border shrink-0",
                        config.bg,
                        config.color,
                        "border-current/20",
                      )}
                    >
                      <HugeiconsIcon icon={config.icon} className="h-4 w-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm text-foreground truncate">
                        {config.label}
                      </p>
                      <p className="text-xs text-muted-foreground truncate leading-tight">
                        {template.mealOptions.length} options
                      </p>
                    </div>
                  </button>

                  {/* Meal Options List */}
                  {isExpanded && (
                    <div className="ml-7.5 space-y-0.5">
                      <button
                        onClick={() => handleMealSelect(template.mealType)}
                        className={cn(
                          "w-full flex items-center gap-2.5 p-2 rounded-lg transition-all duration-200 text-left focus-visible:outline-primary focus-visible:outline-1",
                          isSelected
                            ? "bg-primary text-primary-foreground shadow-sm"
                            : "hover:bg-muted/40",
                        )}
                      >
                        <div
                          className={cn(
                            "flex items-center justify-center w-7 h-7 rounded text-xs font-semibold shrink-0",
                            isSelected
                              ? "bg-primary-foreground/20"
                              : cn(config.bg, config.color),
                          )}
                        >
                          {template.mealOptions.length}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p
                            className={cn(
                              "font-medium text-xs truncate",
                              isSelected
                                ? "text-primary-foreground"
                                : "text-foreground",
                            )}
                          >
                            View All Options
                          </p>
                        </div>
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
