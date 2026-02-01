import { Day } from "@/lib/validators/workout-plan.validator";
import { cn } from "@/lib/shared/utils";
import { Badge } from "@/components/ui/badge";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Target01Icon,
  Dumbbell01Icon,
  WorkoutStretchingIcon,
  InformationCircleIcon,
  CheckmarkCircle01Icon,
  FireIcon,
} from "@hugeicons/core-free-icons";

type WorkoutPlanViewDialogContentProps = {
  currentDay: Day | undefined;
  selectedWeek: number;
  selectedDay: number;
};

const getRoleConfig = (role: string) => {
  switch (role) {
    case "main_lift":
      return {
        color: "text-rose-500",
        bg: "bg-rose-500/10",
        label: "Primary",
      };
    case "secondary":
      return {
        color: "text-orange-500",
        bg: "bg-orange-500/10",
        label: "Secondary",
      };
    case "accessory":
      return {
        color: "text-blue-500",
        bg: "bg-blue-500/10",
        label: "Accessory",
      };
    case "finisher":
      return {
        color: "text-purple-500",
        bg: "bg-purple-500/10",
        label: "Finisher",
      };
    default:
      return {
        color: "text-muted-foreground",
        bg: "bg-muted/50",
        label: role,
      };
  }
};

export function WorkoutPlanViewDialogContent({
  currentDay,
  selectedWeek,
  selectedDay,
}: WorkoutPlanViewDialogContentProps) {
  return (
    <>
      {/* Content Header */}
      <div className="p-6 border-b bg-linear-to-r from-card to-card/50">
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Week {selectedWeek} - Day {selectedDay}
              </span>
              {currentDay?.isRestDay && (
                <Badge
                  variant="outline"
                  className="bg-emerald-500/10 text-emerald-600 border-emerald-500/20 font-medium"
                >
                  Rest Day
                </Badge>
              )}
            </div>
            <h1 className="text-2xl font-semibold text-foreground mb-1">
              {currentDay?.dayLabel}
            </h1>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {currentDay?.focus}
            </p>
          </div>
        </div>

        {/* Quick Stats Bar */}
        {!currentDay?.isRestDay && (
          <div className="grid grid-cols-4 gap-3 mt-5">
            <div className="p-4 rounded-xl bg-linear-to-br from-muted/40 to-muted/20 text-center border">
              <p className="text-2xl font-semibold text-foreground">
                {currentDay?.workout?.length || 0}
              </p>
              <p className="text-[10px] text-muted-foreground font-medium uppercase tracking-wide mt-1">
                Exercises
              </p>
            </div>
            <div className="p-4 rounded-xl bg-linear-to-br from-muted/50 to-muted/30 text-center border shadow-sm">
              <p className="text-2xl font-bold text-foreground">
                {currentDay?.totalDurationMinutes}m
              </p>
              <p className="text-[10px] text-foreground/60 font-semibold uppercase tracking-wide mt-1">
                Duration
              </p>
            </div>
            <div className="p-4 rounded-xl bg-linear-to-br from-muted/50 to-muted/30 text-center border shadow-sm">
              <p className="text-2xl font-bold text-foreground">
                {currentDay?.warmup?.length || 0}
              </p>
              <p className="text-[10px] text-foreground/60 font-semibold uppercase tracking-wide mt-1">
                Warmup
              </p>
            </div>
            <div className="p-4 rounded-xl bg-linear-to-br from-muted/50 to-muted/30 text-center border shadow-sm">
              <p className="text-2xl font-bold text-foreground">
                {currentDay?.cooldown?.length || 0}
              </p>
              <p className="text-[10px] text-foreground/60 font-semibold uppercase tracking-wide mt-1">
                Cooldown
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden">
        <div className="p-6 space-y-6 h-full">
          {currentDay?.isRestDay ? (
            <div className="flex flex-col justify-center items-center h-full -mt-10">
              <div className="inline-flex p-6 rounded-full bg-emerald-500/10 mb-6">
                <HugeiconsIcon
                  icon={CheckmarkCircle01Icon}
                  className="h-20 w-20 text-emerald-500"
                />
              </div>
              <h3 className="text-2xl font-semibold mb-3 text-foreground">
                Rest & Recovery
              </h3>
            </div>
          ) : (
            <>
              {/* Session Intent */}
              {currentDay?.sessionIntent && (
                <div className="p-5 rounded-xl bg-linear-to-br from-primary/5 to-primary/10 border border-primary/20">
                  <div className="flex items-start gap-3">
                    <HugeiconsIcon
                      icon={Target01Icon}
                      className="h-5 w-5 text-primary shrink-0 mt-0.5"
                    />
                    <div>
                      <p className="text-xs font-semibold text-primary uppercase tracking-wider mb-2">
                        Today&apos;s Goal
                      </p>
                      <p className="text-sm text-foreground/90 leading-relaxed">
                        {currentDay.sessionIntent}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Warmup */}
              {currentDay?.warmup && currentDay.warmup.length > 0 && (
                <div className="space-y-3">
                  <div className="flex items-center gap-2.5">
                    <HugeiconsIcon
                      icon={FireIcon}
                      className="h-5 w-5 text-orange-500"
                    />
                    <h3 className="text-lg font-semibold text-foreground">
                      Warmup
                    </h3>
                    <Badge variant="secondary" className="font-medium text-xs">
                      {currentDay.warmup.length}
                    </Badge>
                  </div>
                  <div className="grid gap-3">
                    {currentDay.warmup.map((item, idx) => (
                      <div
                        key={idx}
                        className="p-5 rounded-xl border bg-linear-to-br from-orange-500/5 to-orange-500/10 border-orange-500/20"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex-1">
                            <h4 className="font-semibold text-sm text-foreground mb-1">
                              {item.name}
                            </h4>
                            <p className="text-xs text-muted-foreground leading-relaxed">
                              {item.focus}
                            </p>
                            {item.notes && (
                              <p className="text-xs text-foreground/60 mt-3 pt-3 border-t border-orange-500/20">
                                {item.notes}
                              </p>
                            )}
                          </div>
                          <Badge
                            variant="outline"
                            className="shrink-0 bg-orange-500/10 border-orange-500/20 font-semibold"
                          >
                            {item.durationMinutes} min
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Main Workout */}
              {currentDay?.workout && currentDay.workout.length > 0 && (
                <div className="space-y-3">
                  <div className="flex items-center gap-2.5">
                    <HugeiconsIcon
                      icon={Dumbbell01Icon}
                      className="h-5 w-5 text-primary"
                    />
                    <h3 className="text-lg font-semibold text-foreground">
                      Main Workout
                    </h3>
                    <Badge variant="secondary" className="font-medium text-xs">
                      {currentDay.workout.length}
                    </Badge>
                  </div>
                  <div className="space-y-4">
                    {currentDay.workout.map((exercise, idx) => {
                      const roleConfig = getRoleConfig(exercise.role);
                      return (
                        <div
                          key={idx}
                          className="p-6 rounded-xl border bg-card hover:shadow-sm transition-all duration-200"
                        >
                          {/* Exercise Header */}
                          <div className="flex items-start gap-4 mb-4">
                            <div className="flex items-center justify-center w-11 h-11 rounded-xl bg-primary/10 border border-primary/20 text-primary font-semibold text-lg shrink-0">
                              {idx + 1}
                            </div>
                            <div className="flex-1">
                              <h4 className="font-semibold text-lg text-foreground mb-2">
                                {exercise.exercise}
                              </h4>
                              <div className="flex items-center gap-2 flex-wrap">
                                <Badge
                                  variant="outline"
                                  className={cn(
                                    "text-xs font-medium",
                                    roleConfig.bg,
                                    roleConfig.color,
                                  )}
                                >
                                  {roleConfig.label}
                                </Badge>
                                <Badge
                                  variant="secondary"
                                  className="text-xs font-medium"
                                >
                                  {exercise.movementPattern}
                                </Badge>
                              </div>
                            </div>
                          </div>

                          {/* Stats Grid */}
                          <div className="grid grid-cols-4 gap-4 p-5 rounded-xl bg-linear-to-br from-muted/30 to-muted/10 mb-4 border">
                            <div className="text-center">
                              <p className="text-[10px] text-muted-foreground font-medium uppercase tracking-wide mb-1.5">
                                Sets
                              </p>
                              <p className="text-2xl font-semibold text-foreground">
                                {exercise.sets}
                              </p>
                            </div>
                            <div className="text-center">
                              <p className="text-[10px] text-foreground/60 font-semibold uppercase tracking-wide mb-1.5">
                                Reps
                              </p>
                              <p className="text-2xl font-bold text-foreground">
                                {exercise.reps}
                              </p>
                            </div>
                            <div className="text-center">
                              <p className="text-[10px] text-foreground/60 font-semibold uppercase tracking-wide mb-1.5">
                                Rest
                              </p>
                              <p className="text-2xl font-bold text-foreground">
                                {Math.floor(exercise.restSeconds / 60)}m
                              </p>
                            </div>
                            <div className="text-center">
                              <p className="text-[10px] text-foreground/60 font-semibold uppercase tracking-wide mb-1.5">
                                Tempo
                              </p>
                              <p className="text-2xl font-bold font-mono text-foreground">
                                {exercise.tempo}
                              </p>
                            </div>
                          </div>

                          {/* Intensity & Notes */}
                          {exercise.intensityGuidance && (
                            <div className="p-4 rounded-xl bg-linear-to-br from-blue-500/5 to-cyan-500/5 border border-blue-500/20 mb-3">
                              <div className="flex items-start gap-2.5">
                                <HugeiconsIcon
                                  icon={InformationCircleIcon}
                                  className="h-4 w-4 text-blue-500 mt-0.5 shrink-0"
                                />
                                <div>
                                  <p className="text-xs font-semibold text-blue-600 mb-1.5">
                                    {exercise.intensityGuidance.type}
                                  </p>
                                  <p className="text-sm text-foreground/90 leading-relaxed">
                                    {exercise.intensityGuidance.value}
                                  </p>
                                </div>
                              </div>
                            </div>
                          )}

                          {exercise.notes && (
                            <div className="p-4 rounded-xl bg-muted/30 border">
                              <p className="text-sm text-muted-foreground leading-relaxed">
                                <span className="font-bold">Note:</span>{" "}
                                {exercise.notes}
                              </p>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Cooldown */}
              {currentDay?.cooldown && currentDay.cooldown.length > 0 && (
                <div className="space-y-3">
                  <div className="flex items-center gap-2.5">
                    <HugeiconsIcon
                      icon={WorkoutStretchingIcon}
                      className="h-5 w-5 text-cyan-500"
                    />
                    <h3 className="text-lg font-semibold text-foreground">
                      Cooldown
                    </h3>
                    <Badge variant="secondary" className="font-medium text-xs">
                      {currentDay.cooldown.length}
                    </Badge>
                  </div>
                  <div className="grid gap-3">
                    {currentDay.cooldown.map((item, idx) => (
                      <div
                        key={idx}
                        className="p-5 rounded-xl border bg-linear-to-br from-cyan-500/5 to-cyan-500/10 border-cyan-500/20"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex-1">
                            <h4 className="font-bold text-sm text-foreground mb-1">
                              {item.name}
                            </h4>
                            <p className="text-xs text-foreground/70 leading-relaxed">
                              {item.focus}
                            </p>
                            {item.notes && (
                              <p className="text-xs text-foreground/60 mt-3 pt-3 border-t border-cyan-500/20">
                                {item.notes}
                              </p>
                            )}
                          </div>
                          <Badge
                            variant="outline"
                            className="shrink-0 bg-cyan-500/10 border-cyan-500/20 font-semibold"
                          >
                            {item.durationMinutes} min
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
}
