import { z } from "zod";

const MacroSchema = z
  .object({
    proteinGrams: z.number().nonnegative(),
    carbsGrams: z.number().nonnegative(),
    fatsGrams: z.number().nonnegative(),
    calories: z.number().nonnegative(),
  })
  .strict();

const TargetsSchema = z
  .object({
    averageDailyCalories: z.number().nonnegative(),
    trainingDayCalories: z.number().nonnegative(),
    restDayCalories: z.number().nonnegative(),
    macros: MacroSchema,
    macroStrategy: z.string(),
  })
  .strict();

const StructureSchema = z
  .object({
    mealsPerDay: z.number().int().positive(),
    mealTimingStrategy: z.string(),
    hydrationGuidelines: z.string(),
    supplementGuidance: z.string(),
  })
  .strict();

const FoodSchema = z
  .object({
    name: z.string(),
    quantity: z.string(),
    notes: z.string(),
  })
  .strict();

const MealOptionSchema = z
  .object({
    mealName: z.string(),
    foods: z.array(FoodSchema).nonempty(),
    estimatedMacros: MacroSchema,
  })
  .strict();

const MealTemplateSchema = z
  .object({
    mealType: z.enum(["breakfast", "lunch", "dinner", "snack"]),
    goal: z.string(),
    mealOptions: z.array(MealOptionSchema).nonempty(),
  })
  .strict();

const MealsSchema = z
  .object({
    templates: z.array(MealTemplateSchema).nonempty(),
  })
  .strict();

const AdjustmentRuleSchema = z
  .object({
    if: z.string(),
    then: z.string(),
    reasoning: z.string(),
  })
  .strict();

const AdjustmentsSchema = z
  .object({
    checkInMetrics: z.array(
      z.enum(["bodyWeight", "energyLevels", "hunger", "trainingPerformance"]),
    ),
    rules: z.array(AdjustmentRuleSchema),
  })
  .strict();

const FlexibilitySchema = z
  .object({
    eatingOut: z.object({
      frequency: z.string(),
      rules: z.array(z.string()),
    }),
    substitutions: z.array(
      z.object({
        category: z.string(),
        swapOptions: z.array(z.string()),
      }),
    ),
    budgetTips: z.array(z.string()),
  })
  .strict();

const HealthSchema = z
  .object({
    allergiesExcluded: z.array(z.string()),
    medicalNotes: z.array(z.string()),
    digestiveTip: z.string(),
    safetyNote: z.string(),
  })
  .strict();

const NotesSchema = z
  .object({
    adherenceTips: z.array(z.string()),
    commonMistakes: z.array(z.string()),
    general: z.string(),
  })
  .strict();

const PlanSchema = z
  .object({
    targets: TargetsSchema,
    structure: StructureSchema,
    meals: MealsSchema,
    adjustments: AdjustmentsSchema,
    flexibility: FlexibilitySchema,
    health: HealthSchema,
    notes: NotesSchema,
  })
  .strict();

const MetaSchema = z
  .object({
    planName: z.string(),
    planDescription: z.string(),
    planDurationWeeks: z.number().nonnegative(),
  })
  .strict();

export const NutritionPlanSchema = z
  .object({
    meta: MetaSchema,
    plan: PlanSchema,
  })
  .strict();

function normalizeAIJson(raw: string): unknown {
  const trimmed = raw.trim();

  try {
    const parsed = JSON.parse(trimmed);

    if (typeof parsed === "object") return parsed;

    if (typeof parsed === "string") {
      return JSON.parse(parsed);
    }
  } catch {
    // fall through
  }

  throw new Error("Invalid AI JSON output");
}

export function validateNutritionPlanJSON(rawText: string) {
  try {
    const normalized = normalizeAIJson(rawText);
    const result = NutritionPlanSchema.parse(normalized);

    return {
      status: "valid" as const,
      result,
    };
  } catch (error) {
    return {
      status: "invalid" as const,
      error: (error as Error).message,
    };
  }
}

export type NutritionPlan = z.infer<typeof NutritionPlanSchema>;
