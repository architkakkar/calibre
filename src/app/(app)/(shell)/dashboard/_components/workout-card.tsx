"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import type { TodayWorkoutResponse as WorkoutData } from "@/lib/validators/dashboard.validator";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Add01Icon,
  CheckmarkCircle02Icon,
  CircleIcon,
  Dumbbell01Icon,
} from "@hugeicons/core-free-icons";

interface WorkoutCardProps {
  data: WorkoutData | null;
  onToggleComplete: (sections: {
    warmup: boolean;
    mainWorkout: boolean;
    cooldown: boolean;
  }) => Promise<{ success: boolean; status: string } | undefined>;
}

export function WorkoutCard({ data, onToggleComplete }: WorkoutCardProps) {
  const router = useRouter();
  const [warmupCompleted, setWarmupCompleted] = useState(false);
  const [mainWorkoutCompleted, setMainWorkoutCompleted] = useState(false);
  const [cooldownCompleted, setCooldownCompleted] = useState(false);

  // Initialize checkboxes from API state only once when data changes
  useEffect(() => {
    if (data && data.hasActivePlan && data.sections) {
      setWarmupCompleted(data.sections.warmup);
      setMainWorkoutCompleted(data.sections.mainWorkout);
      setCooldownCompleted(data.sections.cooldown);
    } else {
      // Reset if no data
      setWarmupCompleted(false);
      setMainWorkoutCompleted(false);
      setCooldownCompleted(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data && data.hasActivePlan ? data.workout?.id : null]); // Only re-run when workout ID changes (new workout loaded)

  const hasWarmup =
    data && data.hasActivePlan && data.workout?.warmup
      ? data.workout.warmup.length > 0
      : false;
  const hasExercises =
    data && data.hasActivePlan && data.workout?.exercises
      ? data.workout.exercises.length > 0
      : false;
  const hasCooldown =
    data && data.hasActivePlan && data.workout?.cooldown
      ? data.workout.cooldown.length > 0
      : false;

  const allSectionsCompleted =
    (!hasWarmup || warmupCompleted) &&
    (!hasExercises || mainWorkoutCompleted) &&
    (!hasCooldown || cooldownCompleted);

  const handleSubmit = async () => {
    if (allSectionsCompleted) {
      await onToggleComplete({
        warmup: warmupCompleted,
        mainWorkout: mainWorkoutCompleted,
        cooldown: cooldownCompleted,
      });
    }
  };

  // No active plan
  if (!data || !data.hasActivePlan) {
    return (
      <Card className="h-full border-2 hover:border-primary/30 transition-all duration-500 bg-linear-to-br from-card to-primary/5 overflow-hidden group">
        <CardHeader className="relative">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-xl bg-primary/10">
                <HugeiconsIcon
                  icon={Dumbbell01Icon}
                  className="w-4 h-4 text-primary"
                />
              </div>
              <CardTitle className="text-lg">Today&apos;s Workout</CardTitle>
            </div>
          </div>
        </CardHeader>
        <CardContent className="relative overflow-y-auto max-h-[calc(100%-5rem)]">
          <div className="text-center py-12">
            <HugeiconsIcon
              icon={Dumbbell01Icon}
              className="w-12 h-12 mx-auto mb-3 text-muted-foreground"
            />
            <p className="text-sm text-muted-foreground mb-3">No active plan</p>
            <Button
              onClick={() => router.push("/plans/workout")}
              size="sm"
              className="rounded-full"
            >
              <HugeiconsIcon icon={Add01Icon} className="w-3 h-3 mr-1" />
              Create Plan
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Rest day
  if (data.isRestDay) {
    return (
      <Card className="h-full border border-border hover:border-primary/10 transition-all duration-500 bg-linear-to-br from-card to-primary/5 overflow-hidden group">
        <CardHeader className="relative">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-xl bg-primary/10">
                <HugeiconsIcon
                  icon={Dumbbell01Icon}
                  className="w-4 h-4 text-primary"
                />
              </div>
              <CardTitle className="text-lg">Today&apos;s Workout</CardTitle>
            </div>
            <Badge variant="outline" className="rounded-full text-xs">
              {`Week ${data.currentWeek} • Day ${data.currentDay}`}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="flex items-center justify-center relative overflow-y-auto h-full -mt-20">
          <div className="text-center">
            <div className="p-4 rounded-full bg-green-500/10 w-fit mx-auto mb-3">
              <HugeiconsIcon
                icon={CheckmarkCircle02Icon}
                className="w-12 h-12 text-green-500"
              />
            </div>
            <h3 className="font-bold text-lg">Rest Day</h3>
            <p className="text-sm text-muted-foreground">
              Recovery is part of progress
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Main workout UI
  return (
    <Card className="h-full border border-border hover:border-primary/10 transition-all duration-500 bg-linear-to-br from-card to-primary/5 overflow-hidden group py-5">
      <CardHeader className="relative space-y-2 px-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-primary/10">
              <HugeiconsIcon
                icon={Dumbbell01Icon}
                className="w-5 h-5 text-primary"
              />
            </div>
            <div>
              <CardTitle className="text-base leading-none pb-0.5">
                Today&apos;s Workout
              </CardTitle>
              <p className="text-xs text-muted-foreground mt-1">
                <span className="text-muted-foreground/70 font-medium">
                  Plan:
                </span>{" "}
                {data.planName}
              </p>
            </div>
          </div>
          <Badge
            variant="outline"
            className="rounded-full text-xs self-start p-0 pl-2"
          >
            {`Week ${data.currentWeek} • Day ${data.currentDay}`}
          </Badge>
        </div>

        {/* Session Info */}
        <div>
          <span className="text-xs text-foreground/70">
            Today&apos;s Goal:{" "}
          </span>
          <Badge
            variant="secondary"
            className="rounded-full font-normal text-xs w-fit capitalize"
          >
            {data.workout?.sessionIntent}
          </Badge>
        </div>

        {/* Progress Indicator */}
        {!data.isCompleted && (
          <div className="flex items-center gap-1.5 mt-2">
            {hasWarmup && (
              <div
                className={`h-1.5 flex-1 rounded-full transition-colors ${warmupCompleted ? "bg-primary" : "bg-muted"}`}
              />
            )}
            {hasExercises && (
              <div
                className={`h-1.5 flex-1 rounded-full transition-colors ${mainWorkoutCompleted ? "bg-primary" : "bg-muted"}`}
              />
            )}
            {hasCooldown && (
              <div
                className={`h-1.5 flex-1 rounded-full transition-colors ${cooldownCompleted ? "bg-primary" : "bg-muted"}`}
              />
            )}
          </div>
        )}
      </CardHeader>

      <CardContent className="relative overflow-y-auto max-h-[calc(100dvh-280px)] px-5">
        <div>
          {/* Workout Sections - Accordion */}
          <Accordion
            type="single"
            defaultValue="warmup"
            collapsible
            className="space-y-2"
          >
            {/* Warmup Section */}
            {data.workout?.warmup && data.workout.warmup.length > 0 && (
              <AccordionItem value="warmup" className="border-none">
                <div className="flex items-center gap-2 p-3 rounded-lg bg-linear-to-r from-amber-400/5 to-transparent border border-amber-400/10">
                  <Checkbox
                    checked={warmupCompleted}
                    onCheckedChange={(checked) =>
                      setWarmupCompleted(checked === true)
                    }
                    disabled={data.isCompleted}
                    className="data-[state=checked]:bg-amber-400! data-[state=checked]:border-amber-400"
                  />
                  <AccordionTrigger className="flex-1 py-0 hover:no-underline flex items-center gap-1">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold text-amber-400">
                        Warm-up
                      </span>
                      <Badge
                        variant="outline"
                        className="h-5 px-2 text-[10px] border-amber-400/30 text-amber-400"
                      >
                        {data.workout.warmup.length}{" "}
                        {data.workout.warmup.length === 1
                          ? "exercise"
                          : "exercises"}
                      </Badge>
                    </div>
                  </AccordionTrigger>
                </div>
                <AccordionContent className="py-2">
                  <div className="space-y-2 pl-3">
                    {data.workout.warmup.map(
                      (
                        item: {
                          name: string;
                          focus: string;
                          notes: string;
                          durationMinutes: number;
                        },
                        idx: number,
                      ) => (
                        <div
                          key={idx}
                          className="p-4 rounded-lg bg-linear-to-br from-amber-400/5 to-transparent border border-amber-400/15 hover:border-amber-400/40 hover:shadow-sm transition-all"
                        >
                          <div className="flex items-start justify-between mb-1">
                            <h4 className="text-sm font-semibold text-amber-400">
                              {idx + 1}. {item.name}
                            </h4>
                            <Badge
                              variant="secondary"
                              className="ml-2 text-[10px] h-5 shrink-0 text-amber-400 bg-amber-400/10"
                            >
                              {item.durationMinutes} min
                            </Badge>
                          </div>
                          <p className="text-xs text-muted-foreground mb-3!">
                            Focus:{" "}
                            <span className="text-foreground/90 capitalize">
                              {item.focus}
                            </span>
                          </p>
                          {item.notes && (
                            <p className="text-xs text-muted-foreground border-t border-amber-400/10 pt-2.5">
                              {item.notes}
                            </p>
                          )}
                        </div>
                      ),
                    )}
                  </div>
                </AccordionContent>
              </AccordionItem>
            )}

            {/* Main Workout Section */}
            {hasExercises && (
              <AccordionItem value="main" className="border-none">
                <div className="flex items-center gap-2 p-3 rounded-lg bg-linear-to-r from-primary/5 to-transparent border border-primary/10">
                  <Checkbox
                    checked={mainWorkoutCompleted}
                    onCheckedChange={(checked) =>
                      setMainWorkoutCompleted(checked === true)
                    }
                    disabled={data.isCompleted}
                    className="data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                  />
                  <AccordionTrigger className="flex-1 py-0 hover:no-underline flex items-center gap-1">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold text-primary">
                        Main Workout
                      </span>
                      <Badge
                        variant="outline"
                        className="h-5 px-2 text-[10px] border-primary/30 text-primary"
                      >
                        {data.workout?.exercises.length}{" "}
                        {data.workout?.exercises.length === 1
                          ? "exercise"
                          : "exercises"}
                      </Badge>
                    </div>
                  </AccordionTrigger>
                </div>
                <AccordionContent className="py-2">
                  <div className="space-y-2 pl-3">
                    {data.workout?.exercises.map(
                      (
                        exercise: {
                          exercise: string;
                          sets: number;
                          reps: string;
                          tempo: string;
                          notes: string;
                        },
                        idx: number,
                      ) => (
                        <div
                          key={idx}
                          className="p-4 rounded-lg bg-linear-to-br from-primary/5 to-transparent border border-primary/15 hover:border-primary/40 hover:shadow-sm transition-all"
                        >
                          <div className="flex items-start justify-between mb-3">
                            <h4 className="font-semibold text-sm text-primary">
                              {idx + 1}. {exercise.exercise}
                            </h4>
                          </div>
                          <div className="flex flex-wrap gap-2 mb-2">
                            {exercise.sets && (
                              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-background/50 border border-border">
                                <span className="text-[10px] font-medium text-muted-foreground">
                                  SETS
                                </span>
                                <span className="text-xs font-semibold text-foreground">
                                  {exercise.sets}
                                </span>
                              </div>
                            )}
                            {exercise.reps && (
                              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-background/50 border border-border">
                                <span className="text-[10px] font-medium text-muted-foreground">
                                  REPS
                                </span>
                                <span className="text-xs font-semibold text-foreground">
                                  {exercise.reps}
                                </span>
                              </div>
                            )}
                            {exercise.tempo && (
                              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-background/50 border border-border">
                                <span className="text-[10px] font-medium text-muted-foreground">
                                  TEMPO
                                </span>
                                <span className="text-xs font-semibold text-foreground">
                                  {exercise.tempo}
                                </span>
                              </div>
                            )}
                          </div>
                          {exercise.notes && (
                            <p className="text-xs text-muted-foreground border-t border-primary/10 pt-2.5">
                              💡 {exercise.notes}
                            </p>
                          )}
                        </div>
                      ),
                    )}
                  </div>
                </AccordionContent>
              </AccordionItem>
            )}

            {/* Cooldown Section */}
            {data.workout?.cooldown && data.workout.cooldown.length > 0 && (
              <AccordionItem value="cooldown" className="border-none">
                <div className="flex items-center gap-2 p-3 rounded-lg bg-linear-to-r from-blue-500/5 to-transparent border border-blue-500/10">
                  <Checkbox
                    checked={cooldownCompleted}
                    onCheckedChange={(checked) =>
                      setCooldownCompleted(checked === true)
                    }
                    disabled={data.isCompleted}
                    className="data-[state=checked]:bg-blue-400! data-[state=checked]:border-blue-500"
                  />
                  <AccordionTrigger className="flex-1 py-0 hover:no-underline flex items-center gap-1">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold text-blue-500">
                        Cool-down
                      </span>
                      <Badge
                        variant="outline"
                        className="h-5 px-2 text-[10px] border-blue-500/30 text-blue-500"
                      >
                        {data.workout.cooldown.length}{" "}
                        {data.workout.cooldown.length === 1
                          ? "exercise"
                          : "exercises"}
                      </Badge>
                    </div>
                  </AccordionTrigger>
                </div>
                <AccordionContent className="py-2">
                  <div className="space-y-2 pl-3">
                    {data.workout.cooldown.map(
                      (
                        item: {
                          name: string;
                          focus: string;
                          notes: string;
                          durationMinutes: number;
                        },
                        idx: number,
                      ) => (
                        <div
                          key={idx}
                          className="p-4 rounded-lg bg-linear-to-br from-blue-500/5 to-transparent border border-blue-500/15 hover:border-blue-500/40 hover:shadow-sm transition-all"
                        >
                          <div className="flex items-start justify-between mb-1">
                            <h4 className="text-sm font-semibold text-blue-500">
                              {idx + 1}. {item.name}
                            </h4>
                            <Badge
                              variant="secondary"
                              className="ml-2 text-[10px] h-5 shrink-0 text-blue-500 bg-blue-500/10"
                            >
                              {item.durationMinutes} min
                            </Badge>
                          </div>
                          <p className="text-xs text-muted-foreground mb-3!">
                            Focus:{" "}
                            <span className="text-foreground/90 capitalize">
                              {item.focus}
                            </span>
                          </p>
                          {item.notes && (
                            <p className="text-xs text-muted-foreground border-t border-blue-500/10 pt-2.5">
                              {item.notes}
                            </p>
                          )}
                        </div>
                      ),
                    )}
                  </div>
                </AccordionContent>
              </AccordionItem>
            )}
          </Accordion>
        </div>
      </CardContent>

      {/* Submit Button - Sticky at bottom */}
      <div className="px-5 mt-auto border-t border-border/50">
        {data.isCompleted ? (
          <div className="flex items-center justify-center gap-2 py-3 px-4 rounded-lg bg-green-500/10 border border-green-500/20 h-9">
            <HugeiconsIcon
              icon={CheckmarkCircle02Icon}
              className="w-5 h-5 text-green-500"
            />
            <span className="text-sm font-semibold text-green-600 dark:text-green-400">
              Workout Completed!
            </span>
          </div>
        ) : (
          <Button
            onClick={handleSubmit}
            className="w-full rounded-lg h-9 text-sm font-semibold"
            variant={allSectionsCompleted ? "default" : "outline"}
            disabled={!allSectionsCompleted}
          >
            {allSectionsCompleted ? (
              <>
                <HugeiconsIcon
                  icon={CheckmarkCircle02Icon}
                  className="w-5 h-5"
                />
                Mark as Complete
              </>
            ) : (
              <>
                <HugeiconsIcon icon={CircleIcon} className="w-4 h-4 mr-2" />
                Complete All Sections First
              </>
            )}
          </Button>
        )}
      </div>
    </Card>
  );
}
