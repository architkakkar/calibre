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
  workoutPlanDaysTable,
} from "@/lib/server/db/schema";
import { ACTIVE_WORKOUT_PLAN } from "@/lib/templates";
import { WORKOUT_PLAN_SYSTEM_PROMPT } from "@/lib/server/ai/ai-prompts";
import { WORKOUT_PLAN_RESPONSE_SCHEMA_VERSION } from "@/lib/server/ai/schema";

type PlanDaysType = {
  id: string;
  plan_id: string;
  week_number: number;
  week_label: string;
  day_number: number;
  day_label: string;
  day_focus: string;
  is_rest_day: boolean;
  session_intent: string;
  total_duration_minutes: number;
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
  const planDays: Array<PlanDaysType> = [];

  for (const week of parsed.plan.schedule) {
    for (const day of week.days) {
      planDays.push({
        id: nanoid(),
        plan_id: planId,
        week_number: week.week,
        week_label: week.weekLabel,
        day_number: day.day,
        day_label: day.dayLabel,
        day_focus: day.focus,
        is_rest_day: day.isRestDay,
        session_intent: day.sessionIntent,
        total_duration_minutes: day.totalDurationMinutes,
      });
    }
  }

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

  if (planDays.length > 0) {
    await db.insert(workoutPlanDaysTable).values(planDays);
  }

  return planId;
}

export async function activateWorkoutPlan({
  userId,
  planId,
}: {
  userId: string;
  planId: string;
}) {
  // deactivate any currently active plan for the user
  await db
    .update(workoutPlansTable)
    .set({
      is_active: false,
      plan_status: "ARCHIVED",
    })
    .where(
      and(
        eq(workoutPlansTable.user_id, userId),
        eq(workoutPlansTable.is_active, true),
      ),
    );

  // activate the selected plan
  await db
    .update(workoutPlansTable)
    .set({
      is_active: true,
      plan_start_date: new Date(),
    })
    .where(eq(workoutPlansTable.id, planId));
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
