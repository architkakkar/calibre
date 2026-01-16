import { z } from "zod";

export const WorkoutPlanFormSchema = z.object({
  // STEP 1: STRATEGY
  primary_goal: z
    .array(z.string())
    .min(1, "Select at least one goal.")
    .max(3, "Select up to 3 goals max."),

  fitness_level: z.enum(["beginner", "intermediate", "advanced"]),

  weekly_frequency: z.string(), // "1", "2", "3"... (Coming from Segmented Control)

  // STEP 2: TRAINING SETUP
  training_environment: z.enum(["gym", "home", "limited_gym", "outdoor"]),

  equipment_available: z
    .array(z.string())
    .min(1, "Select at least one piece of equipment (or Bodyweight)."),

  // Conditional: Only required if 'dumbbells' is in equipment_available
  // We make it optional here, and can refine logic later if strictly needed
  dumbbell_setup: z.array(z.string()).optional(),

  session_duration: z.number().min(15).max(120),

  // STEP 3: PREFERENCES
  preferred_split: z.string(), // "ai_optimized", "ppl", etc.

  progression_style: z.string(), // "linear", "rpe", etc.

  focus_areas: z.array(z.string()).max(3, "Select up to 3 focus areas."),

  cardio_preference: z.enum(["none", "hiit", "liss", "cooldown"]),

  // STEP 4: PERSONALIZATION
  injuries: z.array(z.string()).optional(),

  movement_constraints: z.array(z.string()).optional(),

  additional_instructions: z.string().optional(),
});

// Extract the Type for use in your React Form
export type WorkoutPlanFormValues = z.infer<typeof WorkoutPlanFormSchema>;
