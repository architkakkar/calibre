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
  validateNutritionPlanJSON,
  NutritionPlan,
  MealTemplate,
} from "@/lib/validators/nutrition-plan.validator";
import {
  nutritionPlanRequestsTable,
  nutritionPlansTable,
} from "@/lib/server/db/schema";
import { ACTIVE_NUTRITION_PLAN } from "@/lib/templates";
import { NUTRITION_PLAN_SYSTEM_PROMPT } from "@/lib/server/ai/ai-prompts";
import { NUTRITION_PLAN_RESPONSE_SCHEMA_VERSION } from "@/lib/server/ai/schema";

export async function createNutritionPlan({
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
  assertPlanTemplateVersion({
    plan: ACTIVE_NUTRITION_PLAN,
    planTemplateVersion,
  });

  const sanitizedAnswers = sanitizeAnswers({
    plan: ACTIVE_NUTRITION_PLAN,
    answers,
  });
  validateAnswersAgainstPlan({
    plan: ACTIVE_NUTRITION_PLAN,
    answers: sanitizedAnswers,
  });

  const userPrompt = buildUserPrompt({
    plan: ACTIVE_NUTRITION_PLAN,
    answers: sanitizedAnswers,
  });

  const MAX_RETRIES = 2;
  let attempt = 1;
  let response: { raw: string; parsed: NutritionPlan } | undefined;

  while (attempt <= MAX_RETRIES) {
    try {
      response = await generateNutritionPlan({ userPrompt });
      break;
    } catch (error) {
      console.error(
        `Attempt ${attempt} to generate nutrition plan failed:`,
        error,
      );
      attempt++;
      if (attempt > MAX_RETRIES) {
        throw new Error(
          "Failed to generate a valid nutrition plan after multiple attempts.",
        );
      }
    }
  }

  let planId: string;
  try {
    planId = await saveNutritionPlanToDB({
      userId,
      planTemplateId,
      planTemplateVersion,
      answers: sanitizedAnswers,
      aiResponse: response!,
    });
  } catch (error) {
    console.error("Error saving nutrition plan to DB:", error);
    throw new Error(
      "Failed to save nutrition plan to the database.",
      error as Error,
    );
  }

  try {
    const isFirstPlan = await checkIfFirstNutritionPlanForUser({ userId });

    if (isFirstPlan) {
      await activateNutritionPlan({
        userId,
        planId,
      });
    }
  } catch (error) {
    console.error("Error activating nutrition plan:", error);
    throw new Error("Failed to activate nutrition plan.", error as Error);
  }

  return {
    status: "generated",
    plan: response!.parsed,
  };
}

export async function generateNutritionPlan({
  userPrompt,
}: {
  userPrompt: string;
}) {
  const { output } = await generateText({
    model: openrouter(process.env.OPEN_ROUTER_AI_MODEL!),
    prompt: userPrompt,
    system: NUTRITION_PLAN_SYSTEM_PROMPT,
  });

  const raw = output.trim();
  const validation = validateNutritionPlanJSON(raw);
  if (validation.status === "invalid") {
    throw new Error(
      `Generated nutrition plan JSON is invalid: ${validation.error}`,
    );
  }

  return {
    raw,
    parsed: validation.result,
  };
}

export async function saveNutritionPlanToDB({
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
  aiResponse: { raw: string; parsed: NutritionPlan };
}) {
  const { raw, parsed } = aiResponse;

  const requestId = nanoid();
  const planId = nanoid();

  await db.insert(nutritionPlanRequestsTable).values({
    id: requestId,
    user_id: userId,
    plan_template_id: planTemplateId,
    plan_template_version: planTemplateVersion,
    answers,
  });

  await db.insert(nutritionPlansTable).values({
    id: planId,
    user_id: userId,
    request_id: requestId,
    plan_name: parsed.meta.planName,
    plan_description: parsed.meta.planDescription,
    plan_duration_weeks: parsed.meta.planDurationWeeks,
    primary_goal: (answers.primary_goal as string) ?? "",
    diet_type: (answers.diet_type as string) ?? "",
    meals_per_day: (answers.meals_per_day as string) ?? "0",
    budget_level: (answers.budget_level as string) ?? "0",
    eating_out_frequency: (answers.eating_out_frequency as string) ?? "",
    allergies: (answers.allergies as string[]) || [],
    plan_status: "GENERATED",
    is_active: false,
    schema_version: NUTRITION_PLAN_RESPONSE_SCHEMA_VERSION,
    raw_ai_json: raw,
    parsed_plan: parsed,
  });

  return planId;
}

export async function activateNutritionPlan({
  userId,
  planId,
}: {
  userId: string;
  planId: string;
}) {
  // deactivate any currently active plan for the user
  await db
    .update(nutritionPlansTable)
    .set({
      is_active: false,
      plan_status: "ARCHIVED",
    })
    .where(
      and(
        eq(nutritionPlansTable.user_id, userId),
        eq(nutritionPlansTable.is_active, true),
      ),
    );

  // activate the selected plan
  await db
    .update(nutritionPlansTable)
    .set({
      is_active: true,
      plan_start_date: new Date(),
    })
    .where(eq(nutritionPlansTable.id, planId));
}

export async function checkIfFirstNutritionPlanForUser({
  userId,
}: {
  userId: string;
}) {
  const result = await db
    .select()
    .from(nutritionPlansTable)
    .where(eq(nutritionPlansTable.user_id, userId));

  return result.length === 1;
}

export async function getNutritionPlansForUser({ userId }: { userId: string }) {
  const plans = await db
    .select({
      id: nutritionPlansTable.id,
      name: nutritionPlansTable.plan_name,
      description: nutritionPlansTable.plan_description,
      isActive: nutritionPlansTable.is_active,
      primaryGoal: nutritionPlansTable.primary_goal,
      dietType: nutritionPlansTable.diet_type,
      mealsPerDay: nutritionPlansTable.meals_per_day,
      budgetLevel: nutritionPlansTable.budget_level,
      eatingOutFrequency: nutritionPlansTable.eating_out_frequency,
      allergies: nutritionPlansTable.allergies,
      startDate: nutritionPlansTable.plan_start_date,
      createdAt: nutritionPlansTable.created_at,
      parsedPlan: nutritionPlansTable.parsed_plan,
    })
    .from(nutritionPlansTable)
    .where(eq(nutritionPlansTable.user_id, userId))
    .orderBy(desc(nutritionPlansTable.created_at));

  // Extract key nutrition metrics from parsed_plan
  return plans.map((plan) => {
    const parsedPlan = plan.parsedPlan as NutritionPlan | null;

    return {
      id: plan.id,
      name: plan.name,
      description: plan.description,
      isActive: plan.isActive,
      primaryGoal: plan.primaryGoal,
      dietType: plan.dietType,
      mealsPerDay: plan.mealsPerDay,
      budgetLevel: plan.budgetLevel,
      averageDailyCalories:
        parsedPlan?.plan?.targets?.averageDailyCalories || 0,
      macros: parsedPlan?.plan?.targets?.macros || {
        proteinGrams: 0,
        carbsGrams: 0,
        fatsGrams: 0,
        calories: 0,
      },
      totalMealOptions:
        parsedPlan?.plan?.meals?.templates?.reduce(
          (sum: number, template: MealTemplate) =>
            sum + (template.mealOptions?.length || 0),
          0,
        ) || 0,
      eatingOutFrequency: plan.eatingOutFrequency,
      allergies: plan.allergies,
      startDate: plan.startDate,
      createdAt: plan.createdAt,
    };
  });
}

export async function getNutritionPlanDetailsById({
  userId,
  planId,
}: {
  userId: string;
  planId: string;
}) {
  const data = await db
    .select({
      plan: nutritionPlansTable.parsed_plan,
    })
    .from(nutritionPlansTable)
    .where(
      and(
        eq(nutritionPlansTable.id, planId),
        eq(nutritionPlansTable.user_id, userId),
      ),
    )
    .limit(1)
    .then((results) => results[0]);

  return data.plan || null;
}
