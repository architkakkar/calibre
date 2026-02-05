import "server-only";

import { db } from "@/lib/server/db/drizzle";
import { eq, and, gte, lte } from "drizzle-orm";
import {
  workoutPlansTable,
  workoutSessionLogsTable,
  nutritionPlansTable,
  nutritionPlanDaysTable,
  nutritionMealLogsTable,
  hydrationSettingsTable,
  hydrationLogsTable,
} from "@/lib/server/db/schema";
import {
  addDays,
  extractWorkoutFromParsedPlan,
  extractMealsFromParsedPlan,
  extractTargetsFromParsedPlan,
  calculateNutritionProgress,
} from "@/lib/domain/dashboard.helpers";
import {
  completeWorkoutInputSchema,
  completeMealInputSchema,
  addWaterInputSchema,
  updateHydrationTargetInputSchema,
  type TodayWorkoutResponse,
  type CompleteWorkoutInput,
  type CompleteWorkoutResponse,
  type TodayNutritionResponse,
  type CompleteMealInput,
  type CompleteMealResponse,
  type TodayHydrationResponse,
  type AddWaterInput,
  type AddWaterResponse,
  type UpdateHydrationTargetInput,
  type UpdateHydrationTargetResponse,
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

export async function getTodayNutrition({
  userId,
}: {
  userId: string;
}): Promise<TodayNutritionResponse> {
  let today = new Date();
  today = addDays.call(today, 2); // for testing purposes only
  today.setHours(0, 0, 0, 0);
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  // Get active nutrition plan
  const activePlan = await db
    .select()
    .from(nutritionPlansTable)
    .where(
      and(
        eq(nutritionPlansTable.user_id, userId),
        eq(nutritionPlansTable.is_active, true),
      ),
    )
    .limit(1);

  if (!activePlan.length) {
    return { hasActivePlan: false };
  }

  const plan = activePlan[0];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const parsedPlan: any = plan.parsed_plan;

  // Get or create today's nutrition day
  let todayPlanDay = await db
    .select()
    .from(nutritionPlanDaysTable)
    .where(
      and(
        eq(nutritionPlanDaysTable.plan_id, plan.id),
        eq(nutritionPlanDaysTable.user_id, userId),
        gte(nutritionPlanDaysTable.date, today),
        lte(nutritionPlanDaysTable.date, tomorrow),
      ),
    )
    .limit(1);

  if (!todayPlanDay.length) {
    // Create today's entry
    const newDay = await db
      .insert(nutritionPlanDaysTable)
      .values({
        id: crypto.randomUUID(),
        plan_id: plan.id,
        user_id: userId,
        date: today,
      })
      .returning();

    todayPlanDay = newDay;
  }

  const planDayId = todayPlanDay[0].id;

  // Get today's meal logs
  const mealLogs = await db
    .select()
    .from(nutritionMealLogsTable)
    .where(
      and(
        eq(nutritionMealLogsTable.plan_day_id, planDayId),
        eq(nutritionMealLogsTable.user_id, userId),
      ),
    );

  // Extract targets and meals from parsed plan
  const targets = extractTargetsFromParsedPlan({ parsedPlan });
  const mealTemplates = extractMealsFromParsedPlan({ parsedPlan });

  // Calculate progress
  const progress = calculateNutritionProgress(mealLogs);

  // Count completed meals
  const mealsCompleted = mealLogs.filter(
    (log) => log.meal_status === "COMPLETED",
  ).length;
  const totalMeals = mealTemplates.length;

  return {
    hasActivePlan: true,
    planName: plan.plan_name,
    planDayId,
    targets,
    progress,
    mealsCompleted,
    totalMeals,
    meals: mealLogs.map((log) => ({
      id: log.id,
      type: log.meal_type,
      name: log.meal_name,
      calories: log.calories,
      proteinGrams: log.protein_grams,
      carbsGrams: log.carbs_grams,
      fatsGrams: log.fats_grams,
      notes: log.notes,
      status: log.meal_status as "PENDING" | "COMPLETED" | "SKIPPED" | "MISSED",
      loggedAt: log.logged_at,
    })),
  };
}

/**
 * Complete/log a meal
 */
export async function completeMeal(
  input: CompleteMealInput,
): Promise<CompleteMealResponse> {
  // Validate input
  const validated = completeMealInputSchema.parse(input);
  const {
    userId,
    planDayId,
    mealType,
    mealName,
    calories,
    proteinGrams,
    carbsGrams,
    fatsGrams,
    notes,
    status,
  } = validated;

  const mealId = crypto.randomUUID();

  await db.insert(nutritionMealLogsTable).values({
    id: mealId,
    plan_day_id: planDayId,
    user_id: userId,
    meal_type: mealType,
    meal_name: mealName || null,
    calories: calories || null,
    protein_grams: proteinGrams || null,
    carbs_grams: carbsGrams || null,
    fats_grams: fatsGrams || null,
    notes: notes || null,
    meal_status: status,
  });

  return {
    success: true,
    mealId,
  };
}

// HYDRATION FUNCTIONS
export async function getTodayHydration({
  userId,
}: {
  userId: string;
}): Promise<TodayHydrationResponse> {
  let today = new Date();
  today = addDays.call(today, 2); // for testing purposes only
  today.setHours(0, 0, 0, 0);
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  // Get user's hydration settings
  const settings = await db
    .select()
    .from(hydrationSettingsTable)
    .where(eq(hydrationSettingsTable.user_id, userId))
    .limit(1);

  const dailyTargetMl =
    settings.length > 0 ? settings[0].daily_target_ml : 2000;

  // Get today's hydration logs
  const logs = await db
    .select()
    .from(hydrationLogsTable)
    .where(
      and(
        eq(hydrationLogsTable.user_id, userId),
        gte(hydrationLogsTable.logged_at, today),
        lte(hydrationLogsTable.logged_at, tomorrow),
      ),
    );

  // Calculate total consumed
  const totalConsumedMl = logs.reduce((sum, log) => sum + log.amount_ml, 0);
  const percentage = Math.round((totalConsumedMl / dailyTargetMl) * 100);

  return {
    dailyTargetMl,
    totalConsumedMl,
    percentage,
    logs: logs.map((log) => ({
      id: log.id,
      amountMl: log.amount_ml,
      loggedAt: log.logged_at,
    })),
  };
}

/**
 * Add water intake
 */
export async function addWater(
  input: AddWaterInput,
): Promise<AddWaterResponse> {
  const validated = addWaterInputSchema.parse(input);
  const { userId, amountMl } = validated;

  const logId = crypto.randomUUID();

  await db.insert(hydrationLogsTable).values({
    id: logId,
    user_id: userId,
    amount_ml: amountMl,
  });

  return {
    success: true,
    logId,
  };
}

/**
 * Update daily hydration target
 */
export async function updateHydrationTarget(
  input: UpdateHydrationTargetInput,
): Promise<UpdateHydrationTargetResponse> {
  const validated = updateHydrationTargetInputSchema.parse(input);
  const { userId, dailyTargetMl } = validated;

  // Upsert hydration settings
  const existing = await db
    .select()
    .from(hydrationSettingsTable)
    .where(eq(hydrationSettingsTable.user_id, userId))
    .limit(1);

  if (existing.length > 0) {
    await db
      .update(hydrationSettingsTable)
      .set({
        daily_target_ml: dailyTargetMl,
        updated_at: new Date(),
      })
      .where(eq(hydrationSettingsTable.user_id, userId));
  } else {
    await db.insert(hydrationSettingsTable).values({
      user_id: userId,
      daily_target_ml: dailyTargetMl,
    });
  }

  return {
    success: true,
  };
}
