import { nanoid } from "nanoid";
import { generateText } from "ai";
import { openrouter } from "@/lib/server/open-router";
import { db } from "@/lib/server/db/drizzle";
import { and, desc, eq } from "drizzle-orm";
import {
  assertPlanTemplateVersion,
  validateAnswersAgainstPlan,
  buildUserPrompt,
  sanitizeAnswers,
} from "@/lib/domain/plan.helpers";
import {
  validateWorkoutPlanJSON,
  WorkoutPlan,
} from "@/lib/validators/workout-plan.validator";
import {
  workoutPlanRequestsTable,
  workoutPlansTable,
  workoutSessionLogsTable,
} from "@/lib/server/db/schema";
import { ACTIVE_WORKOUT_PLAN } from "@/lib/templates";
import { WORKOUT_PLAN_SYSTEM_PROMPT } from "@/lib/server/ai/ai-prompts";
import { WORKOUT_PLAN_RESPONSE_SCHEMA_VERSION } from "@/lib/server/ai/schema";

type WorkoutSessionLogs = {
  id: string;
  plan_id: string;
  user_id: string;
  week_number: number;
  day_number: number;
  workout_date: Date;
  is_rest_day: boolean;
  warmup_completed: boolean;
  main_workout_completed: boolean;
  cooldown_completed: boolean;
  workout_status: "PENDING" | "COMPLETED" | "SKIPPED" | "MISSED";
  completed_at: Date | null;
};

export async function createWorkoutPlan({
  userId,
  planTemplateId,
  planTemplateVersion,
  answers,
}: {
  userId: string;
  planTemplateId: string;
  planTemplateVersion: string;
  answers: Record<string, unknown>;
}) {
  assertPlanTemplateVersion({ plan: ACTIVE_WORKOUT_PLAN, planTemplateVersion });

  const sanitizedAnswers = sanitizeAnswers({
    plan: ACTIVE_WORKOUT_PLAN,
    answers,
  });
  validateAnswersAgainstPlan({
    plan: ACTIVE_WORKOUT_PLAN,
    answers: sanitizedAnswers,
  });

  const userPrompt = buildUserPrompt({
    plan: ACTIVE_WORKOUT_PLAN,
    answers: sanitizedAnswers,
  });

  const MAX_RETRIES = 2;
  let attempt = 1;
  let response: { raw: string; parsed: WorkoutPlan } | undefined;

  while (attempt <= MAX_RETRIES) {
    try {
      response = await generateWorkoutPlan({ userPrompt });
      break;
    } catch (error) {
      console.error(
        `Attempt ${attempt} to generate workout plan failed:`,
        error,
      );
      attempt++;
      if (attempt > MAX_RETRIES) {
        throw new Error(
          "Failed to generate a valid workout plan after multiple attempts.",
        );
      }
    }
  }

  let planId: string;
  try {
    planId = await saveWorkoutPlanToDB({
      userId,
      planTemplateId,
      planTemplateVersion,
      answers: sanitizedAnswers,
      aiResponse: response!,
    });
  } catch (error) {
    console.error("Error saving workout plan to DB:", error);
    throw new Error(
      "Failed to save workout plan to the database.",
      error as Error,
    );
  }

  try {
    const isFirstPlan = await checkIfFirstWorkoutPlanForUser({ userId });

    if (isFirstPlan) {
      await activateWorkoutPlan({
        userId,
        planId,
      });
    }
  } catch (error) {
    console.error("Error activating workout plan:", error);
    throw new Error("Failed to activate workout plan.", error as Error);
  }

  return {
    status: "generated",
    plan: response!.parsed,
  };
}

export async function generateWorkoutPlan({
  userPrompt,
}: {
  userPrompt: string;
}) {
  const { output } = await generateText({
    model: openrouter(process.env.OPEN_ROUTER_AI_MODEL!),
    prompt: userPrompt,
    system: WORKOUT_PLAN_SYSTEM_PROMPT,
  });

  const raw = output.trim();
  const validation = validateWorkoutPlanJSON(raw);

  if (validation.status === "invalid") {
    throw new Error(
      `Generated workout plan JSON is invalid: ${validation.error}`,
    );
  }

  return {
    raw,
    parsed: validation.result,
  };
}

export async function saveWorkoutPlanToDB({
  userId,
  planTemplateId,
  planTemplateVersion,
  answers,
  aiResponse,
}: {
  userId: string;
  planTemplateId: string;
  planTemplateVersion: string;
  answers: Record<string, unknown>;
  aiResponse: { raw: string; parsed: WorkoutPlan };
}) {
  const { raw, parsed } = aiResponse;

  const requestId = nanoid();
  const planId = nanoid();

  await db.insert(workoutPlanRequestsTable).values({
    id: requestId,
    user_id: userId,
    plan_template_id: planTemplateId,
    plan_template_version: planTemplateVersion,
    answers,
  });

  await db.insert(workoutPlansTable).values({
    id: planId,
    user_id: userId,
    request_id: requestId,
    plan_name: parsed.meta.planName,
    plan_description: parsed.meta.planDescription,
    plan_duration_weeks: parsed.meta.planDurationWeeks,
    session_duration_minutes: (answers.session_duration as number) ?? 0,
    primary_goals: (answers.primary_goals as string[]) ?? [],
    fitness_level: (answers.fitness_level as string) ?? "",
    weekly_frequency: (answers.weekly_frequency as string) ?? "",
    training_environment: (answers.training_environment as string) ?? "",
    plan_status: "GENERATED",
    is_active: false,
    schema_version: WORKOUT_PLAN_RESPONSE_SCHEMA_VERSION,
    raw_ai_json: raw,
    parsed_plan: parsed,
  });

  return planId;
}

export async function activateWorkoutPlan({
  userId,
  planId,
}: {
  userId: string;
  planId: string;
}) {
  const plan = await db
    .select()
    .from(workoutPlansTable)
    .where(eq(workoutPlansTable.id, planId))
    .limit(1);

  if (!plan.length) {
    throw new Error("Plan not found");
  }

  const planData = plan[0];
  const parsedPlan = planData.parsed_plan as WorkoutPlan;

  await deactivateCurrentPlan({ userId });

  const startDate = new Date();
  startDate.setHours(0, 0, 0, 0); // Start of day

  await db
    .update(workoutPlansTable)
    .set({
      is_active: true,
      plan_start_date: startDate,
    })
    .where(eq(workoutPlansTable.id, planId));

  await prepopulateSessionLogs({
    userId,
    planId,
    parsedPlan,
    startDate,
  });
}

export async function deactivateCurrentPlan({ userId }: { userId: string }) {
  await db
    .update(workoutPlansTable)
    .set({
      is_active: false,
      plan_start_date: null,
    })
    .where(
      and(
        eq(workoutPlansTable.user_id, userId),
        eq(workoutPlansTable.is_active, true),
      ),
    );
}

export async function prepopulateSessionLogs({
  planId,
  userId,
  parsedPlan,
  startDate,
}: {
  planId: string;
  userId: string;
  parsedPlan: WorkoutPlan;
  startDate: Date;
}) {
  /*
    Status flow:
    - PENDING: Today or future, not yet completed
    - COMPLETED: User marked complete
    - SKIPPED: Rest day (no user action required)
    - MISSED: Past date with PENDING status (requires CRON job to update)
  */
  const sessionLogs: Array<WorkoutSessionLogs> = [];

  for (const week of parsedPlan.plan.schedule) {
    for (const day of week.days) {
      const dayDate = new Date(startDate);
      // Calculate the date: (week - 1) * 7 + (day - 1) days from start
      const daysOffset = (week.week - 1) * 7 + (day.day - 1);
      dayDate.setDate(startDate.getDate() + daysOffset);

      const isRestDay = day.isRestDay || false;

      sessionLogs.push({
        id: nanoid(),
        plan_id: planId,
        user_id: userId,
        week_number: week.week,
        day_number: day.day,
        workout_date: dayDate,
        is_rest_day: isRestDay,
        warmup_completed: false,
        main_workout_completed: false,
        cooldown_completed: false,
        workout_status: isRestDay ? "SKIPPED" : "PENDING",
        completed_at: null,
      });
    }
  }

  if (sessionLogs.length > 0) {
    await db.insert(workoutSessionLogsTable).values(sessionLogs);
  }
}

export async function checkIfFirstWorkoutPlanForUser({
  userId,
}: {
  userId: string;
}) {
  const result = await db
    .select()
    .from(workoutPlansTable)
    .where(eq(workoutPlansTable.user_id, userId));

  return result.length === 1;
}

export async function getWorkoutPlansForUser({ userId }: { userId: string }) {
  const plans = await db
    .select({
      id: workoutPlansTable.id,
      name: workoutPlansTable.plan_name,
      description: workoutPlansTable.plan_description,
      durationWeeks: workoutPlansTable.plan_duration_weeks,
      isActive: workoutPlansTable.is_active,
      primaryGoals: workoutPlansTable.primary_goals,
      fitnessLevel: workoutPlansTable.fitness_level,
      weeklyFrequency: workoutPlansTable.weekly_frequency,
      sessionDurationMinutes: workoutPlansTable.session_duration_minutes,
      trainingEnvironment: workoutPlansTable.training_environment,
      startDate: workoutPlansTable.plan_start_date,
      createdAt: workoutPlansTable.created_at,
    })
    .from(workoutPlansTable)
    .where(eq(workoutPlansTable.user_id, userId))
    .orderBy(desc(workoutPlansTable.created_at));

  return plans;
}

export async function getWorkoutPlanDetailsById({
  userId,
  planId,
}: {
  userId: string;
  planId: string;
}) {
  const data = await db
    .select({
      plan: workoutPlansTable.parsed_plan,
    })
    .from(workoutPlansTable)
    .where(
      and(
        eq(workoutPlansTable.id, planId),
        eq(workoutPlansTable.user_id, userId),
      ),
    )
    .limit(1)
    .then((results) => results[0]);

  return data.plan || null;
}

export async function getActiveWorkoutPlanForUser({
  userId,
}: {
  userId: string;
}) {
  const data = await db
    .select({
      plan: workoutPlansTable.parsed_plan,
    })
    .from(workoutPlansTable)
    .where(
      and(
        eq(workoutPlansTable.user_id, userId),
        eq(workoutPlansTable.is_active, true),
      ),
    )
    .limit(1)
    .then((results) => results[0]);

  return data?.plan || null;
}
