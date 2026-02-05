import "server-only";

import { db } from "@/lib/server/db/drizzle";
import { eq, and } from "drizzle-orm";
import {
  workoutPlansTable,
  workoutSessionLogsTable,
} from "@/lib/server/db/schema";
import { addDays, extractWorkoutFromParsedPlan } from "@/lib/domain/dashboard.helpers";
import {
  completeWorkoutInputSchema,
  type TodayWorkoutResponse,
  type CompleteWorkoutInput,
  type CompleteWorkoutResponse,
} from "@/lib/validators/dashboard.validator";
import { WorkoutPlan } from "@/lib/validators/workout-plan.validator";

export async function getTodayWorkout({
  userId,
}: {
  userId: string;
}): Promise<TodayWorkoutResponse> {
  let today = new Date();
  today = addDays.call(today, 2); // for testing purposes only
  today.setHours(0, 0, 0, 0);

  const sessionLog = await db
    .select({
      session: workoutSessionLogsTable,
      plan: workoutPlansTable,
    })
    .from(workoutSessionLogsTable)
    .innerJoin(
      workoutPlansTable,
      eq(workoutSessionLogsTable.plan_id, workoutPlansTable.id),
    )
    .where(
      and(
        eq(workoutSessionLogsTable.user_id, userId),
        eq(workoutSessionLogsTable.workout_date, today),
        eq(workoutPlansTable.is_active, true),
      ),
    )
    .limit(1);

  if (sessionLog.length === 0) {
    return { hasActivePlan: false };
  }

  const { session, plan: planData } = sessionLog[0];

  if (session.is_rest_day) {
    return {
      hasActivePlan: true,
      isRestDay: true,
      planName: planData.plan_name,
      currentWeek: session.week_number,
      currentDay: session.day_number,
      workoutStatus: session.workout_status,
      isCompleted: session.workout_status === "SKIPPED",
      workout: null,
      sections: {
        warmup: false,
        mainWorkout: false,
        cooldown: false,
      },
      difficultyRating: null,
      notes: null,
    };
  }

  const workout = extractWorkoutFromParsedPlan({
    parsedPlan: planData.parsed_plan as WorkoutPlan,
    weekNumber: session.week_number,
    dayNumber: session.day_number,
    sessionId: session.id,
  });

  if (!workout) {
    return { hasActivePlan: false };
  }

  return {
    hasActivePlan: true,
    isRestDay: false,
    planName: planData.plan_name,
    currentWeek: session.week_number,
    currentDay: session.day_number,
    workoutStatus: session.workout_status,
    isCompleted: session.workout_status === "COMPLETED",
    workout,
    sections: {
      warmup: session.warmup_completed,
      mainWorkout: session.main_workout_completed,
      cooldown: session.cooldown_completed,
    },
    difficultyRating: session.difficulty_rating,
    notes: session.notes,
  };
}

/**
 * Complete workout sections
 */
export async function completeWorkout(
  input: CompleteWorkoutInput,
): Promise<CompleteWorkoutResponse> {
  // Validate input
  const validated = completeWorkoutInputSchema.parse(input);
  const { userId, sessionId, sections, difficultyRating, notes } = validated;

  const allSectionsComplete =
    sections.warmup && sections.mainWorkout && sections.cooldown;

  await db
    .update(workoutSessionLogsTable)
    .set({
      warmup_completed: sections.warmup,
      main_workout_completed: sections.mainWorkout,
      cooldown_completed: sections.cooldown,
      workout_status: allSectionsComplete ? "COMPLETED" : "PENDING",
      completed_at: allSectionsComplete ? new Date() : null,
      difficulty_rating: difficultyRating,
      notes: notes,
    })
    .where(
      and(
        eq(workoutSessionLogsTable.id, sessionId),
        eq(workoutSessionLogsTable.user_id, userId),
      ),
    );

  return {
    success: true,
    status: allSectionsComplete ? "COMPLETED" : "PENDING",
  };
}
