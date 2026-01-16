import { PlanTemplate } from "@/lib/templates/plan-template";

export const WORKOUT_PLAN_V1: PlanTemplate = {
  id: "workout-plan-v1",
  version: "1.0",
  planType: "workout",

  meta: {
    label: "Custom Workout Plan",
    description:
      "Design a training block tailored to your specific goals and lifestyle.",
  },

  steps: [
    /* -------------------------------------------------- */
    /* STEP 1 — STRATEGY                                  */
    /* -------------------------------------------------- */
    {
      step: 1,
      label: "Strategy",
      description: "Define the core objective.",
      fields: [
        {
          key: "primary_goal",
          label: "Primary Goals",
          description: "Select up to 3 goals to focus on.",
          type: "multi_select",
          required: true,
          ui: {
            component: "card_grid",
            min: 1,
            max: 3,
          },
          options: [
            { label: "Build Muscle", value: "build_muscle" },
            { label: "Lose Fat", value: "lose_fat" },
            { label: "Gain Weight", value: "gain_weight" },
            { label: "Increase Strength", value: "increase_strength" },
            { label: "Improve Endurance", value: "improve_endurance" },
            { label: "Maintain Fitness", value: "maintain_fitness" },
            { label: "Improve Mobility", value: "improve_mobility" },
            { label: "Athletic Performance", value: "athletic_performance" },
          ],
          aiHint:
            "Treat these as primary optimization objectives. Resolve conflicts by prioritizing the first selected goal.",
        },
        {
          key: "fitness_level",
          label: "Fitness Level",
          description: "What's your current training experience?",
          type: "single_select",
          required: true,
          defaultValue: "intermediate",
          ui: {
            component: "segmented_control",
          },
          options: [
            { label: "Beginner", value: "beginner" },
            { label: "Intermediate", value: "intermediate" },
            { label: "Advanced", value: "advanced" },
          ],
          aiHint:
            "Use this to scale exercise complexity, volume, intensity, and progression aggressiveness.",
        },
        {
          key: "weekly_frequency",
          label: "Weekly Workout Frequency",
          description: "How many days can you realistically train in a week?",
          type: "single_select",
          required: true,
          defaultValue: "4",
          ui: {
            component: "segmented_control",
          },
          options: [
            { label: "1 Day", value: "1" },
            { label: "2 Days", value: "2" },
            { label: "3 Days", value: "3" },
            { label: "4 Days", value: "4" },
            { label: "5 Days", value: "5" },
            { label: "6 Days", value: "6" },
            { label: "7 Days", value: "7" },
          ],
          aiHint: "Strictly adhere to this number of days for the split.",
        },
      ],
    },

    /* -------------------------------------------------- */
    /* STEP 2 — TRAINING SETUP                            */
    /* -------------------------------------------------- */
    {
      step: 2,
      label: "Training Setup",
      description: "Define your environment and time constraints.",
      fields: [
        {
          key: "training_environment",
          label: "Location",
          description: "Where will you be working out?",
          type: "single_select",
          required: true,
          defaultValue: "gym",
          ui: {
            component: "card_grid",
          },
          options: [
            {
              label: "Commercial Gym",
              value: "gym",
              icon: "building",
              description: "Full equipment access",
            },
            {
              label: "Home Gym",
              value: "home",
              icon: "home",
              description: "Limited equipment access",
            },
            {
              label: "Hotel / Apt Gym",
              value: "limited_gym",
              icon: "hotel",
              description: "Basics only",
            },
            {
              label: "Outdoors",
              value: "outdoor",
              icon: "sun",
              description: "Bodyweight focus",
            },
          ],
          aiHint:
            "Select exercises and volume that are feasible within this environment’s equipment and space constraints.",
        },
        {
          key: "equipment_available",
          label: "Equipment Access",
          description: "What equipment do you have access to?",
          type: "multi_select",
          required: true,
          ui: {
            component: "tags",
            helpText: "Select everything you have available.",
            min: 1,
            max: 100, // practically unlimited
          },
          visibility: {
            dependsOn: "training_environment",
            showWhen: ["home", "outdoor", "limited_gym"],
          },
          options: [
            { label: "Bodyweight Only", value: "bodyweight" },
            { label: "Dumbbells", value: "dumbbells" },
            { label: "Barbell & Rack", value: "barbell" },
            { label: "Pull Up Bar", value: "pull_up" },
            { label: "Kettlebells", value: "kettlebells" },
            { label: "Cables / Machines", value: "machines" },
            { label: "Resistance Bands", value: "bands" },
            { label: "Bench", value: "bench" },
            { label: "Smith Machine", value: "smith_machine" },
            { label: "Suspension Trainer (TRX)", value: "trx" },
          ],
          aiHint:
            "Only include exercises that can be performed using the selected equipment.",
        },
        {
          key: "dumbbell_setup",
          label: "Dumbbell Weights",
          description: "Which specific pairs do you own?",
          type: "multi_select",
          required: true,
          ui: {
            component: "tags",
            helpText: "Select all pairs you have.",
            min: 1,
            max: 100, // practically unlimited
          },
          visibility: {
            dependsOn: "equipment_available",
            showWhen: ["dumbbells"],
          },
          options: [
            { label: "Adjustable Set (All)", value: "adjustable" },
            { label: "1-3 kg", value: "light_1_3" },
            { label: "5 kg", value: "5" },
            { label: "7.5 kg", value: "7.5" },
            { label: "10 kg", value: "10" },
            { label: "12.5 kg", value: "12.5" },
            { label: "15 kg", value: "15" },
            { label: "17.5 kg", value: "17.5" },
            { label: "20 kg", value: "20" },
            { label: "25 kg", value: "25" },
            { label: "30 kg+", value: "heavy_30_plus" },
          ],
          aiHint:
            "CRITICAL: Only program exercises using these exact weight increments. If 'adjustable' is chosen, assume full range access.",
        },
        {
          key: "session_duration",
          label: "Time Per Workout",
          description: "How much time can you dedicate to each session?",
          type: "number",
          required: true,
          defaultValue: 60,
          ui: {
            component: "slider",
            min: 15,
            max: 120,
            step: 15,
            suffix: " mins",
          },
          aiHint:
            "Scale total exercises, sets, and rest periods to fit within this time limit.",
        },
      ],
    },

    /* -------------------------------------------------- */
    /* STEP 3 — PREFERENCES                               */
    /* -------------------------------------------------- */
    {
      step: 3,
      label: "Preferences",
      description: "Customize the structure and focus of your plan.",
      fields: [
        {
          key: "preferred_split",
          label: "Split Style",
          description: "How do you want to divide your training week?",
          type: "single_select",
          defaultValue: "ai_optimized",
          ui: {
            component: "dropdown",
          },
          options: [
            {
              label: "Let AI Decide (Recommended)",
              value: "ai_optimized",
              description: "Best split based on your frequency.",
            },
            {
              label: "Full Body",
              value: "full_body",
              description: "Train the whole body every session.",
            },
            {
              label: "Upper / Lower",
              value: "upper_lower",
              description: "Alternate between upper and lower body days.",
            },
            {
              label: "Push / Pull / Legs",
              value: "ppl",
              description:
                "Classic split: Push (Chest/Tri), Pull (Back/Bi), Legs.",
            },
            {
              label: "Bro Split (Body Parts)",
              value: "bro_split",
              description: "Focus on one major muscle group per day.",
            },
          ],
          aiHint:
            "If 'ai_optimized' is selected, choose the most scientifically appropriate split for the user's weekly_frequency.",
        },
        {
          key: "progression_style",
          label: "Progression Method",
          description: "How should your workouts progress over time?",
          type: "single_select",
          defaultValue: "linear",
          ui: {
            component: "dropdown",
            helpText:
              "Controls how weights, reps, or difficulty increase week to week.",
          },
          visibility: {
            dependsOn: "fitness_level",
            showWhen: ["intermediate", "advanced"],
          },
          options: [
            {
              label: "Linear (Beginner Friendly)",
              value: "linear",
              description: "Add weight every week. Simple and effective.",
            },
            {
              label: "Double Progression",
              value: "double",
              description:
                "Add reps first, then add weight when you hit the target.",
            },
            {
              label: "RPE / RIR Based",
              value: "rpe",
              description:
                "Auto-regulate based on how you feel (Rating of Perceived Exertion).",
            },
            {
              label: "Wave Loading",
              value: "wave",
              description:
                "Vary intensity week-to-week (e.g., Heavy, Medium, Light).",
            },
          ],
          aiHint:
            "Use this to determine week-over-week changes in load, reps, volume, or difficulty.",
        },
        {
          key: "focus_areas",
          label: "Priority Muscles",
          description: "Select up to 3 areas to prioritize.",
          type: "multi_select",
          ui: {
            component: "tags",
            helpText: "We'll add accessory work for these areas.",
            min: 0,
            max: 3,
          },
          options: [
            { label: "Chest", value: "chest" },
            { label: "Back", value: "back" },
            { label: "Shoulders", value: "shoulders" },
            { label: "Arms (Bi/Tri)", value: "arms" },
            { label: "Legs (Quads/Hams)", value: "legs" },
            { label: "Glutes", value: "glutes" },
            { label: "Core / Abs", value: "core" },
          ],
        },
        {
          key: "cardio_preference",
          label: "Cardio Inclusion",
          type: "single_select",
          defaultValue: "none",
          ui: {
            component: "dropdown",
          },
          options: [
            { label: "None", value: "none" },
            { label: "HIIT (Intervals)", value: "hiit" },
            { label: "LISS (Steady State)", value: "liss" },
            { label: "Cooldown / Mobility", value: "cooldown" },
          ],
          aiHint:
            "Integrate this cardio style without compromising recovery or the primary training goal.",
        },
      ],
    },

    /* -------------------------------------------------- */
    /* STEP 4 — PERSONALIZATION                          */
    /* -------------------------------------------------- */
    {
      step: 4,
      label: "Personalization",
      description: "Tailor the experience to your body and style.",
      fields: [
        {
          key: "injuries",
          label: "Injuries",
          description: "Select areas we need to protect.",
          type: "multi_select",
          ui: {
            component: "tags",
            min: 0,
            max: 3,
          },
          options: [
            { label: "Lower Back", value: "lower_back" },
            { label: "Knees", value: "knees" },
            { label: "Shoulders", value: "shoulders" },
            { label: "Wrists", value: "wrists" },
            { label: "Hips", value: "hips" },
            { label: "Neck", value: "neck" },
            { label: "Elbows", value: "elbows" },
            { label: "Ankles", value: "ankles" },
          ],
          aiHint:
            "Avoid heavy loading, deep ranges, or unstable positions involving these joints.",
        },
        {
          key: "movement_constraints",
          label: "Movement Limitations",
          description:
            "Are there specific types of movement you want to avoid?",
          type: "multi_select",
          ui: {
            component: "tags",
            helpText: "We will filter out exercises that match these patterns.",
            min: 0,
            max: 3,
          },
          options: [
            { label: "No Jumping (Low Impact)", value: "no_jumping" },
            { label: "No Running", value: "no_running" },
            { label: "No Overhead Lifting", value: "no_overhead" },
            { label: "No Floor Exercises", value: "no_floor" },
            { label: "No Hanging (Grip)", value: "no_hanging" },
            { label: "Wrist Friendly", value: "wrist_friendly" },
          ],
          aiHint:
            "Strict negative constraint. e.g. If 'no_jumping', exclude Box Jumps, Burpees, Jump Squats.",
        },
        {
          key: "additional_instructions",
          label: "Additional Instructions",
          description: "Any specific requests or focus?",
          type: "text",
          ui: {
            component: "textarea",
            placeholder:
              "e.g. I want to improve my vertical jump for basketball...",
          },
          aiHint:
            "Incorporate these instructions as hard constraints or emphasis where applicable.",
        },
      ],
    },
  ],
};
