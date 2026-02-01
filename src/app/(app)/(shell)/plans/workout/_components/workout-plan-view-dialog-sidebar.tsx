import { Meta, Plan } from "@/lib/validators/workout-plan.validator";
import { cn } from "@/lib/shared/utils";
import { HugeiconsIcon } from "@hugeicons/react";
import { Badge } from "@/components/ui/badge";
import {
  BookOpen01Icon,
  Calendar03Icon,
  ChevronDown,
  ChevronRight,
  Dumbbell01Icon,
  TargetIcon,
} from "@hugeicons/core-free-icons";

export function WorkoutPlanViewDialogSidebar({
  meta,
  plan,
  isActivePlan,
  viewMode,
  setViewMode,
  expandedWeeks,
  toggleWeek,
  selectedWeek,
  selectedDay,
  selectDay,
}: {
  meta: Meta;
  plan: Plan;
  isActivePlan: boolean;
  viewMode: "day" | "overview";
  setViewMode: (mode: "day" | "overview") => void;
  expandedWeeks: Set<number>;
  toggleWeek: (weekNum: number) => void;
  selectedWeek: number;
  selectedDay: number;
  selectDay: (weekNum: number, dayNum: number) => void;
}) {
  return (
    <div className="w-80 border-r border-border bg-linear-to-b from-muted/20 to-background flex flex-col min-h-0">
      {/* Header */}
      <div className="p-5 border-b border-border bg-card/80 backdrop-blur-sm">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 rounded-xl bg-primary/10 border border-primary/20">
            <HugeiconsIcon
              icon={Dumbbell01Icon}
              className="h-5 w-5 text-primary"
            />
          </div>
          <h2 className="font-semibold text-xl text-foreground flex-1">
            {meta.planName}
          </h2>
          {isActivePlan && (
            <Badge
              variant="outline"
              className="bg-emerald-500/10 text-emerald-600 border-emerald-500/20 text-[10px] px-2 py-0.5 font-semibold"
            >
              ACTIVE
            </Badge>
          )}
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed">
          {meta.planDescription}
        </p>
        <div className="flex items-center gap-2 mt-4">
          <Badge variant="secondary" className="text-xs font-medium">
            <HugeiconsIcon icon={Calendar03Icon} className="h-3 w-3 mr-1" />
            {meta.planDurationWeeks} Weeks
          </Badge>
          <Badge variant="secondary" className="text-xs font-medium">
            <HugeiconsIcon icon={TargetIcon} className="h-3 w-3 mr-1" />
            {plan.schedule.reduce(
              (acc: number, week) =>
                acc + week.days.filter((d) => !d.isRestDay).length,
              0,
            )}{" "}
            Days
          </Badge>
        </div>
        <button
          onClick={() => setViewMode("overview")}
          className={cn(
            "mt-4 w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-xs font-medium transition-all duration-200 focus-visible:outline-primary focus-visible:outline-1",
            viewMode === "overview"
              ? "bg-primary text-primary-foreground shadow-sm"
              : "bg-muted/50 text-foreground hover:bg-muted",
          )}
        >
          <HugeiconsIcon icon={BookOpen01Icon} className="h-3.5 w-3.5" />
          Plan Overview
        </button>
      </div>

      {/* Week/Day Tree Navigation */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden">
        <div className="p-2.5">
          {plan.schedule.map((week) => (
            <div key={week.week} className="mb-1.5">
              {/* Week Header */}
              <button
                onClick={() => toggleWeek(week.week)}
                className="w-full flex items-center gap-2.5 p-2.5 rounded-lg hover:bg-muted/50 transition-all duration-200 text-left group focus-visible:outline-primary focus-visible:outline-1"
              >
                <HugeiconsIcon
                  icon={
                    expandedWeeks.has(week.week) ? ChevronDown : ChevronRight
                  }
                  className="h-4 w-4 text-foreground/50 group-hover:text-foreground/70 transition-colors"
                />
                <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary/10 border border-primary/20 text-primary text-xs font-semibold shrink-0">
                  W{week.week}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm text-foreground truncate">
                    {week.weekLabel}
                  </p>
                  <p className="text-xs text-muted-foreground truncate leading-tight">
                    {week.focus}
                  </p>
                </div>
                {week.isDeloadWeek && (
                  <Badge
                    variant="outline"
                    className="text-[10px] px-2 py-0.5 bg-amber-500/10 text-amber-600 border-amber-500/20 border-dashed font-medium"
                  >
                    Deload
                  </Badge>
                )}
              </button>

              {/* Day List */}
              {expandedWeeks.has(week.week) && (
                <div className="ml-7.5 space-y-0.5">
                  {week.days.map((day) => (
                    <button
                      key={day.day}
                      onClick={() => selectDay(week.week, day.day)}
                      className={cn(
                        "w-full flex items-center gap-2.5 p-2 rounded-lg transition-all duration-200 text-left focus-visible:outline-primary focus-visible:outline-1",
                        selectedWeek === week.week &&
                          selectedDay === day.day &&
                          viewMode === "day"
                          ? "bg-primary text-primary-foreground shadow-sm"
                          : "hover:bg-muted/40",
                      )}
                    >
                      <div
                        className={cn(
                          "flex items-center justify-center w-7 h-7 rounded text-xs font-semibold shrink-0",
                          selectedWeek === week.week &&
                            selectedDay === day.day &&
                            viewMode === "day"
                            ? "bg-primary-foreground/20"
                            : day.isRestDay
                              ? "bg-emerald-500/15 text-emerald-600"
                              : "bg-primary/10 text-primary",
                        )}
                      >
                        D{day.day}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p
                          className={cn(
                            "font-medium text-xs truncate",
                            selectedWeek === week.week &&
                              selectedDay === day.day &&
                              viewMode === "day"
                              ? "text-primary-foreground"
                              : "text-foreground",
                          )}
                        >
                          {day.dayLabel}
                        </p>
                        {!day.isRestDay && (
                          <p
                            className={cn(
                              "text-[10px]",
                              selectedWeek === week.week &&
                                selectedDay === day.day &&
                                viewMode === "day"
                                ? "text-primary-foreground/70"
                                : "text-foreground/60",
                            )}
                          >
                            {day.workout?.length || 0} exercises -{" "}
                            {day.totalDurationMinutes}m
                          </p>
                        )}
                      </div>
                      {day.isRestDay && (
                        <Badge
                          variant="outline"
                          className="text-[10px] px-2 py-0 bg-emerald-500/10 text-emerald-600 border-emerald-500/30"
                        >
                          Rest Day
                        </Badge>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
