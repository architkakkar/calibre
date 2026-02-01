import { MealTemplate } from "@/lib/validators/nutrition-plan.validator";
import { Badge } from "@/components/ui/badge";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Sun02Icon,
  SunCloudIcon,
  Moon02Icon,
  StarIcon,
  Target01FreeIcons,
} from "@hugeicons/core-free-icons";

const mealTypeConfig: Record<
  string,
  {
    icon: typeof Sun02Icon;
    label: string;
    color: string;
    bg: string;
    borderColor: string;
    macroBorder: string;
    macroGradient: string;
    macroText: string;
  }
> = {
  breakfast: {
    icon: Sun02Icon,
    label: "Breakfast",
    color: "text-yellow-500",
    bg: "bg-yellow-500/10",
    borderColor: "border-yellow-500",
    macroBorder: "border-yellow-500/30",
    macroGradient: "from-yellow-600/2 to-yellow-500/2",
    macroText: "text-yellow-400",
  },
  lunch: {
    icon: SunCloudIcon,
    label: "Lunch",
    color: "text-blue-500",
    bg: "bg-blue-500/10",
    borderColor: "border-blue-500",
    macroBorder: "border-blue-500/30",
    macroGradient: "from-blue-950/15 to-blue-900/5",
    macroText: "text-blue-400",
  },
  dinner: {
    icon: Moon02Icon,
    label: "Dinner",
    color: "text-indigo-500",
    bg: "bg-indigo-500/10",
    borderColor: "border-indigo-500",
    macroBorder: "border-indigo-500/30",
    macroGradient: "from-indigo-950/15 to-indigo-900/5",
    macroText: "text-indigo-400",
  },
  snack: {
    icon: StarIcon,
    label: "Snack",
    color: "text-green-500",
    bg: "bg-green-500/10",
    borderColor: "border-green-500",
    macroBorder: "border-green-500/30",
    macroGradient: "from-green-950/15 to-green-900/5",
    macroText: "text-green-400",
  },
};

export function NutritionPlanViewDialogContent({
  currentMealTemplate,
}: {
  currentMealTemplate: MealTemplate | undefined | null;
}) {
  if (!currentMealTemplate) return null;

  const config = mealTypeConfig[currentMealTemplate.mealType];

  return (
    <>
      <div className="pl-18 lg:pl-5 p-5 border-b border-border bg-linear-to-r from-card/80 to-background">
        <div className="flex items-start gap-3">
          <div
            className={`p-2.5 rounded-xl border ${config.bg} ${config.color} border-current/20`}
          >
            <HugeiconsIcon icon={config.icon} className="h-5 w-5" />
          </div>
          <div className="flex-1">
            <h1 className="text-xl font-semibold text-foreground mb-1">
              {config.label}
            </h1>
            <p className="text-sm text-muted-foreground capitalize flex items-center gap-2">
              <HugeiconsIcon icon={Target01FreeIcons} className="h-4 w-4" />
              {currentMealTemplate.goal}
            </p>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto overflow-x-hidden">
        <div className="p-5 space-y-4">
          {currentMealTemplate.mealOptions.map((option, idx) => (
            <div
              key={idx}
              className="p-6 rounded-xl border border-border/50 bg-card shadow-sm hover:border-border/80 transition-colors"
            >
              <div className="flex items-start gap-4 mb-5 pb-5 border-b border-border/50">
                <div
                  className={`flex items-center justify-center w-12 h-12 rounded-xl ${config.bg} ${config.color} font-bold text-lg shrink-0 shadow-sm border border-current/20`}
                >
                  {idx + 1}
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-lg text-foreground mb-3">
                    {option.mealName}
                  </h3>

                  {/* Macros */}
                  <div className="grid grid-cols-4 gap-3">
                    <div
                      className={`text-center p-4 rounded-xl border ${config.macroBorder} bg-linear-to-br ${config.macroGradient}`}
                    >
                      <p className="text-2xl font-bold text-foreground mb-1">
                        {option.estimatedMacros.proteinGrams}g
                      </p>
                      <p
                        className={`text-xs ${config.macroText} uppercase tracking-wider font-semibold`}
                      >
                        Protein
                      </p>
                    </div>
                    <div
                      className={`text-center p-4 rounded-xl border ${config.macroBorder} bg-linear-to-br ${config.macroGradient}`}
                    >
                      <p className="text-2xl font-bold text-foreground mb-1">
                        {option.estimatedMacros.carbsGrams}g
                      </p>
                      <p
                        className={`text-xs ${config.macroText} uppercase tracking-wider font-semibold`}
                      >
                        Carbs
                      </p>
                    </div>
                    <div
                      className={`text-center p-4 rounded-xl border ${config.macroBorder} bg-linear-to-br ${config.macroGradient}`}
                    >
                      <p className="text-2xl font-bold text-foreground mb-1">
                        {option.estimatedMacros.fatsGrams}g
                      </p>
                      <p
                        className={`text-xs ${config.macroText} uppercase tracking-wider font-semibold`}
                      >
                        Fats
                      </p>
                    </div>
                    <div
                      className={`text-center p-4 rounded-xl border ${config.macroBorder} bg-linear-to-br ${config.macroGradient}`}
                    >
                      <p className="text-2xl font-bold text-foreground mb-1">
                        {option.estimatedMacros.calories}
                      </p>
                      <p
                        className={`text-xs ${config.macroText} uppercase tracking-wider font-semibold`}
                      >
                        Calories
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Foods List */}
              <div>
                <p className="text-xs font-semibold text-foreground/70 uppercase tracking-wider mb-3">
                  Ingredients
                </p>
                <div className="space-y-2">
                  {option.foods.map((food, foodIdx) => (
                    <div
                      key={foodIdx}
                      className={`flex items-start gap-3 p-3 rounded-lg border-l-2 ${config.borderColor} bg-muted/40`}
                    >
                      <div className="flex-1">
                        <div className="flex items-baseline gap-2 mb-1">
                          <span className="font-semibold text-sm text-foreground capitalize">
                            {food.name.replace(/_/g, " ")}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            -
                          </span>
                          <span className="text-xs text-foreground/90 font-medium">
                            {food.quantity}
                          </span>
                        </div>
                        {food.notes && (
                          <p className="text-xs text-muted-foreground leading-relaxed">
                            {food.notes}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
