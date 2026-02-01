import { Plan } from "@/lib/validators/workout-plan.validator";
import { Badge } from "@/components/ui/badge";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Activity01Icon,
  AlertCircleIcon,
  BookOpen01Icon,
  TrendingUp,
} from "@hugeicons/core-free-icons";

export function WorkoutPlanViewDialogOverview({ plan }: { plan: Plan }) {
  return (
    <>
      <div className="p-5 border-b border-border bg-linear-to-r from-card/80 to-background">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2.5 rounded-xl bg-primary/10 border border-primary/20">
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
              Complete guide to progression, substitutions, and recovery
            </p>
          </div>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto overflow-x-hidden">
        <div className="p-5 space-y-8">
          {/* Progression Strategy */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-blue-500/10">
                <HugeiconsIcon
                  icon={TrendingUp}
                  className="h-5 w-5 text-blue-500"
                />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-foreground">
                  Progression Strategy
                </h2>
                <p className="text-xs text-muted-foreground">
                  How you&apos;ll advance through the program
                </p>
              </div>
            </div>
            <div className="p-5 rounded-xl border bg-linear-to-br from-blue-500/5 to-cyan-500/5 border-blue-500/20">
              <p className="text-sm text-foreground/90 leading-relaxed mb-4">
                {plan.progressionSummary.strategy}
              </p>
              {plan.progressionSummary.notes.length > 0 && (
                <ul className="space-y-2.5 pt-4 pl-4 border-t border-blue-500/10 list-disc">
                  {plan.progressionSummary.notes.map(
                    (note: string, idx: number) => (
                      <li
                        key={idx}
                        className="text-sm text-foreground/80 list-item pl-1"
                      >
                        {note}
                      </li>
                    ),
                  )}
                </ul>
              )}
            </div>
          </div>
          {/* Recovery Guidance */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-emerald-500/10 ">
                <HugeiconsIcon
                  icon={Activity01Icon}
                  className="h-5 w-5 text-emerald-500"
                />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-foreground">
                  Recovery Guidance
                </h2>
                <p className="text-xs text-muted-foreground">
                  Rest and recuperation protocols
                </p>
              </div>
            </div>
            <div className="p-5 rounded-xl border bg-linear-to-br from-emerald-500/5 to-green-500/5 border-emerald-500/20">
              <div className="flex items-baseline gap-2.5 mb-4 pb-4 border-b border-emerald-500/10">
                <span className="text-3xl font-semibold text-foreground">
                  {plan.recoveryGuidance.recommendedRestDays}
                </span>
                <span className="text-sm text-muted-foreground font-medium">
                  rest days per week
                </span>
              </div>
              <div className="space-y-6">
                <div>
                  <p className="text-xs font-semibold text-emerald-600 uppercase tracking-wider mb-2">
                    Soreness Expectations
                  </p>
                  <p className="text-sm text-foreground/90 leading-relaxed">
                    {plan.recoveryGuidance.sorenessExpectations}
                  </p>
                </div>
                {plan.recoveryGuidance.mobilityFocus.length > 0 && (
                  <div>
                    <p className="text-xs font-semibold text-emerald-600 uppercase tracking-wider mb-2">
                      Mobility Focus Areas
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {plan.recoveryGuidance.mobilityFocus.map(
                        (area: string, idx: number) => (
                          <Badge
                            key={idx}
                            variant="outline"
                            className="bg-emerald-500/10 text-emerald-600 border-emerald-500/20 font-medium capitalize"
                          >
                            {area}
                          </Badge>
                        ),
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          {/* Important Notes */}
          {(plan.notes.safety.length > 0 || plan.notes.general.length > 0) && (
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-amber-500/10">
                  <HugeiconsIcon
                    icon={AlertCircleIcon}
                    className="h-5 w-5 text-amber-500"
                  />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-foreground">
                    Important Notes
                  </h2>
                  <p className="text-xs text-muted-foreground">
                    Safety guidelines and general information
                  </p>
                </div>
              </div>
              <div className="space-y-4">
                {plan.notes.safety.length > 0 && (
                  <div className="p-5 rounded-xl border bg-linear-to-br from-amber-500/5 to-red-500/5 border-amber-500/20">
                    <div className="flex items-center gap-2 mb-4">
                      <HugeiconsIcon
                        icon={AlertCircleIcon}
                        className="h-4 w-4 text-amber-600"
                      />
                      <p className="text-xs font-semibold text-amber-600 uppercase tracking-wider">
                        Safety Guidelines
                      </p>
                    </div>
                    <ul className="space-y-2.5 pl-4 list-disc">
                      {plan.notes.safety.map((note: string, idx: number) => (
                        <li
                          key={idx}
                          className="text-sm text-foreground/90 list-item pl-1"
                        >
                          {note}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {plan.notes.general.length > 0 && (
                  <div className="p-6 rounded-xl border bg-muted/30 border-muted-foreground/20">
                    <div className="flex items-center gap-2 mb-4">
                      <HugeiconsIcon
                        icon={AlertCircleIcon}
                        className="h-4 w-4 text-muted-foreground"
                      />
                      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                        General Information
                      </p>
                    </div>
                    <ul className="space-y-2.5 list-disc pl-4">
                      {plan.notes.general.map((note: string, idx: number) => (
                        <li
                          key={idx}
                          className="list-item pl-1 text-sm text-foreground/90"
                        >
                          {note}
                        </li>
                      ))}
                    </ul>
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
