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

type WorkoutPlanViewDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export default function WorkoutPlanViewDialog({
  open,
  onOpenChange,
}: WorkoutPlanViewDialogProps) {
  const { planDetails } = useWorkoutPlanStore();

  /* ----------------------------- */
  /* Loading / Empty State         */
  /* ----------------------------- */
  if (!planDetails) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="p-0 overflow-hidden min-w-[70vw] max-w-5xl border border-border/50 shadow-2xl">
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

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="p-0 overflow-hidden min-w-[70vw] max-w-5xl border border-border/50 shadow-2xl text-primary">
        {/* ================= HEADER ================= */}
        <header className="relative px-6 py-5 border-b border-border/50 bg-gradient-to-r from-primary/10 via-primary/5 to-transparent">
          <div className="flex items-start justify-between gap-6">
            <div className="space-y-1">
              <DialogTitle className="text-2xl font-bold tracking-tight">
                {meta.planName}
              </DialogTitle>
              <DialogDescription className="max-w-3xl text-sm text-muted-foreground">
                {meta.planDescription}
              </DialogDescription>
            </div>

            <div className="flex gap-2">
              <Badge variant="secondary">{meta.planDurationWeeks} weeks</Badge>
            </div>
          </div>
        </header>

        {/* ================= BODY ================= */}
        <div className="grid grid-cols-12 gap-0 h-[70vh]">
          {/* -------- Left: Week List -------- */}
          <aside className="col-span-4 border-r border-border/50 overflow-y-auto">
            <div className="p-4 space-y-2">
              <h3 className="text-sm font-semibold text-muted-foreground">
                Program Structure
              </h3>

              {plan.schedule.map((week) => (
                <div
                  key={week.week}
                  className={cn(
                    "rounded-lg border p-3 space-y-1 bg-card/50",
                    week.isDeloadWeek && "border-dashed",
                  )}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium">Week {week.week}</span>
                    {week.isDeloadWeek && (
                      <Badge variant="outline">Deload</Badge>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {week.weekLabel} · {week.focus}
                  </p>
                </div>
              ))}
            </div>
          </aside>

          {/* -------- Right: Preview -------- */}
          <main className="col-span-8 overflow-y-auto">
            <div className="p-6 space-y-6">
              {/* Overview */}
              <section className="space-y-3">
                <h3 className="text-lg font-semibold">Weekly Overview</h3>
                <p className="text-sm text-muted-foreground">
                  This program is structured into {meta.planDurationWeeks}{" "}
                  weeks. Each week contains planned training and recovery
                  sessions aligned with the overall goal.
                </p>
              </section>

              <Separator />

              {/* Sample Week (Week 1) */}
              <section className="space-y-4">
                <h3 className="text-lg font-semibold">Sample Week (Week 1)</h3>

                <div className="space-y-3">
                  {plan.schedule[0].days.map((day) => (
                    <div
                      key={day.day}
                      className="rounded-xl border bg-card/50 p-4"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium">{day.dayLabel}</span>
                        {day.isRestDay && (
                          <Badge variant="secondary">Rest</Badge>
                        )}
                      </div>

                      <p className="text-sm text-muted-foreground">
                        {day.focus} · {day.sessionIntent} ·{" "}
                        {day.totalDurationMinutes} min
                      </p>
                    </div>
                  ))}
                </div>
              </section>

              <Separator />

              {/* Progression */}
              <section className="space-y-3">
                <h3 className="text-lg font-semibold">Progression Strategy</h3>
                <p className="text-sm text-muted-foreground">
                  {plan.progressionSummary.strategy}
                </p>
                <ul className="list-disc list-inside text-sm text-muted-foreground">
                  {plan.progressionSummary.notes.map((note, idx) => (
                    <li key={idx}>{note}</li>
                  ))}
                </ul>
              </section>

              <Separator />

              {/* Recovery */}
              <section className="space-y-3">
                <h3 className="text-lg font-semibold">Recovery Guidance</h3>
                <p className="text-sm text-muted-foreground">
                  Recommended rest days per week:{" "}
                  {plan.recoveryGuidance.recommendedRestDays}
                </p>
                <p className="text-sm text-muted-foreground">
                  {plan.recoveryGuidance.sorenessExpectations}
                </p>
              </section>
            </div>
          </main>
        </div>
      </DialogContent>
    </Dialog>
  );
}
