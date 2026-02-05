import { z } from "zod";

export const workoutStatusSchema = z.enum([
  "PENDING",
  "COMPLETED",
  "SKIPPED",
  "MISSED",
]);

export const workoutSectionsSchema = z.object({
  warmup: z.boolean(),
  mainWorkout: z.boolean(),
  cooldown: z.boolean(),
});

const warmupCooldownItemSchema = z.object({
  name: z.string(),
  focus: z.string(),
  notes: z.string(),
  durationMinutes: z.number().nonnegative(),
});

const workoutExerciseSchema = z.object({
  exercise: z.string(),
  sets: z.number().nonnegative(),
  reps: z.string(),
  restSeconds: z.number().nonnegative(),
  tempo: z.string(),
  notes: z.string(),
});

export const workoutDetailsSchema = z.object({
  id: z.string(),
  sessionIntent: z.string(),
  warmup: z.array(warmupCooldownItemSchema),
  cooldown: z.array(warmupCooldownItemSchema),
  exercises: z.array(workoutExerciseSchema),
});

export const todayWorkoutResponseSchema = z.discriminatedUnion(
  "hasActivePlan",
  [
    // no active plan case
    z.object({
      hasActivePlan: z.literal(false),
    }),
    // active plan case
    z.object({
      hasActivePlan: z.literal(true),
      isRestDay: z.boolean(),
      planName: z.string(),
      currentWeek: z.number(),
      currentDay: z.number(),
      workoutStatus: workoutStatusSchema,
      isCompleted: z.boolean(),
      workout: workoutDetailsSchema.nullable(),
      sections: workoutSectionsSchema,
      difficultyRating: z.number().nullable(),
      notes: z.string().nullable(),
    }),
  ],
);

export const completeWorkoutInputSchema = z.object({
  userId: z.string(),
  sessionId: z.string(),
  sections: workoutSectionsSchema,
  difficultyRating: z.number().min(1).max(10).optional(),
  notes: z.string().optional(),
});

export const completeWorkoutResponseSchema = z.object({
  success: z.boolean(),
  status: workoutStatusSchema,
});

export type WorkoutStatus = z.infer<typeof workoutStatusSchema>;
export type WorkoutSections = z.infer<typeof workoutSectionsSchema>;
export type WorkoutDetails = z.infer<typeof workoutDetailsSchema>;
export type TodayWorkoutResponse = z.infer<typeof todayWorkoutResponseSchema>;
export type CompleteWorkoutInput = z.infer<typeof completeWorkoutInputSchema>;
export type CompleteWorkoutResponse = z.infer<
  typeof completeWorkoutResponseSchema
>;

// NUTRITION VALIDATORS
export const mealStatusSchema = z.enum([
  "PENDING",
  "COMPLETED",
  "SKIPPED",
  "MISSED",
]);

export const mealLogSchema = z.object({
  id: z.string(),
  type: z.string(),
  name: z.string().nullable(),
  calories: z.number().nullable(),
  proteinGrams: z.number().nullable(),
  carbsGrams: z.number().nullable(),
  fatsGrams: z.number().nullable(),
  notes: z.string().nullable(),
  status: mealStatusSchema,
  loggedAt: z.date(),
});

export const nutritionTargetsSchema = z.object({
  calories: z.number(),
  protein: z.number(),
  carbs: z.number(),
  fats: z.number(),
});

export const nutritionProgressSchema = z.object({
  calories: z.number(),
  protein: z.number(),
  carbs: z.number(),
  fats: z.number(),
});

export const todayNutritionResponseSchema = z.discriminatedUnion(
  "hasActivePlan",
  [
    // no active plan case
    z.object({
      hasActivePlan: z.literal(false),
    }),
    // active plan case
    z.object({
      hasActivePlan: z.literal(true),
      planName: z.string(),
      planDayId: z.string(),
      targets: nutritionTargetsSchema,
      progress: nutritionProgressSchema,
      mealsCompleted: z.number(),
      totalMeals: z.number(),
      meals: z.array(mealLogSchema),
    }),
  ],
);

export const completeMealInputSchema = z.object({
  userId: z.string(),
  planDayId: z.string(),
  mealType: z.string(),
  mealName: z.string().optional(),
  calories: z.number().optional(),
  proteinGrams: z.number().optional(),
  carbsGrams: z.number().optional(),
  fatsGrams: z.number().optional(),
  notes: z.string().optional(),
  status: mealStatusSchema.default("COMPLETED"),
});

export const completeMealResponseSchema = z.object({
  success: z.boolean(),
  mealId: z.string(),
});

export type MealStatus = z.infer<typeof mealStatusSchema>;
export type MealLog = z.infer<typeof mealLogSchema>;
export type NutritionTargets = z.infer<typeof nutritionTargetsSchema>;
export type NutritionProgress = z.infer<typeof nutritionProgressSchema>;
export type TodayNutritionResponse = z.infer<
  typeof todayNutritionResponseSchema
>;
export type CompleteMealInput = z.infer<typeof completeMealInputSchema>;
export type CompleteMealResponse = z.infer<typeof completeMealResponseSchema>;
