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
              Plan Overview
            </h1>
            <p className="text-sm text-muted-foreground">
              Complete guide to your nutrition strategy
            </p>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto overflow-x-hidden">
        <div className="p-5 space-y-6">
          {/* Daily Targets - Full Width */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-linear-to-br from-primary/15 to-primary/10">
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

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="p-4 rounded-xl border border-blue-900/30 bg-linear-to-br from-blue-950/30 to-blue-900/10 shadow-sm">
                <p className="text-xs font-semibold text-blue-400 uppercase tracking-wider mb-1.5">
                  Average Daily
                </p>
                <p className="text-2xl font-bold text-foreground">
                  {plan.targets.averageDailyCalories}
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">calories</p>
              </div>
              <div className="p-4 rounded-xl border border-rose-900/30 bg-linear-to-br from-rose-950/30 to-rose-900/10 shadow-sm">
                <p className="text-xs font-semibold text-rose-400 uppercase tracking-wider mb-1.5">
                  Training Days
                </p>
                <p className="text-2xl font-bold text-foreground">
                  {plan.targets.trainingDayCalories}
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">calories</p>
              </div>
              <div className="p-4 rounded-xl border border-emerald-900/30 bg-linear-to-br from-emerald-950/30 to-emerald-900/10 shadow-sm">
                <p className="text-xs font-semibold text-emerald-400 uppercase tracking-wider mb-1.5">
                  Rest Days
                </p>
                <p className="text-2xl font-bold text-foreground">
                  {plan.targets.restDayCalories}
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">calories</p>
              </div>
            </div>

            <div className="p-4 rounded-xl border border-yellow-500/30 bg-linear-to-br from-yellow-600/10 to-yellow-700/10 shadow-sm">
              <p className="text-xs font-semibold text-yellow-400 uppercase tracking-wider mb-3">
                Macro Targets
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="text-center">
                  <p className="text-xl font-bold text-foreground mb-0.5">
                    {plan.targets.macros.proteinGrams}g
                  </p>
                  <p className="text-xs text-muted-foreground">Protein</p>
                </div>
                <div className="text-center">
                  <p className="text-xl font-bold text-foreground mb-0.5">
                    {plan.targets.macros.carbsGrams}g
                  </p>
                  <p className="text-xs text-muted-foreground">Carbs</p>
                </div>
                <div className="text-center">
                  <p className="text-xl font-bold text-foreground mb-0.5">
                    {plan.targets.macros.fatsGrams}g
                  </p>
                  <p className="text-xs text-muted-foreground">Fats</p>
                </div>
                <div className="text-center">
                  <p className="text-xl font-bold text-foreground mb-0.5">
                    {plan.targets.macros.calories}
                  </p>
                  <p className="text-xs text-muted-foreground">Calories</p>
                </div>
              </div>
              <div className="mt-3 pt-3 border-t border-yellow-500/30">
                <p className="text-sm text-foreground/90 leading-relaxed">
                  <span className="font-semibold">Strategy:</span>{" "}
                  {plan.targets.macroStrategy}
                </p>
              </div>
            </div>
          </div>

          {/* Plan Structure */}
          <div className="rounded-xl border border-purple-900/30 bg-card overflow-hidden shadow-sm">
            <div className="border-l-4 border-purple-500 bg-linear-to-r from-purple-500/8 to-transparent px-5 py-4">
              <div className="flex items-center gap-3">
                <HugeiconsIcon
                  icon={Clock01Icon}
                  className="h-5 w-5 text-purple-400"
                />
                <div>
                  <h2 className="text-lg font-semibold text-foreground">
                    Plan Structure
                  </h2>
                  <p className="text-xs text-muted-foreground">
                    How your meals are organized
                  </p>
                </div>
              </div>
            </div>
            <div className="p-5 grid grid-cols-1 grid-rows-4 md:grid-cols-2 md:grid-rows-2 gap-4">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-purple-500/10 shrink-0">
                  <HugeiconsIcon
                    icon={Restaurant01Icon}
                    className="h-4 w-4 text-purple-400"
                  />
                </div>
                <div>
                  <p className="font-semibold text-sm text-foreground mb-1">
                    Meals Per Day
                  </p>
                  <p className="text-sm text-foreground/90">
                    {plan.structure.mealsPerDay} meals
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-purple-500/10 shrink-0">
                  <HugeiconsIcon
                    icon={Activity03Icon}
                    className="h-4 w-4 text-purple-400"
                  />
                </div>
                <div>
                  <p className="font-semibold text-sm text-foreground mb-1">
                    Hydration Guidelines
                  </p>
                  <p className="text-sm text-foreground/90 leading-relaxed">
                    {plan.structure.hydrationGuidelines}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-purple-500/10 shrink-0">
                  <HugeiconsIcon
                    icon={Clock01Icon}
                    className="h-4 w-4 text-purple-400"
                  />
                </div>
                <div>
                  <p className="font-semibold text-sm text-foreground mb-1">
                    Meal Timing Strategy
                  </p>
                  <p className="text-sm text-foreground/90 leading-relaxed">
                    {plan.structure.mealTimingStrategy}
                  </p>
                </div>
              </div>
              {plan.structure.supplementGuidance && (
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-purple-500/10 shrink-0">
                    <HugeiconsIcon
                      icon={InformationCircleIcon}
                      className="h-4 w-4 text-purple-400"
                    />
                  </div>
                  <div>
                    <p className="font-semibold text-sm text-foreground mb-1">
                      Supplement Guidance
                    </p>
                    <p className="text-sm text-foreground/90 leading-relaxed">
                      {plan.structure.supplementGuidance}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Progress Adjustments */}
          <div className="rounded-xl border border-indigo-900/30 bg-card overflow-hidden shadow-sm">
            <div className="border-l-4 border-indigo-500 bg-linear-to-r from-indigo-500/8 to-transparent px-5 py-4">
              <div className="flex items-center gap-3">
                <HugeiconsIcon
                  icon={Activity03Icon}
                  className="h-5 w-5 text-indigo-400"
                />
                <div>
                  <h2 className="text-lg font-semibold text-foreground">
                    Progress Adjustments
                  </h2>
                  <p className="text-xs text-muted-foreground">
                    How your plan adapts to your progress
                  </p>
                </div>
              </div>
            </div>
            <div className="p-5 space-y-4">
              <div>
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                  Check-In Metrics
                </p>
                <div className="flex flex-wrap gap-2">
                  {plan.adjustments.checkInMetrics.map((metric, idx) => (
                    <Badge
                      key={idx}
                      variant="outline"
                      className="font-medium text-xs bg-indigo-500/10 text-indigo-400 border-indigo-500/20 capitalize"
                    >
                      {metric.replace(/([A-Z])/g, " $1").trim()}
                    </Badge>
                  ))}
                </div>
              </div>
              <div className="space-y-3 pt-2">
                {plan.adjustments.rules.map((rule, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-lg border border-indigo-900/30 bg-indigo-950/8"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div>
                        <p className="text-xs font-semibold text-indigo-400 uppercase tracking-wider mb-1.5">
                          If
                        </p>
                        <p className="text-sm text-foreground/90">{rule.if}</p>
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-indigo-400 uppercase tracking-wider mb-1.5">
                          Then
                        </p>
                        <p className="text-sm text-foreground/90">
                          {rule.then}
                        </p>
                      </div>
                      <div className="md:col-span-2 pt-2 border-t border-border/50">
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
          </div>

          {/* Flexibility & Lifestyle */}
          <div className="rounded-xl border border-emerald-900/30 bg-card overflow-hidden shadow-sm">
            <div className="border-l-4 border-emerald-500 bg-linear-to-r from-emerald-500/8 to-transparent px-5 py-4">
              <div className="flex items-center gap-3">
                <HugeiconsIcon
                  icon={Restaurant01Icon}
                  className="h-5 w-5 text-emerald-400"
                />
                <div>
                  <h2 className="text-lg font-semibold text-foreground">
                    Flexibility & Lifestyle
                  </h2>
                  <p className="text-xs text-muted-foreground">
                    Making the plan work for your life
                  </p>
                </div>
              </div>
            </div>
            <div className="p-5 grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <HugeiconsIcon
                    icon={Restaurant01Icon}
                    className="h-4 w-4 text-emerald-600 dark:text-emerald-400 shrink-0"
                  />
                  <div className="flex gap-1.5">
                    <p className="font-semibold text-sm text-foreground">
                      Eating Out
                    </p>
                    <p className="text-sm text-foreground/90">
                      ({plan.flexibility.eatingOut.frequency})
                    </p>
                  </div>
                </div>
                <ul className="space-y-1.5 ml-7 list-disc">
                  {plan.flexibility.eatingOut.rules.map((rule, idx) => (
                    <li
                      key={idx}
                      className="list-item text-sm text-emerald-600"
                    >
                      <span className="text-foreground/90">{rule}</span>
                    </li>
                  ))}
                </ul>
              </div>
              {plan.flexibility.budgetTips.length > 0 && (
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <HugeiconsIcon
                      icon={DollarCircleIcon}
                      className="h-4 w-4 text-emerald-400 shrink-0"
                    />
                    <p className="font-semibold text-sm text-foreground">
                      Budget Tips
                    </p>
                  </div>
                  <ul className="space-y-1.5 ml-7 list-disc">
                    {plan.flexibility.budgetTips.map((tip, idx) => (
                      <li
                        key={idx}
                        className="list-item text-sm text-emerald-600"
                      >
                        <span className="text-foreground/90">{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>

          {/* Health & Safety */}
          <div className="rounded-xl border border-red-900/30 bg-card overflow-hidden shadow-sm">
            <div className="border-l-4 border-red-500 bg-linear-to-r from-red-500/8 to-transparent px-5 py-4">
              <div className="flex items-center gap-3">
                <HugeiconsIcon
                  icon={HeartCheckIcon}
                  className="h-5 w-5 text-red-400"
                />
                <div>
                  <h2 className="text-lg font-semibold text-foreground">
                    Health & Safety
                  </h2>
                  <p className="text-xs text-muted-foreground">
                    Important health considerations
                  </p>
                </div>
              </div>
            </div>
            <div className="p-5 space-y-6">
              {plan.health.allergiesExcluded.length > 0 && (
                <div>
                  <p className="text-xs font-semibold text-red-400 uppercase tracking-wider mb-3">
                    Allergies Excluded
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {plan.health.allergiesExcluded.map((allergy, idx) => (
                      <Badge
                        key={idx}
                        variant="outline"
                        className="bg-red-950/40 text-red-400 border-red-800/70 text-xs capitalize"
                      >
                        {allergy}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
              {plan.health.medicalNotes.length > 0 && (
                <div className="pl-4 border-l-2 border-red-500">
                  <p className="text-xs font-semibold text-red-400 uppercase tracking-wider mb-3">
                    Medical Notes
                  </p>
                  <ul className="space-y-2.5">
                    {plan.health.medicalNotes.map((note, idx) => (
                      <li
                        key={idx}
                        className="flex items-start gap-3 text-sm text-foreground/90"
                      >
                        <HugeiconsIcon
                          icon={InformationCircleIcon}
                          className="h-4 w-4 text-red-400 mt-0.5 shrink-0"
                        />
                        <span>{note}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {plan.health.digestiveTip && (
                <div className="pl-4 border-l-2 border-red-500">
                  <p className="text-xs font-semibold text-red-400 uppercase tracking-wider mb-3">
                    Digestive Health
                  </p>
                  <div className="flex items-start gap-3 text-sm text-foreground/90">
                    <HugeiconsIcon
                      icon={HeartCheckIcon}
                      className="h-4 w-4 text-red-400 mt-0.5 shrink-0"
                    />
                    <p className="leading-relaxed">
                      {plan.health.digestiveTip}
                    </p>
                  </div>
                </div>
              )}
              {plan.health.safetyNote && (
                <div className="p-4 rounded-lg border border-red-900/30 bg-red-950/20">
                  <div className="flex items-start gap-3">
                    <HugeiconsIcon
                      icon={AlertCircleIcon}
                      className="h-5 w-5 text-red-400 mt-0.5 shrink-0"
                    />
                    <div>
                      <p className="text-xs font-semibold text-red-400 uppercase tracking-wider mb-2">
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
          </div>

          {/* Important Notes */}
          {(plan.notes.adherenceTips.length > 0 ||
            plan.notes.commonMistakes.length > 0 ||
            plan.notes.general) && (
            <div className="rounded-xl border border-blue-900/30 bg-card overflow-hidden shadow-sm">
              <div className="border-l-4 border-blue-500 bg-linear-to-r from-blue-500/8 to-transparent px-5 py-4">
                <div className="flex items-center gap-3">
                  <HugeiconsIcon
                    icon={InformationCircleIcon}
                    className="h-5 w-5 text-blue-400"
                  />
                  <div>
                    <h2 className="text-lg font-semibold text-foreground">
                      Important Notes
                    </h2>
                    <p className="text-xs text-muted-foreground">
                      Tips for success and common pitfalls
                    </p>
                  </div>
                </div>
              </div>
              <div className="p-5 space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {plan.notes.adherenceTips.length > 0 && (
                    <div>
                      <p className="text-xs font-semibold text-blue-400 uppercase tracking-wider mb-3">
                        Adherence Tips
                      </p>
                      <ul className="space-y-2 list-disc ml-3.5">
                        {plan.notes.adherenceTips.map((tip, idx) => (
                          <li
                            key={idx}
                            className="list-item text-sm text-blue-400"
                          >
                            <span className="text-foreground/90">{tip}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {plan.notes.commonMistakes.length > 0 && (
                    <div>
                      <p className="text-xs font-semibold text-blue-400 uppercase tracking-wider mb-3">
                        Common Mistakes to Avoid
                      </p>
                      <ul className="space-y-2 list-disc ml-3.5">
                        {plan.notes.commonMistakes.map((mistake, idx) => (
                          <li
                            key={idx}
                            className="list-item text-sm text-blue-400"
                          >
                            <span className="text-foreground/90">
                              {mistake}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
                {plan.notes.general && (
                  <div className="p-4 rounded-lg bg-blue-950/20 border border-blue-900/30">
                    <p className="text-sm text-foreground/90 leading-relaxed">
                      {plan.notes.general}
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
