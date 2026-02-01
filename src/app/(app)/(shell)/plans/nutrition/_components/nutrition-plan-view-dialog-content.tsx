import { MealTemplate } from "@/lib/validators/nutrition-plan.validator";
import { Badge } from "@/components/ui/badge";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Sun02Icon,
  SunCloudIcon,
  Moon02Icon,
  StarIcon,
} from "@hugeicons/core-free-icons";

const mealTypeConfig: Record<
  string,
  { icon: typeof Sun02Icon; label: string; color: string; bg: string }
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
        <div className="flex items-start gap-3 mb-2">
          <div
            className={`p-2.5 mt-1 rounded-xl border ${config.bg} ${config.color} border-current/20`}
          >
            <HugeiconsIcon icon={config.icon} className="h-5 w-5" />
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                {config.label}
              </span>
              <Badge variant="secondary" className="text-xs font-medium">
                {currentMealTemplate.mealOptions.length} Options
              </Badge>
            </div>
            <h1 className="text-[21px] font-semibold text-foreground">
              Meal Templates
            </h1>
            <p className="text-sm text-muted-foreground">
              {currentMealTemplate.goal}
            </p>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto overflow-x-hidden">
        <div className="p-5 space-y-4">
          {currentMealTemplate.mealOptions.map((option, idx) => (
            <div key={idx} className="p-6 rounded-xl border bg-card shadow-sm">
              <div className="flex items-start gap-4 mb-5 pb-5 border-b border-border">
                <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-primary/20 text-primary font-bold text-lg shrink-0 shadow-sm">
                  {idx + 1}
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-lg text-foreground mb-3">
                    {option.mealName}
                  </h3>

                  {/* Macros */}
                  <div className="grid grid-cols-4 gap-3">
                    <div className="text-center p-3 rounded-lg bg-muted/50">
                      <p className="text-xl font-bold text-foreground">
                        {option.estimatedMacros.proteinGrams}g
                      </p>
                      <p className="text-[10px] text-muted-foreground uppercase tracking-wide mt-1">
                        Protein
                      </p>
                    </div>
                    <div className="text-center p-3 rounded-lg bg-muted/50">
                      <p className="text-xl font-bold text-foreground">
                        {option.estimatedMacros.carbsGrams}g
                      </p>
                      <p className="text-[10px] text-muted-foreground uppercase tracking-wide mt-1">
                        Carbs
                      </p>
                    </div>
                    <div className="text-center p-3 rounded-lg bg-muted/50">
                      <p className="text-xl font-bold text-foreground">
                        {option.estimatedMacros.fatsGrams}g
                      </p>
                      <p className="text-[10px] text-muted-foreground uppercase tracking-wide mt-1">
                        Fats
                      </p>
                    </div>
                    <div className="text-center p-3 rounded-lg bg-muted/50">
                      <p className="text-xl font-bold text-foreground">
                        {option.estimatedMacros.calories}
                      </p>
                      <p className="text-[10px] text-muted-foreground uppercase tracking-wide mt-1">
                        Calories
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Foods List */}
              <div>
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                  Ingredients
                </p>
                <div className="space-y-2">
                  {option.foods.map((food, foodIdx) => (
                    <div
                      key={foodIdx}
                      className="flex items-start gap-3 p-3 rounded-lg bg-muted/30"
                    >
                      <span className="text-primary mt-0.5 font-bold">•</span>
                      <div className="flex-1">
                        <div className="flex items-baseline gap-2 mb-1">
                          <span className="font-semibold text-sm text-foreground">
                            {food.name}
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
