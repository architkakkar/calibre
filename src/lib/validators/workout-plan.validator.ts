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

const WeeklySessionSchema = z
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

const ProgressionPlanSchema = z
  .object({
    strategy: z.string(),
    weeklyGuidelines: z.array(z.string()),
    progressionRules: z.object({
      increaseLoad: z.boolean(),
      increaseReps: z.boolean(),
      increaseSets: z.boolean(),
    }),
    deloadGuidelines: z.string(),
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

const MetaSchema = z
  .object({
    programName: z.string(),
    programDescription: z.string(),
    programDurationWeeks: z.number().nonnegative(),
  })
  .strict();

export const WorkoutPlanSchema = z
  .object({
    meta: MetaSchema,

    weeklySchedule: z.array(WeeklySessionSchema).nonempty(),

    progressionPlan: ProgressionPlanSchema,
    substitutions: z.array(SubstitutionSchema),
    recoveryGuidance: RecoveryGuidanceSchema,
    safetyNotes: z.array(z.string()),
    generalNotes: z.array(z.string()),
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
    const plan = WorkoutPlanSchema.parse(normalized);

    return {
      status: "valid" as const,
      plan,
    };
  } catch (error) {
    return {
      status: "invalid" as const,
      error: (error as Error).message,
    };
  }
}

export type WorkoutPlan = z.infer<typeof WorkoutPlanSchema>;
