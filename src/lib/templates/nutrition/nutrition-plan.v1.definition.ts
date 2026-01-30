import { PlanTemplate } from "@/lib/templates/plan-template";

export const NUTRITION_PLAN_V1: PlanTemplate = {
  id: "nutrition-plan-v1",
  version: "1.0",
  planType: "nutrition",

  meta: {
    label: "Custom Nutrition Plan",
    description:
      "Design a sustainable nutrition strategy aligned with your goals, lifestyle, and preferences.",
  },

  steps: [
    /* -------------------------------------------------- */
    /* STEP 1 — STRATEGY                                  */
    /* -------------------------------------------------- */
    {
      step: 1,
      label: "Strategy",
      description: "Define your primary nutrition objective.",
      fields: [
        {
          key: "primary_goal",
          label: "Primary Goal",
          description: "What is your main nutrition objective?",
          type: "single_select",
          required: true,
          ui: {
            component: "card_grid",
          },
          options: [
            { label: "Fat Loss", value: "fat_loss" },
            { label: "Muscle Gain", value: "muscle_gain" },
            { label: "Weight Gain", value: "weight_gain" },
            { label: "Body Recomposition", value: "body_recomposition" },
            { label: "Performance / Energy", value: "performance_or_energy" },
            { label: "Metabolic Health", value: "metabolic_health" },
            { label: "Hormonal Balance", value: "hormonal_balance" },
            { label: "Digestive Health", value: "digestive_health" },
            { label: "Sustainable Lifestyle", value: "sustainable_lifestyle" },
            { label: "Lean Bulking", value: "lean_bulking" },
            { label: "Cutting / Fat Cut Phase", value: "cutting_phase" },
          ],
          aiHint:
            "This defines calorie targets, macro split, and aggressiveness of the plan.",
        },
        {
          key: "experience_level",
          label: "Nutrition Experience",
          description: "How familiar are you with tracking food and macros?",
          type: "single_select",
          required: true,
          defaultValue: "beginner",
          ui: {
            component: "segmented_control",
          },
          options: [
            { label: "Beginner", value: "beginner" },
            { label: "Intermediate", value: "intermediate" },
            { label: "Advanced", value: "advanced" },
          ],
          aiHint:
            "Controls plan complexity, tracking precision, and flexibility.",
        },
      ],
    },

    /* -------------------------------------------------- */
    /* STEP 2 — SETUP                                     */
    /* -------------------------------------------------- */
    {
      step: 2,
      label: "Setup",
      description: "Define dietary structure and constraints.",
      fields: [
        {
          key: "diet_type",
          label: "Diet Preference",
          description: "Which diet pattern do you follow?",
          type: "single_select",
          required: true,
          defaultValue: "non_vegetarian",
          ui: {
            component: "radio_group",
          },
          options: [
            {
              label: "Non-Vegetarian",
              value: "non_vegetarian",
              description: "Includes meat, poultry, eggs, and seafood.",
            },
            {
              label: "Vegetarian",
              value: "vegetarian",
              description:
                "Plant-based diet including dairy but no eggs or meat.",
            },
            {
              label: "Eggetarian",
              value: "eggetarian",
              description: "Vegetarian diet that includes eggs.",
            },
            {
              label: "Vegan",
              value: "vegan",
              description: "Fully plant-based diet with no animal products.",
            },
            {
              label: "Pescatarian",
              value: "pescatarian",
              description: "Vegetarian diet that includes fish and seafood.",
            },
          ],
          aiHint:
            "Strictly limit protein and food sources based on this selection.",
        },
        {
          key: "meals_per_day",
          label: "Meals Per Day",
          description: "How many meals can you realistically eat per day?",
          type: "single_select",
          required: true,
          defaultValue: "3",
          ui: {
            component: "segmented_control",
          },
          options: [
            { label: "2", value: "2" },
            { label: "3", value: "3" },
            { label: "4", value: "4" },
            { label: "5+", value: "5_plus" },
          ],
          aiHint: "Distribute calories and protein evenly across these meals.",
        },
        {
          key: "cooking_access",
          label: "Cooking Access",
          description: "How much cooking can you do?",
          type: "single_select",
          defaultValue: "basic_cooking",
          ui: {
            component: "dropdown",
          },
          options: [
            {
              label: "No Cooking",
              value: "no_cooking",
              description: "Ready-to-eat or minimal prep foods only.",
            },
            {
              label: "Basic Cooking",
              value: "basic_cooking",
              description: "Simple meals, limited time.",
            },
            {
              label: "Full Cooking",
              value: "full_cooking",
              description: "Comfortable cooking most meals.",
            },
          ],
          aiHint:
            "Match meal complexity and preparation time to this constraint.",
        },
        {
          key: "budget_level",
          label: "Food Budget",
          description: "Your monthly food budget comfort level.",
          type: "single_select",
          defaultValue: "moderate",
          ui: {
            component: "dropdown",
          },
          options: [
            { label: "Low Budget", value: "low" },
            { label: "Moderate Budget", value: "moderate" },
            { label: "Flexible Budget", value: "high" },
          ],
          aiHint:
            "Choose food sources that align with affordability and accessibility in Indian Rupees.",
        },
      ],
    },

    /* -------------------------------------------------- */
    /* STEP 3 — PREFERENCES                               */
    /* -------------------------------------------------- */
    {
      step: 3,
      label: "Preferences",
      description: "Fine-tune how the plan feels day to day.",
      fields: [
        {
          key: "macro_focus",
          label: "Macro Emphasis",
          description: "Any macro you want to emphasize?",
          type: "single_select",
          defaultValue: "balanced",
          ui: {
            component: "dropdown",
          },
          options: [
            { label: "Balanced", value: "balanced" },
            { label: "High Protein", value: "high_protein" },
            { label: "Low Carb", value: "low_carb" },
            { label: "High Carb", value: "high_carb" },
            { label: "Low Fat", value: "low_fat" },
          ],
          aiHint:
            "Adjust macro ratios while still respecting the primary goal.",
        },
        {
          key: "food_preferences",
          label: "Preferred Foods",
          description: "Foods you enjoy and want included.",
          type: "multi_select",
          ui: {
            component: "tags",
            min: 0,
            max: 10,
          },
          options: [
            { label: "Rice", value: "rice" },
            { label: "Brown Rice", value: "brown_rice" },
            { label: "Roti / Chapati", value: "roti_or_chapati" },
            { label: "Paratha", value: "paratha" },
            { label: "Millets (Ragi/Jowar/Bajra)", value: "millets" },
            { label: "Oats", value: "oats" },
            { label: "Bread", value: "bread" },
            { label: "Chicken", value: "chicken" },
            { label: "Chickpeas", value: "chickpeas" },
            { label: "Fish", value: "fish" },
            { label: "Eggs", value: "eggs" },
            { label: "Paneer", value: "paneer" },
            { label: "Tofu", value: "tofu" },
            { label: "Soy Products", value: "soy_products" },
            { label: "Peanut Butter", value: "peanut_butter" },
            { label: "Fruits", value: "fruits" },
            { label: "Salads", value: "salads" },
            { label: "Smoothies", value: "smoothies" },
          ],
          aiHint: "Favor these foods when constructing meals.",
        },
        {
          key: "disliked_foods",
          label: "Disliked Foods",
          description: "Foods you dislike and want to avoid if possible.",
          type: "multi_select",
          ui: {
            component: "tags",
            min: 0,
            max: 10,
          },
          options: [
            { label: "Mushrooms", value: "mushrooms" },
            { label: "Brinjal / Eggplant", value: "brinjal" },
            { label: "Bitter Gourd (Karela)", value: "bitter_gourd" },
            { label: "Okra (Bhindi)", value: "okra" },
            { label: "Cabbage", value: "cabbage" },
            { label: "Cauliflower", value: "cauliflower" },
            { label: "Broccoli", value: "broccoli" },
            { label: "Onion", value: "onion" },
            { label: "Garlic", value: "garlic" },
            { label: "Seafood", value: "seafood" },
            { label: "Curd", value: "curd" },
          ],
          aiHint:
            "Soft constraint. Avoid these foods unless necessary to meet nutritional targets.",
        },
        {
          key: "meal_timing",
          label: "Meal Timing Preference",
          description: "Any timing structure you prefer?",
          type: "single_select",
          defaultValue: "flexible",
          ui: {
            component: "dropdown",
          },
          options: [
            { label: "Flexible", value: "flexible" },
            { label: "Fixed Meal Times", value: "fixed_meal_times" },
            { label: "Intermittent Fasting", value: "intermittent_fasting" },
          ],
          aiHint: "Respect fasting windows or fixed schedules if selected.",
        },
      ],
    },

    /* -------------------------------------------------- */
    /* STEP 4 — PERSONALIZATION                           */
    /* -------------------------------------------------- */
    {
      step: 4,
      label: "Personalization",
      description: "Health, restrictions, and special instructions.",
      fields: [
        {
          key: "allergies",
          label: "Allergies / Intolerances",
          description: "Foods you must avoid.",
          type: "multi_select",
          ui: {
            component: "tags",
            min: 0,
            max: 5,
          },
          options: [
            { label: "Lactose", value: "lactose" },
            { label: "Gluten", value: "gluten" },
            { label: "Peanuts", value: "peanuts" },
            { label: "Soy", value: "soy" },
            { label: "Seafood", value: "seafood" },
            { label: "Onion", value: "onion" },
            { label: "Garlic", value: "garlic" },
          ],
          aiHint: "Strict exclusion. Never include these foods.",
        },
        {
          key: "medical_conditions",
          label: "Medical Considerations",
          description: "Anything we should account for?",
          type: "multi_select",
          ui: {
            component: "tags",
            min: 0,
            max: 3,
          },
          options: [
            { label: "Diabetes", value: "diabetes" },
            { label: "Thyroid", value: "thyroid" },
            { label: "PCOS", value: "pcos" },
            { label: "High Cholesterol", value: "cholesterol" },
            { label: "High Blood Pressure", value: "high_blood_pressure" },
            { label: "Acid Reflux (GERD)", value: "acid_reflux" },
            { label: "Celiac Disease", value: "celiac_disease" },
            { label: "Anemia", value: "anemia" },
            { label: "Fatty Liver", value: "fatty_liver" },
          ],
          aiHint:
            "Adjust carb quality, fat sources, and meal timing accordingly.",
        },
        {
          key: "supplements_usage",
          label: "Supplement Usage",
          description: "Supplements you currently use or are open to using.",
          type: "multi_select",
          ui: {
            component: "tags",
            min: 0,
            max: 5,
          },
          options: [
            { label: "None", value: "none" },
            { label: "Whey Protein", value: "whey_protein" },
            { label: "Plant Protein", value: "plant_protein" },
            { label: "Creatine", value: "creatine" },
            { label: "Multivitamin", value: "multivitamin" },
            { label: "Omega 3", value: "omega_3" },
            { label: "Vitamin D", value: "vitamin_d" },
          ],
          aiHint:
            "Use supplements to help meet protein or micronutrient targets, not as meal replacements unless explicitly required.",
        },
        {
          key: "eating_out_frequency",
          label: "Eating Out Frequency",
          description: "How often do you eat outside or order food?",
          type: "single_select",
          defaultValue: "occasionally",
          ui: {
            component: "dropdown",
          },
          options: [
            { label: "Rarely", value: "rarely" },
            { label: "Occasionally (1–2x/week)", value: "occasionally" },
            { label: "Frequently (3–5x/week)", value: "frequently" },
            { label: "Mostly Eating Out", value: "mostly_outside" },
          ],
          aiHint:
            "Increase flexibility, simple heuristics, and food substitutions as eating out frequency increases.",
        },
        {
          key: "additional_notes",
          label: "Additional Instructions",
          description: "Anything else you want the plan to consider?",
          type: "text",
          ui: {
            component: "textarea",
            placeholder:
              "e.g. prefer Indian meals, minimal sugar, office-friendly meals...",
          },
          aiHint:
            "Treat these as hard preferences or constraints where possible.",
        },
      ],
    },
  ],
};
