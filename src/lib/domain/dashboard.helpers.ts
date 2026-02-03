import type { WorkoutDetails } from "../validators/dashboard.validator";
import { WorkoutPlan } from "../validators/workout-plan.validator";

export function extractWorkoutFromParsedPlan({
  parsedPlan,
  weekNumber,
  dayNumber,
  sessionId,
}: {
  parsedPlan: WorkoutPlan;
  weekNumber: number;
  dayNumber: number;
  sessionId: string;
}): WorkoutDetails | null {
  try {
    const planSchedule = (parsedPlan as WorkoutPlan).plan.schedule;

    const weekData = planSchedule.find((w) => w.week === weekNumber);
    if (!weekData) return null;

    const dayData = weekData.days?.find((d) => d.day === dayNumber);
    if (!dayData) return null;

    return {
      id: sessionId,
      sessionIntent: dayData.sessionIntent || dayData.focus || "Workout",
      warmup: (dayData.warmup || []) as WorkoutDetails["warmup"],
      cooldown: (dayData.cooldown || []) as WorkoutDetails["cooldown"],
      exercises: (dayData.workout || []) as WorkoutDetails["exercises"],
    };
  } catch (error) {
    console.error("Error extracting workout from parsed plan:", error);
    return null;
  }
}

// for testing purposes only
export function addDays(this: Date, days: number): Date {
  const date = new Date(this.valueOf());
  date.setDate(date.getDate() + days);

  return date;
}
