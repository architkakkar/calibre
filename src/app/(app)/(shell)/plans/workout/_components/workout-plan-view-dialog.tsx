"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { useWorkoutPlanStore } from "@/stores/workout-plan.store";
import { cn } from "@/lib/shared/utils";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Calendar03Icon,
  Time01Icon,
  Target01Icon,
  FireIcon,
  Dumbbell01Icon,
  WorkoutStretchingIcon,
  AlarmClockIcon,
  TrendingUp,
  RepeatIcon,
  InformationCircleIcon,
  AlertCircleIcon,
  CheckmarkCircle01Icon,
  ActivityIcon,
} from "@hugeicons/core-free-icons";
import { useState } from "react";

type WorkoutPlanViewDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export default function WorkoutPlanViewDialog({
  open,
  onOpenChange,
}: WorkoutPlanViewDialogProps) {
  const { planDetails } = useWorkoutPlanStore();
  const [selectedWeek, setSelectedWeek] = useState(1);
  const [selectedDay, setSelectedDay] = useState<number | null>(null);

  /* ----------------------------- */
  /* Loading / Empty State         */
  /* ----------------------------- */
  if (!planDetails) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="p-0 overflow-hidden w-[95vw] max-w-7xl border border-border/50 shadow-2xl">
          <div className="p-6 space-y-6">
            <Skeleton className="h-8 w-1/2" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-64 w-full rounded-xl" />
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  const { meta, plan } = planDetails;
  const currentWeek = plan.schedule.find((w) => w.week === selectedWeek);
  const currentDay = selectedDay
    ? currentWeek?.days.find((d) => d.day === selectedDay)
    : null;

  // Helper to get color based on exercise role
  const getRoleColor = (role: string) => {
    switch (role) {
      case "main_lift":
        return "bg-red-500/15 text-red-400 border-red-500/30";
      case "secondary":
        return "bg-orange-500/15 text-orange-400 border-orange-500/30";
      case "accessory":
        return "bg-blue-500/15 text-blue-400 border-blue-500/30";
      case "finisher":
        return "bg-purple-500/15 text-purple-400 border-purple-500/30";
      default:
        return "bg-gray-500/15 text-gray-400 border-gray-500/30";
    }
  };

  // Helper to get icon based on movement pattern
  const getMovementIcon = (pattern: string) => {
    switch (pattern) {
      case "squat":
      case "hinge":
        return Dumbbell01Icon;
      case "push":
      case "pull":
        return ActivityIcon;
      case "carry":
      case "locomotion":
        return TrendingUp;
      case "core":
        return Target01Icon;
      default:
        return Dumbbell01Icon;
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="p-0 overflow-hidden min-w-[70vw] max-w-7xl border border-border/50 shadow-2xl text-primary">
        {/* ================= HEADER ================= */}
        <header className="relative px-6 py-5 border-b border-border/50 bg-linear-to-r from-primary/10 via-primary/5 to-transparent">
          <div className="flex items-start justify-between gap-6">
            <div className="space-y-2">
              <DialogTitle className="text-2xl font-bold tracking-tight">
                {meta.planName}
              </DialogTitle>
              <DialogDescription className="max-w-3xl text-sm text-muted-foreground leading-relaxed">
                {meta.planDescription}
              </DialogDescription>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary/10 border border-primary/20">
                <HugeiconsIcon
                  icon={Calendar03Icon}
                  className="h-4 w-4 text-primary"
                />
                <span className="text-sm font-semibold text-foreground">
                  {meta.planDurationWeeks} Weeks
                </span>
              </div>
            </div>
          </div>
        </header>

        {/* ================= BODY ================= */}
        <div className="grid grid-cols-12 gap-0 h-[75vh]">
          {/* -------- Left: Week + Day Navigation -------- */}
          <aside className="col-span-3 border-r border-border/50 overflow-y-auto bg-muted/20">
            <div className="p-4 space-y-4">
              {/* Week Selector */}
              <div className="space-y-2">
                <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-2">
                  Program Timeline
                </h3>

                <div className="space-y-1.5">
                  {plan.schedule.map((week) => (
                    <button
                      key={week.week}
                      onClick={() => {
                        setSelectedWeek(week.week);
                        setSelectedDay(null);
                      }}
                      className={cn(
                        "w-full text-left rounded-lg border p-3 space-y-1.5 transition-all duration-200",
                        selectedWeek === week.week
                          ? "bg-primary/10 border-primary/30 shadow-sm"
                          : "bg-card/50 border-border/40 hover:bg-card hover:border-border/60",
                        week.isDeloadWeek && "border-dashed",
                      )}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-sm">
                          Week {week.week}
                        </span>
                        {week.isDeloadWeek && (
                          <Badge
                            variant="outline"
                            className="text-[10px] h-5 bg-amber-500/10 text-amber-400 border-amber-500/30"
                          >
                            Deload
                          </Badge>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground line-clamp-1">
                        {week.focus}
                      </p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Day Selector for Selected Week */}
              {currentWeek && (
                <>
                  <Separator />
                  <div className="space-y-2">
                    <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-2">
                      Week {selectedWeek} Days
                    </h3>

                    <div className="space-y-1">
                      {currentWeek.days.map((day) => (
                        <button
                          key={day.day}
                          onClick={() => setSelectedDay(day.day)}
                          className={cn(
                            "w-full text-left rounded-lg border p-2.5 transition-all duration-200",
                            selectedDay === day.day
                              ? "bg-primary/10 border-primary/30 shadow-sm"
                              : "bg-card/30 border-border/30 hover:bg-card/50 hover:border-border/50",
                            day.isRestDay && "opacity-60",
                          )}
                        >
                          <div className="flex items-center justify-between mb-1">
                            <span className="font-medium text-xs">
                              {day.dayLabel}
                            </span>
                            {day.isRestDay && (
                              <Badge
                                variant="secondary"
                                className="text-[9px] h-4"
                              >
                                Rest
                              </Badge>
                            )}
                          </div>
                          <p className="text-[10px] text-muted-foreground line-clamp-1">
                            {day.focus}
                          </p>
                        </button>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>
          </aside>

          {/* -------- Right: Main Content -------- */}
          <main className="col-span-9 overflow-y-auto">
            <div className="p-6 space-y-6">
              {/* Show Day Details if a day is selected */}
              {currentDay ? (
                <>
                  {/* Day Header */}
                  <div className="space-y-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <h2 className="text-2xl font-bold flex items-center gap-2">
                          {currentDay.dayLabel}
                          {currentDay.isRestDay && (
                            <Badge variant="secondary">Rest Day</Badge>
                          )}
                        </h2>
                        <p className="text-sm text-muted-foreground mt-1">
                          {currentDay.sessionIntent}
                        </p>
                      </div>
                      <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-muted/50 border border-border/40">
                        <HugeiconsIcon
                          icon={Time01Icon}
                          className="h-4 w-4 text-muted-foreground"
                        />
                        <span className="text-sm font-semibold">
                          {currentDay.totalDurationMinutes} min
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 p-3 rounded-lg bg-primary/5 border border-primary/10">
                      <HugeiconsIcon
                        icon={Target01Icon}
                        className="h-4 w-4 text-primary"
                      />
                      <span className="text-sm font-medium">
                        Focus: {currentDay.focus}
                      </span>
                    </div>
                  </div>

                  {!currentDay.isRestDay && (
                    <>
                      {/* Warmup */}
                      {currentDay.warmup && currentDay.warmup.length > 0 && (
                        <section className="space-y-3">
                          <div className="flex items-center gap-2">
                            <HugeiconsIcon
                              icon={FireIcon}
                              className="h-5 w-5 text-orange-500"
                            />
                            <h3 className="text-lg font-semibold">Warmup</h3>
                          </div>

                          <div className="space-y-2">
                            {currentDay.warmup.map((item, idx) => (
                              <div
                                key={idx}
                                className="p-4 rounded-lg border border-orange-500/20 bg-orange-500/5"
                              >
                                <div className="flex items-start justify-between mb-2">
                                  <h4 className="font-semibold">{item.name}</h4>
                                  <span className="text-xs text-muted-foreground">
                                    {item.durationMinutes} min
                                  </span>
                                </div>
                                <p className="text-sm text-muted-foreground mb-1">
                                  {item.focus}
                                </p>
                                {item.notes && (
                                  <p className="text-xs text-muted-foreground italic">
                                    {item.notes}
                                  </p>
                                )}
                              </div>
                            ))}
                          </div>
                        </section>
                      )}

                      {/* Main Workout */}
                      {currentDay.workout && currentDay.workout.length > 0 && (
                        <section className="space-y-3">
                          <div className="flex items-center gap-2">
                            <HugeiconsIcon
                              icon={Dumbbell01Icon}
                              className="h-5 w-5 text-primary"
                            />
                            <h3 className="text-lg font-semibold">Workout</h3>
                          </div>

                          <div className="space-y-3">
                            {currentDay.workout.map((exercise, idx) => (
                              <div
                                key={idx}
                                className="p-4 rounded-lg border bg-card/50 hover:bg-card transition-colors"
                              >
                                {/* Exercise Header */}
                                <div className="flex items-start justify-between mb-3">
                                  <div className="flex items-start gap-3 flex-1">
                                    <div className="p-2 rounded-lg bg-primary/10">
                                      <HugeiconsIcon
                                        icon={getMovementIcon(
                                          exercise.movementPattern,
                                        )}
                                        className="h-5 w-5 text-primary"
                                      />
                                    </div>
                                    <div className="flex-1">
                                      <h4 className="font-semibold text-base mb-1">
                                        {exercise.exercise}
                                      </h4>
                                      <div className="flex items-center gap-2 flex-wrap">
                                        <Badge
                                          className={cn(
                                            "text-[10px] h-5 border",
                                            getRoleColor(exercise.role),
                                          )}
                                        >
                                          {exercise.role.replace(/_/g, " ")}
                                        </Badge>
                                        <Badge
                                          variant="outline"
                                          className="text-[10px] h-5"
                                        >
                                          {exercise.movementPattern}
                                        </Badge>
                                      </div>
                                    </div>
                                  </div>
                                </div>

                                {/* Exercise Details Grid */}
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 p-3 rounded-lg bg-muted/30 border border-border/40">
                                  <div className="space-y-1">
                                    <div className="flex items-center gap-1.5">
                                      <HugeiconsIcon
                                        icon={RepeatIcon}
                                        className="h-3.5 w-3.5 text-muted-foreground"
                                      />
                                      <span className="text-xs text-muted-foreground">
                                        Sets
                                      </span>
                                    </div>
                                    <p className="font-bold text-lg">
                                      {exercise.sets}
                                    </p>
                                  </div>

                                  <div className="space-y-1">
                                    <div className="flex items-center gap-1.5">
                                      <HugeiconsIcon
                                        icon={Target01Icon}
                                        className="h-3.5 w-3.5 text-muted-foreground"
                                      />
                                      <span className="text-xs text-muted-foreground">
                                        Reps
                                      </span>
                                    </div>
                                    <p className="font-bold text-lg">
                                      {exercise.reps}
                                    </p>
                                  </div>

                                  <div className="space-y-1">
                                    <div className="flex items-center gap-1.5">
                                      <HugeiconsIcon
                                        icon={AlarmClockIcon}
                                        className="h-3.5 w-3.5 text-muted-foreground"
                                      />
                                      <span className="text-xs text-muted-foreground">
                                        Rest
                                      </span>
                                    </div>
                                    <p className="font-bold text-lg">
                                      {exercise.restSeconds}s
                                    </p>
                                  </div>

                                  <div className="space-y-1">
                                    <div className="flex items-center gap-1.5">
                                      <HugeiconsIcon
                                        icon={TrendingUp}
                                        className="h-3.5 w-3.5 text-muted-foreground"
                                      />
                                      <span className="text-xs text-muted-foreground">
                                        Tempo
                                      </span>
                                    </div>
                                    <p className="font-bold text-lg">
                                      {exercise.tempo || "N/A"}
                                    </p>
                                  </div>
                                </div>

                                {/* Intensity Guidance */}
                                {exercise.intensityGuidance && (
                                  <div className="mt-3 p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
                                    <div className="flex items-start gap-2">
                                      <HugeiconsIcon
                                        icon={InformationCircleIcon}
                                        className="h-4 w-4 text-blue-400 mt-0.5 shrink-0"
                                      />
                                      <div>
                                        <p className="text-xs font-semibold text-blue-400 mb-1">
                                          {exercise.intensityGuidance.type}
                                        </p>
                                        <p className="text-sm text-blue-300/90">
                                          {exercise.intensityGuidance.value}
                                        </p>
                                      </div>
                                    </div>
                                  </div>
                                )}

                                {/* Notes */}
                                {exercise.notes && (
                                  <div className="mt-3 p-3 rounded-lg bg-muted/50 border border-border/40">
                                    <p className="text-sm text-muted-foreground">
                                      <span className="font-semibold">
                                        Note:
                                      </span>{" "}
                                      {exercise.notes}
                                    </p>
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>
                        </section>
                      )}

                      {/* Cooldown */}
                      {currentDay.cooldown &&
                        currentDay.cooldown.length > 0 && (
                          <section className="space-y-3">
                            <div className="flex items-center gap-2">
                              <HugeiconsIcon
                                icon={WorkoutStretchingIcon}
                                className="h-5 w-5 text-cyan-500"
                              />
                              <h3 className="text-lg font-semibold">
                                Cooldown
                              </h3>
                            </div>

                            <div className="space-y-2">
                              {currentDay.cooldown.map((item, idx) => (
                                <div
                                  key={idx}
                                  className="p-4 rounded-lg border border-cyan-500/20 bg-cyan-500/5"
                                >
                                  <div className="flex items-start justify-between mb-2">
                                    <h4 className="font-semibold">
                                      {item.name}
                                    </h4>
                                    <span className="text-xs text-muted-foreground">
                                      {item.durationMinutes} min
                                    </span>
                                  </div>
                                  <p className="text-sm text-muted-foreground mb-1">
                                    {item.focus}
                                  </p>
                                  {item.notes && (
                                    <p className="text-xs text-muted-foreground italic">
                                      {item.notes}
                                    </p>
                                  )}
                                </div>
                              ))}
                            </div>
                          </section>
                        )}
                    </>
                  )}

                  {/* Rest Day Message */}
                  {currentDay.isRestDay && (
                    <div className="p-8 rounded-xl border-2 border-dashed border-border/50 bg-muted/20 text-center">
                      <HugeiconsIcon
                        icon={CheckmarkCircle01Icon}
                        className="h-12 w-12 text-green-500 mx-auto mb-3"
                      />
                      <h3 className="text-xl font-semibold mb-2">Rest Day</h3>
                      <p className="text-muted-foreground">
                        Take this day to recover and let your body adapt to the
                        training.
                      </p>
                    </div>
                  )}
                </>
              ) : (
                /* Show Week Overview if no day selected */
                <>
                  {/* Week Overview */}
                  {currentWeek && (
                    <div className="space-y-6">
                      <div className="space-y-3">
                        <h2 className="text-2xl font-bold">
                          Week {selectedWeek} Overview
                        </h2>
                        <div className="p-4 rounded-xl bg-primary/5 border border-primary/10">
                          <div className="flex items-start gap-3">
                            <HugeiconsIcon
                              icon={Target01Icon}
                              className="h-5 w-5 text-primary mt-0.5"
                            />
                            <div>
                              <h3 className="font-semibold mb-1">
                                {currentWeek.weekLabel}
                              </h3>
                              <p className="text-sm text-muted-foreground">
                                {currentWeek.focus}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Days Summary */}
                      <section className="space-y-3">
                        <h3 className="text-lg font-semibold">Training Days</h3>
                        <div className="grid gap-3">
                          {currentWeek.days.map((day) => (
                            <button
                              key={day.day}
                              onClick={() => setSelectedDay(day.day)}
                              className="text-left p-4 rounded-lg border bg-card hover:bg-card/80 transition-all hover:border-primary/30 group"
                            >
                              <div className="flex items-center justify-between mb-2">
                                <span className="font-semibold group-hover:text-primary transition-colors">
                                  {day.dayLabel}
                                </span>
                                <div className="flex items-center gap-2">
                                  {day.isRestDay && (
                                    <Badge variant="secondary">Rest</Badge>
                                  )}
                                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                    <HugeiconsIcon
                                      icon={Time01Icon}
                                      className="h-3.5 w-3.5"
                                    />
                                    {day.totalDurationMinutes} min
                                  </div>
                                </div>
                              </div>
                              <p className="text-sm text-muted-foreground mb-2">
                                {day.focus} · {day.sessionIntent}
                              </p>
                              {!day.isRestDay && day.workout && (
                                <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                                  <HugeiconsIcon
                                    icon={Dumbbell01Icon}
                                    className="h-3.5 w-3.5"
                                  />
                                  {day.workout.length} exercises
                                </div>
                              )}
                            </button>
                          ))}
                        </div>
                      </section>
                    </div>
                  )}

                  <Separator />

                  {/* Progression Strategy */}
                  <section className="space-y-3">
                    <div className="flex items-center gap-2">
                      <HugeiconsIcon
                        icon={TrendingUp}
                        className="h-5 w-5 text-green-500"
                      />
                      <h3 className="text-lg font-semibold">
                        Progression Strategy
                      </h3>
                    </div>
                    <div className="p-4 rounded-lg bg-green-500/5 border border-green-500/20">
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {plan.progressionSummary.strategy}
                      </p>
                      {plan.progressionSummary.notes &&
                        plan.progressionSummary.notes.length > 0 && (
                          <ul className="mt-3 space-y-2">
                            {plan.progressionSummary.notes.map((note, idx) => (
                              <li
                                key={idx}
                                className="flex items-start gap-2 text-sm text-muted-foreground"
                              >
                                <HugeiconsIcon
                                  icon={CheckmarkCircle01Icon}
                                  className="h-4 w-4 text-green-500 mt-0.5 shrink-0"
                                />
                                {note}
                              </li>
                            ))}
                          </ul>
                        )}
                    </div>
                  </section>

                  <Separator />

                  {/* Recovery Guidance */}
                  <section className="space-y-3">
                    <div className="flex items-center gap-2">
                      <HugeiconsIcon
                        icon={WorkoutStretchingIcon}
                        className="h-5 w-5 text-cyan-500"
                      />
                      <h3 className="text-lg font-semibold">
                        Recovery Guidance
                      </h3>
                    </div>
                    <div className="p-4 rounded-lg bg-cyan-500/5 border border-cyan-500/20 space-y-3">
                      <div>
                        <p className="text-sm font-semibold mb-1">Rest Days</p>
                        <p className="text-sm text-muted-foreground">
                          {plan.recoveryGuidance.recommendedRestDays} days per
                          week recommended
                        </p>
                      </div>
                      <div>
                        <p className="text-sm font-semibold mb-1">
                          What to Expect
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {plan.recoveryGuidance.sorenessExpectations}
                        </p>
                      </div>
                      {plan.recoveryGuidance.mobilityFocus &&
                        plan.recoveryGuidance.mobilityFocus.length > 0 && (
                          <div>
                            <p className="text-sm font-semibold mb-2">
                              Mobility Focus
                            </p>
                            <div className="flex flex-wrap gap-2">
                              {plan.recoveryGuidance.mobilityFocus.map(
                                (focus, idx) => (
                                  <Badge
                                    key={idx}
                                    variant="secondary"
                                    className="text-xs"
                                  >
                                    {focus}
                                  </Badge>
                                ),
                              )}
                            </div>
                          </div>
                        )}
                    </div>
                  </section>

                  <Separator />

                  {/* Exercise Substitutions */}
                  {plan.substitutions && plan.substitutions.length > 0 && (
                    <section className="space-y-3">
                      <div className="flex items-center gap-2">
                        <HugeiconsIcon
                          icon={RepeatIcon}
                          className="h-5 w-5 text-purple-500"
                        />
                        <h3 className="text-lg font-semibold">
                          Exercise Substitutions
                        </h3>
                      </div>
                      <div className="space-y-3">
                        {plan.substitutions.map((sub, idx) => (
                          <div
                            key={idx}
                            className="p-4 rounded-lg border bg-card/50"
                          >
                            <div className="flex items-start gap-2 mb-2">
                              <HugeiconsIcon
                                icon={Dumbbell01Icon}
                                className="h-4 w-4 text-muted-foreground mt-0.5"
                              />
                              <div className="flex-1">
                                <p className="font-semibold text-sm">
                                  {sub.exercise}
                                </p>
                                <Badge
                                  variant="outline"
                                  className="text-[10px] h-4 mt-1"
                                >
                                  {sub.movementPattern}
                                </Badge>
                              </div>
                            </div>
                            <div className="pl-6 space-y-1">
                              <p className="text-xs text-muted-foreground font-semibold mb-1.5">
                                Alternatives:
                              </p>
                              {sub.alternatives.map((alt, altIdx) => (
                                <p
                                  key={altIdx}
                                  className="text-sm text-muted-foreground"
                                >
                                  • {alt}
                                </p>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </section>
                  )}

                  {/* Safety & General Notes */}
                  {(plan.notes?.safety?.length > 0 ||
                    plan.notes?.general?.length > 0) && (
                    <>
                      <Separator />
                      <section className="space-y-3">
                        <div className="flex items-center gap-2">
                          <HugeiconsIcon
                            icon={AlertCircleIcon}
                            className="h-5 w-5 text-amber-500"
                          />
                          <h3 className="text-lg font-semibold">
                            Important Notes
                          </h3>
                        </div>

                        {plan.notes?.safety && plan.notes.safety.length > 0 && (
                          <div className="p-4 rounded-lg bg-amber-500/5 border border-amber-500/20">
                            <p className="text-xs font-semibold text-amber-500 uppercase tracking-wider mb-2">
                              Safety
                            </p>
                            <ul className="space-y-1.5">
                              {plan.notes.safety.map((note, idx) => (
                                <li
                                  key={idx}
                                  className="flex items-start gap-2 text-sm text-muted-foreground"
                                >
                                  <HugeiconsIcon
                                    icon={AlertCircleIcon}
                                    className="h-4 w-4 text-amber-500 mt-0.5 shrink-0"
                                  />
                                  {note}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {plan.notes?.general &&
                          plan.notes.general.length > 0 && (
                            <div className="p-4 rounded-lg bg-muted/30 border border-border/40">
                              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                                General
                              </p>
                              <ul className="space-y-1.5">
                                {plan.notes.general.map((note, idx) => (
                                  <li
                                    key={idx}
                                    className="flex items-start gap-2 text-sm text-muted-foreground"
                                  >
                                    <HugeiconsIcon
                                      icon={InformationCircleIcon}
                                      className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0"
                                    />
                                    {note}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                      </section>
                    </>
                  )}
                </>
              )}
            </div>
          </main>
        </div>
      </DialogContent>
    </Dialog>
  );
}
