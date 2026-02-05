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

export function extractMealsFromParsedPlan({
  parsedPlan,
}: {
  parsedPlan: any;
}): Array<{
  type: string;
  name: string;
  calories: number | null;
  proteinGrams: number | null;
  carbsGrams: number | null;
  fatsGrams: number | null;
}> {
  const meals = parsedPlan?.meals || [];

  return meals.map((meal: any) => ({
    type: meal.type || "Meal",
    name: meal.name || "",
    calories: meal.calories || null,
    proteinGrams: meal.proteinGrams || null,
    carbsGrams: meal.carbsGrams || null,
    fatsGrams: meal.fatsGrams || null,
  }));
}

/**
 * Extract nutrition targets from parsed plan
 */
export function extractTargetsFromParsedPlan({
  parsedPlan,
}: {
  parsedPlan: any;
}): {
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
} {
  const targets = parsedPlan?.targets || {};

  return {
    calories: targets.caloriesTrainingDay || targets.calories || 2000,
    protein: targets.proteinGrams || 150,
    carbs: targets.carbsGrams || 200,
    fats: targets.fatsGrams || 60,
  };
}

/**
 * Calculate nutrition progress from meal logs
 */
export function calculateNutritionProgress(
  mealLogs: Array<{
    calories: number | null;
    protein_grams: number | null;
    carbs_grams: number | null;
    fats_grams: number | null;
    meal_status: string;
  }>,
): {
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
} {
  // Only count completed meals
  const completedMeals = mealLogs.filter(
    (log) => log.meal_status === "COMPLETED",
  );

  return completedMeals.reduce(
    (acc, log) => ({
      calories: acc.calories + (log.calories || 0),
      protein: acc.protein + (log.protein_grams || 0),
      carbs: acc.carbs + (log.carbs_grams || 0),
      fats: acc.fats + (log.fats_grams || 0),
    }),
    { calories: 0, protein: 0, carbs: 0, fats: 0 },
  );
}