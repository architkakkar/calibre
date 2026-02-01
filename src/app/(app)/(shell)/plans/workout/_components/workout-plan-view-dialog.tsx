"use client";

import { useState } from "react";
import { useWorkoutPlanStore } from "@/stores/workout-plan.store";
import { WorkoutPlanViewDialogSkeleton } from "./workout-plan-view-dialog-skeleton";
import { WorkoutPlanViewDialogSidebar } from "./workout-plan-view-dialog-sidebar";
import { WorkoutPlanViewDialogOverview } from "./workout-plan-view-dialog-overview";
import { WorkoutPlanViewDialogContent } from "./workout-plan-view-dialog-content";
import { WorkoutPlanViewDialogSubstitutionPanel } from "./workout-plan-view-dialog-substitution-panel";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { HugeiconsIcon } from "@hugeicons/react";
import { RepeatIcon, Cancel01Icon } from "@hugeicons/core-free-icons";

type WorkoutPlanViewDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function WorkoutPlanViewDialog({
  open,
  onOpenChange,
}: WorkoutPlanViewDialogProps) {
  const { planDetails, selectedPlanId, activePlanId } = useWorkoutPlanStore();
  const [viewMode, setViewMode] = useState<"day" | "overview">("overview");
  const [selectedWeek, setSelectedWeek] = useState<number>(1);
  const [selectedDay, setSelectedDay] = useState<number>(1);
  const [expandedWeeks, setExpandedWeeks] = useState<Set<number>>(new Set([1]));
  const [substitutionsOpen, setSubstitutionsOpen] = useState(false);

  const isActivePlan = selectedPlanId === activePlanId;

  if (!planDetails) {
    return (
      <WorkoutPlanViewDialogSkeleton open={open} onOpenChange={onOpenChange} />
    );
  }

  const { meta, plan } = planDetails;

  const toggleWeek = (weekNum: number) => {
    const newExpanded = new Set(expandedWeeks);
    if (newExpanded.has(weekNum)) {
      newExpanded.delete(weekNum);
    } else {
      newExpanded.add(weekNum);
    }
    setExpandedWeeks(newExpanded);
  };

  const selectDay = (weekNum: number, dayNum: number) => {
    setSelectedWeek(weekNum);
    setSelectedDay(dayNum);
    setViewMode("day");
    if (!expandedWeeks.has(weekNum)) {
      setExpandedWeeks(new Set(expandedWeeks).add(weekNum));
    }
  };

  const currentWeek = plan.schedule.find((w) => w.week === selectedWeek);
  const currentDay = currentWeek?.days.find((d) => d.day === selectedDay);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton={false}
        className="p-0 w-full max-w-[95vw] lg:max-w-[90vw] h-[95dvh] gap-0 bg-background flex flex-col overflow-hidden"
      >
        <DialogTitle hidden>{meta.planName}</DialogTitle>
        <DialogDescription hidden>{meta.planDescription}</DialogDescription>
        <button
          onClick={() => onOpenChange(false)}
          className="absolute top-6 right-5 p-2 rounded-lg hover:bg-muted hover:text-foreground text-muted-foreground z-50 cursor-pointer"
        >
          <HugeiconsIcon icon={Cancel01Icon} className="h-4.5 w-4.5" />
        </button>

        <div className="flex flex-1 min-h-0">
          <WorkoutPlanViewDialogSidebar
            meta={meta}
            plan={plan}
            isActivePlan={isActivePlan}
            viewMode={viewMode}
            setViewMode={setViewMode}
            expandedWeeks={expandedWeeks}
            toggleWeek={toggleWeek}
            selectedWeek={selectedWeek}
            selectedDay={selectedDay}
            selectDay={selectDay}
          />
          <div className="flex-1 flex flex-col overflow-hidden min-h-0">
            {viewMode === "day" &&
              !currentDay?.isRestDay &&
              plan.substitutions &&
              plan.substitutions.length > 0 && (
                <div className="absolute top-6 right-16 z-5">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setSubstitutionsOpen(true)}
                    className="gap-2 text-primary"
                  >
                    <HugeiconsIcon icon={RepeatIcon} className="h-4 w-4" />
                    Alternatives
                  </Button>
                </div>
              )}

            {viewMode === "overview" ? (
              <WorkoutPlanViewDialogOverview plan={plan} />
            ) : (
              <WorkoutPlanViewDialogContent
                currentDay={currentDay}
                selectedWeek={selectedWeek}
                selectedDay={selectedDay}
              />
            )}
          </div>
        </div>

        <WorkoutPlanViewDialogSubstitutionPanel
          isOpen={substitutionsOpen}
          onClose={() => setSubstitutionsOpen(false)}
          substitutions={plan.substitutions}
        />
      </DialogContent>
    </Dialog>
  );
}
