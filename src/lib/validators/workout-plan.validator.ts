import { z } from "zod";

const IntensityGuidanceSchema = z
  .object({
    type: z.string(),
    value: z.string(),
  })
  .strict();

const WarmupCooldownSchema = z
  .object({
    name: z.string(),
    durationMinutes: z.number().nonnegative(),
    focus: z.string(),
    notes: z.string(),
  })
  .strict();

const WorkoutExerciseSchema = z
  .object({
    exercise: z.string(),
    movementPattern: z.enum([
      "squat",
      "hinge",
      "push",
      "pull",
      "carry",
      "core",
      "locomotion",
    ]),
    role: z.enum(["main_lift", "secondary", "accessory", "finisher"]),
    sets: z.number().nonnegative(),
    reps: z.string(),
    restSeconds: z.number().nonnegative(),
    intensityGuidance: IntensityGuidanceSchema,
    tempo: z.string(),
    notes: z.string(),
  })
  .strict();

const DaySchema = z
  .object({
    day: z.number().nonnegative(),
    dayLabel: z.string(),
    focus: z.string(),
    isRestDay: z.boolean(),
    sessionIntent: z.string(),
    totalDurationMinutes: z.number().nonnegative(),
    warmup: z.array(WarmupCooldownSchema),
    workout: z.array(WorkoutExerciseSchema),
    cooldown: z.array(WarmupCooldownSchema),
  })
  .strict();

const WeekSchema = z
  .object({
    week: z.number().nonnegative(),
    weekLabel: z.string(),
    focus: z.string(),
    isDeloadWeek: z.boolean(),
    days: z.array(DaySchema).nonempty(),
  })
  .strict();

const ProgressionSummarySchema = z
  .object({
    strategy: z.string(),
    notes: z.array(z.string()),
  })
  .strict();

const SubstitutionSchema = z
  .object({
    exercise: z.string(),
    movementPattern: z.string(),
    alternatives: z.array(z.string()),
  })
  .strict();

const RecoveryGuidanceSchema = z
  .object({
    recommendedRestDays: z.number().nonnegative(),
    sorenessExpectations: z.string(),
    mobilityFocus: z.array(z.string()),
  })
  .strict();

const NoteSchema = z.object({
  safety: z.array(z.string()),
  general: z.array(z.string()),
});

const PlanSchema = z
  .object({
    schedule: z.array(WeekSchema).nonempty(),
    progressionSummary: ProgressionSummarySchema,
    substitutions: z.array(SubstitutionSchema),
    recoveryGuidance: RecoveryGuidanceSchema,
    notes: NoteSchema,
  })
  .strict();

const MetaSchema = z
  .object({
    planName: z.string(),
    planDescription: z.string(),
    planDurationWeeks: z.number().nonnegative(),
  })
  .strict();

export const WorkoutPlanSchema = z
  .object({
    meta: MetaSchema,
    plan: PlanSchema,
  })
  .strict();

function normalizeAIJson(raw: string): unknown {
  const trimmed = raw.trim();

  // Case 1: already valid JSON object
  try {
    const parsed = JSON.parse(trimmed);
    if (typeof parsed === "object") return parsed;

    // Case 2: parsed is a string → try parsing again
    if (typeof parsed === "string") {
      return JSON.parse(parsed);
    }
  } catch {
    // fall through
  }

  throw new Error("Invalid AI JSON output");
}

export function validateWorkoutPlanJSON(rawText: string) {
  try {
    const normalized = normalizeAIJson(rawText);
    const result = WorkoutPlanSchema.parse(normalized);

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

export type WorkoutPlan = z.infer<typeof WorkoutPlanSchema>;
