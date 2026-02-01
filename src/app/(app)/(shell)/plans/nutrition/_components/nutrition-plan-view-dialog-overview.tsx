import { Plan } from "@/lib/validators/nutrition-plan.validator";
import { Badge } from "@/components/ui/badge";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Target03Icon,
  Clock01Icon,
  Activity03Icon,
  InformationCircleIcon,
  AlertCircleIcon,
  Restaurant01Icon,
  DollarCircleIcon,
  HeartCheckIcon,
  BookOpen01Icon,
} from "@hugeicons/core-free-icons";

export function NutritionPlanViewDialogOverview({ plan }: { plan: Plan }) {
  return (
    <>
      <div className="pl-18 lg:pl-5 p-5 border-b border-border bg-linear-to-r from-card/80 to-background">
        <div className="flex items-start gap-3 mb-2">
          <div className="p-2.5 mt-1 rounded-xl bg-primary/10 border border-primary/20">
            <HugeiconsIcon
              icon={BookOpen01Icon}
              className="h-5 w-5 text-primary"
            />
          </div>
          <div>
            <h1 className="text-[21px] font-semibold text-foreground">
              Nutrition Plan Overview
            </h1>
            <p className="text-sm text-muted-foreground">
              Complete guide to your nutrition strategy
            </p>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto overflow-x-hidden">
        <div className="p-5 space-y-8">
          {/* Daily Targets */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-primary/10">
                <HugeiconsIcon
                  icon={Target03Icon}
                  className="h-5 w-5 text-primary"
                />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-foreground">
                  Daily Targets
                </h2>
                <p className="text-xs text-muted-foreground">
                  Your personalized calorie and macro targets
                </p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="p-5 rounded-xl border bg-linear-to-br from-muted/50 to-muted/30 shadow-sm">
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                  Average Daily
                </p>
                <p className="text-3xl font-bold text-foreground">
                  {plan.targets.averageDailyCalories}
                </p>
                <p className="text-xs text-muted-foreground mt-1">calories</p>
              </div>
              <div className="p-5 rounded-xl border bg-linear-to-br from-blue-500/5 to-blue-500/10 shadow-sm">
                <p className="text-xs font-semibold text-blue-600 uppercase tracking-wider mb-2">
                  Training Days
                </p>
                <p className="text-3xl font-bold text-foreground">
                  {plan.targets.trainingDayCalories}
                </p>
                <p className="text-xs text-muted-foreground mt-1">calories</p>
              </div>
              <div className="p-5 rounded-xl border bg-linear-to-br from-green-500/5 to-green-500/10 shadow-sm">
                <p className="text-xs font-semibold text-green-600 uppercase tracking-wider mb-2">
                  Rest Days
                </p>
                <p className="text-3xl font-bold text-foreground">
                  {plan.targets.restDayCalories}
                </p>
                <p className="text-xs text-muted-foreground mt-1">calories</p>
              </div>
            </div>

            <div className="p-5 rounded-xl border bg-card shadow-sm">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-4">
                Macro Targets
              </p>
              <div className="grid grid-cols-4 gap-6">
                <div className="text-center">
                  <p className="text-2xl font-bold text-foreground mb-1">
                    {plan.targets.macros.proteinGrams}g
                  </p>
                  <p className="text-xs text-muted-foreground">Protein</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-foreground mb-1">
                    {plan.targets.macros.carbsGrams}g
                  </p>
                  <p className="text-xs text-muted-foreground">Carbs</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-foreground mb-1">
                    {plan.targets.macros.fatsGrams}g
                  </p>
                  <p className="text-xs text-muted-foreground">Fats</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-foreground mb-1">
                    {plan.targets.macros.calories}
                  </p>
                  <p className="text-xs text-muted-foreground">Calories</p>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-border">
                <p className="text-sm text-foreground/90 leading-relaxed">
                  <span className="font-semibold">Strategy:</span>{" "}
                  {plan.targets.macroStrategy}
                </p>
              </div>
            </div>
          </div>

          {/* Plan Structure */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-blue-500/10">
                <HugeiconsIcon
                  icon={Clock01Icon}
                  className="h-5 w-5 text-blue-500"
                />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-foreground">
                  Plan Structure
                </h2>
                <p className="text-xs text-muted-foreground">
                  How your meals are organized
                </p>
              </div>
            </div>

            <div className="grid gap-4">
              <div className="p-5 rounded-xl border bg-card shadow-sm">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-blue-500/10">
                    <HugeiconsIcon
                      icon={Restaurant01Icon}
                      className="h-5 w-5 text-blue-500"
                    />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-sm text-foreground mb-1">
                      Meals Per Day
                    </p>
                    <p className="text-sm text-foreground/90">
                      {plan.structure.mealsPerDay} meals
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-5 rounded-xl border bg-card shadow-sm">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-purple-500/10">
                    <HugeiconsIcon
                      icon={Clock01Icon}
                      className="h-5 w-5 text-purple-500"
                    />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-sm text-foreground mb-1">
                      Meal Timing Strategy
                    </p>
                    <p className="text-sm text-foreground/90 leading-relaxed">
                      {plan.structure.mealTimingStrategy}
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-5 rounded-xl border bg-card shadow-sm">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-cyan-500/10">
                    <HugeiconsIcon
                      icon={Activity03Icon}
                      className="h-5 w-5 text-cyan-500"
                    />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-sm text-foreground mb-1">
                      Hydration Guidelines
                    </p>
                    <p className="text-sm text-foreground/90 leading-relaxed">
                      {plan.structure.hydrationGuidelines}
                    </p>
                  </div>
                </div>
              </div>

              {plan.structure.supplementGuidance && (
                <div className="p-5 rounded-xl border bg-card shadow-sm">
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-amber-500/10">
                      <HugeiconsIcon
                        icon={InformationCircleIcon}
                        className="h-5 w-5 text-amber-500"
                      />
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-sm text-foreground mb-1">
                        Supplement Guidance
                      </p>
                      <p className="text-sm text-foreground/90 leading-relaxed">
                        {plan.structure.supplementGuidance}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Adjustment Rules */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-orange-500/10">
                <HugeiconsIcon
                  icon={Activity03Icon}
                  className="h-5 w-5 text-orange-500"
                />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-foreground">
                  Progress Adjustments
                </h2>
                <p className="text-xs text-muted-foreground">
                  How your plan adapts to your progress
                </p>
              </div>
            </div>

            <div className="p-5 rounded-xl border bg-muted/30 mb-4">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                Check-In Metrics
              </p>
              <div className="flex flex-wrap gap-2">
                {plan.adjustments.checkInMetrics.map((metric, idx) => (
                  <Badge key={idx} variant="secondary" className="font-medium">
                    {metric.replace(/([A-Z])/g, " $1").trim()}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              {plan.adjustments.rules.map((rule, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-xl border bg-card shadow-sm"
                >
                  <div className="space-y-3">
                    <div>
                      <p className="text-xs font-semibold text-orange-500 uppercase tracking-wider mb-1">
                        If
                      </p>
                      <p className="text-sm text-foreground/90">{rule.if}</p>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-green-500 uppercase tracking-wider mb-1">
                        Then
                      </p>
                      <p className="text-sm text-foreground/90">{rule.then}</p>
                    </div>
                    <div className="pt-3 border-t border-border">
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        <span className="font-semibold">Why:</span>{" "}
                        {rule.reasoning}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Flexibility */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-green-500/10">
                <HugeiconsIcon
                  icon={Restaurant01Icon}
                  className="h-5 w-5 text-green-500"
                />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-foreground">
                  Flexibility & Lifestyle
                </h2>
                <p className="text-xs text-muted-foreground">
                  Making the plan work for your life
                </p>
              </div>
            </div>

            <div className="p-5 rounded-xl border bg-card shadow-sm">
              <div className="flex items-start gap-3 mb-4">
                <div className="p-2 rounded-lg bg-green-500/10">
                  <HugeiconsIcon
                    icon={Restaurant01Icon}
                    className="h-5 w-5 text-green-500"
                  />
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-sm text-foreground mb-1">
                    Eating Out
                  </p>
                  <p className="text-sm text-foreground/90 mb-3">
                    Recommended frequency:{" "}
                    <span className="font-semibold">
                      {plan.flexibility.eatingOut.frequency}
                    </span>
                  </p>
                  <ul className="space-y-2">
                    {plan.flexibility.eatingOut.rules.map((rule, idx) => (
                      <li
                        key={idx}
                        className="flex items-start gap-2 text-sm text-foreground/90"
                      >
                        <span className="text-green-500 mt-0.5 font-semibold">
                          -
                        </span>
                        <span>{rule}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {plan.flexibility.budgetTips.length > 0 && (
              <div className="p-5 rounded-xl border bg-card shadow-sm">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-amber-500/10">
                    <HugeiconsIcon
                      icon={DollarCircleIcon}
                      className="h-5 w-5 text-amber-500"
                    />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-sm text-foreground mb-3">
                      Budget Tips
                    </p>
                    <ul className="space-y-2">
                      {plan.flexibility.budgetTips.map((tip, idx) => (
                        <li
                          key={idx}
                          className="flex items-start gap-2 text-sm text-foreground/90"
                        >
                          <span className="text-amber-500 mt-0.5 font-semibold">
                            -
                          </span>
                          <span>{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Health Considerations */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-red-500/10">
                <HugeiconsIcon
                  icon={HeartCheckIcon}
                  className="h-5 w-5 text-red-500"
                />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-foreground">
                  Health & Safety
                </h2>
                <p className="text-xs text-muted-foreground">
                  Important health considerations
                </p>
              </div>
            </div>

            {plan.health.allergiesExcluded.length > 0 && (
              <div className="p-5 rounded-xl border bg-red-500/5 border-red-500/20 shadow-sm">
                <p className="text-xs font-semibold text-red-600 uppercase tracking-wider mb-2">
                  Allergies Excluded
                </p>
                <div className="flex flex-wrap gap-2">
                  {plan.health.allergiesExcluded.map((allergy, idx) => (
                    <Badge
                      key={idx}
                      variant="outline"
                      className="bg-red-500/10 text-red-600 border-red-500/20"
                    >
                      {allergy}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {plan.health.medicalNotes.length > 0 && (
              <div className="p-5 rounded-xl border bg-card shadow-sm">
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                  Medical Notes
                </p>
                <ul className="space-y-2">
                  {plan.health.medicalNotes.map((note, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-2 text-sm text-foreground/90"
                    >
                      <HugeiconsIcon
                        icon={InformationCircleIcon}
                        className="h-4 w-4 text-blue-500 mt-0.5 shrink-0"
                      />
                      <span>{note}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {plan.health.digestiveTip && (
              <div className="p-5 rounded-xl border bg-card shadow-sm">
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                  Digestive Health
                </p>
                <p className="text-sm text-foreground/90 leading-relaxed">
                  {plan.health.digestiveTip}
                </p>
              </div>
            )}

            {plan.health.safetyNote && (
              <div className="p-5 rounded-xl border bg-amber-500/5 border-amber-500/20 shadow-sm">
                <div className="flex items-start gap-3">
                  <HugeiconsIcon
                    icon={AlertCircleIcon}
                    className="h-5 w-5 text-amber-500 mt-0.5 shrink-0"
                  />
                  <div>
                    <p className="text-xs font-semibold text-amber-600 uppercase tracking-wider mb-2">
                      Safety Note
                    </p>
                    <p className="text-sm text-foreground/90 leading-relaxed">
                      {plan.health.safetyNote}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Important Notes */}
          {(plan.notes.adherenceTips.length > 0 ||
            plan.notes.commonMistakes.length > 0 ||
            plan.notes.general) && (
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-blue-500/10">
                  <HugeiconsIcon
                    icon={InformationCircleIcon}
                    className="h-5 w-5 text-blue-500"
                  />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-foreground">
                    Important Notes
                  </h2>
                  <p className="text-xs text-muted-foreground">
                    Tips for success and common pitfalls
                  </p>
                </div>
              </div>

              {plan.notes.adherenceTips.length > 0 && (
                <div className="p-5 rounded-xl border bg-card shadow-sm">
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                    Adherence Tips
                  </p>
                  <ul className="space-y-2">
                    {plan.notes.adherenceTips.map((tip, idx) => (
                      <li
                        key={idx}
                        className="flex items-start gap-2 text-sm text-foreground/90"
                      >
                        <span className="text-primary mt-0.5 font-semibold">
                          -
                        </span>
                        <span>{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {plan.notes.commonMistakes.length > 0 && (
                <div className="p-5 rounded-xl border bg-amber-500/5 border-amber-500/20 shadow-sm">
                  <div className="flex items-start gap-3 mb-3">
                    <HugeiconsIcon
                      icon={AlertCircleIcon}
                      className="h-5 w-5 text-amber-500 shrink-0"
                    />
                    <p className="text-xs font-semibold text-amber-600 uppercase tracking-wider">
                      Common Mistakes to Avoid
                    </p>
                  </div>
                  <ul className="space-y-2 ml-8">
                    {plan.notes.commonMistakes.map((mistake, idx) => (
                      <li
                        key={idx}
                        className="flex items-start gap-2 text-sm text-foreground/90"
                      >
                        <span className="text-amber-500 mt-0.5 font-semibold">
                          -
                        </span>
                        <span>{mistake}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {plan.notes.general && (
                <div className="p-6 rounded-xl border bg-muted/30 border-muted-foreground/20">
                  <p className="text-sm text-foreground/90 leading-relaxed">
                    {plan.notes.general}
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
