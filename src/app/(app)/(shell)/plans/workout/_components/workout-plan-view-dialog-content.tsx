"use client";

import { Day } from "@/lib/validators/workout-plan.validator";
import { cn } from "@/lib/shared/utils";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Target01Icon,
  Dumbbell01Icon,
  WorkoutStretchingIcon,
  InformationCircleIcon,
  CheckmarkCircle01Icon,
  FireIcon,
  Time02Icon,
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
  const hasWarmup = currentDay?.warmup && currentDay.warmup.length > 0;
  const hasWorkout = currentDay?.workout && currentDay.workout.length > 0;
  const hasCooldown = currentDay?.cooldown && currentDay.cooldown.length > 0;
  const defaultTab = hasWorkout ? "workout" : hasWarmup ? "warmup" : "cooldown";

  return (
    <>
      {/* Header */}
      <header className="p-5 border-b bg-linear-to-r from-card to-card/50">
        <div className="flex items-start justify-between mb-4">
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
            <h1 className="text-xl font-semibold text-foreground">
              {currentDay?.dayLabel}
            </h1>
          </div>
        </div>
        {!currentDay?.isRestDay && (
          <div className="flex items-center gap-2 flex-wrap">
            <Badge
              variant="secondary"
              className="text-xs font-medium bg-primary/10 text-primary border-primary/20 px-2.5 py-1"
            >
              <HugeiconsIcon icon={Time02Icon} className="h-3.5 w-3.5 mr-1.5" />
              {currentDay?.totalDurationMinutes}m Duration
            </Badge>
            <Badge
              variant="secondary"
              className="text-xs font-medium bg-primary/10 text-primary border-primary/20 px-2.5 py-1"
            >
              <HugeiconsIcon
                icon={Dumbbell01Icon}
                className="h-3.5 w-3.5 mr-1.5"
              />
              {currentDay?.workout?.length || 0} Exercises
            </Badge>
            {hasWarmup && (
              <Badge
                variant="outline"
                className="text-xs font-medium bg-primary/10 text-primary border-primary/20 px-2.5 py-1"
              >
                <HugeiconsIcon icon={FireIcon} className="h-3.5 w-3.5 mr-1.5" />
                {currentDay?.warmup?.length} Warmup
              </Badge>
            )}
            {hasCooldown && (
              <Badge
                variant="outline"
                className="text-xs font-medium bg-primary/10 text-primary border-primary/20 px-2.5 py-1"
              >
                <HugeiconsIcon
                  icon={WorkoutStretchingIcon}
                  className="h-3.5 w-3.5 mr-1.5"
                />
                {currentDay?.cooldown?.length} Cooldown
              </Badge>
            )}
            {currentDay?.sessionIntent && (
              <>
                <div className="h-1 w-1 rounded-full bg-primary/40 mx-2" />
                <div className="flex items-center gap-1.5">
                  <div className="flex items-center justify-center w-5 h-5 rounded-full bg-primary text-primary-foreground">
                    <HugeiconsIcon icon={Target01Icon} className="h-3 w-3" />
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {currentDay.sessionIntent}
                  </span>
                </div>
              </>
            )}
          </div>
        )}
      </header>

      {currentDay?.isRestDay ? (
        /* Rest Day Content */
        <section className="flex-1 overflow-y-auto overflow-x-hidden">
          <div className="p-5 h-full -mt-10">
            <div className="flex flex-col justify-center items-center h-full">
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
          </div>
        </section>
      ) : (
        /* Tabs */
        <Tabs
          defaultValue={defaultTab}
          className="flex flex-col flex-1 overflow-hidden"
        >
          <nav className="px-5 pt-4 border-b">
            <TabsList variant="line">
              {hasWarmup && (
                <TabsTrigger
                  value="warmup"
                  className="data-active:text-orange-600 data-active:after:bg-orange-600"
                >
                  <HugeiconsIcon icon={FireIcon} className="h-4 w-4" />
                  Warmup
                </TabsTrigger>
              )}
              {hasWorkout && (
                <TabsTrigger
                  value="workout"
                  className="data-active:text-primary data-active:after:bg-primary"
                >
                  <HugeiconsIcon icon={Dumbbell01Icon} className="h-4 w-4" />
                  Main Workout
                </TabsTrigger>
              )}
              {hasCooldown && (
                <TabsTrigger
                  value="cooldown"
                  className="data-active:text-cyan-600 data-active:after:bg-cyan-600"
                >
                  <HugeiconsIcon
                    icon={WorkoutStretchingIcon}
                    className="h-4 w-4"
                  />
                  Cooldown
                </TabsTrigger>
              )}
            </TabsList>
          </nav>

          {/* Warmup Tab Content */}
          {hasWarmup && (
            <TabsContent
              value="warmup"
              className="overflow-y-auto overflow-x-hidden m-0"
              asChild
            >
              <section className="p-5">
                <div className="grid gap-3">
                  {currentDay.warmup.map((item, idx) => (
                    <article
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
                    </article>
                  ))}
                </div>
              </section>
            </TabsContent>
          )}

          {/* Main Workout Tab Content */}
          {hasWorkout && (
            <TabsContent
              value="workout"
              className="overflow-y-auto overflow-x-hidden m-0"
              asChild
            >
              <section className="p-5">
                <div className="space-y-4">
                  {currentDay.workout.map((exercise, idx) => {
                    const roleConfig = getRoleConfig(exercise.role);
                    return (
                      <article
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
                      </article>
                    );
                  })}
                </div>
              </section>
            </TabsContent>
          )}

          {/* Cooldown Tab Content */}
          {hasCooldown && (
            <TabsContent
              value="cooldown"
              className="overflow-y-auto overflow-x-hidden m-0"
              asChild
            >
              <section className="p-5">
                <div className="grid gap-3">
                  {currentDay.cooldown.map((item, idx) => (
                    <article
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
                    </article>
                  ))}
                </div>
              </section>
            </TabsContent>
          )}
        </Tabs>
      )}
    </>
  );
}
