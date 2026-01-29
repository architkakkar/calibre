export const WORKOUT_PLAN_RESPONSE_SCHEMA_VERSION = "1.0";

export const WORKOUT_PLAN_RESPONSE_SCHEMA = `
  {
    "meta": {
      "planName": string,
      "planDescription": string,
      "planDurationWeeks": number
    },
    plan: {
      "schedule": [
        {
          week: number,
          weekLabel: string,
          focus: string,
          isDeloadWeek: boolean,
          days: [
            {
              "day": number,
              "dayLabel": string,
              "focus": string,
              "isRestDay": boolean,
              "sessionIntent": string,
              "totalDurationMinutes": number,
              "warmup": [
                {
                  "name": string,
                  "durationMinutes": number,
                  "focus": string,
                  "notes": string
                }
              ],
              "workout": [
                {
                  "exercise": string,
                  "movementPattern": "squat" | "hinge" | "push" | "pull" | "carry" | "core" | "locomotion",
                  "role": "main_lift" | "secondary" | "accessory" | "finisher",
                  "sets": number,
                  "reps": string,
                  "restSeconds": number,
                  "intensityGuidance": {
                    "type": string,
                    "value": string
                  },
                  "tempo": string,
                  "notes": string
                }
              ],
              "cooldown": [
                {
                  "name": string,
                  "durationMinutes": number,
                  "focus": string,
                  "notes": string
                }
              ]
            }
          ]
        }
      ],
      "progressionSummary": {
        "strategy": string,
        "notes": string[]
      },
      "substitutions": [
        {
          "exercise": string,
          "movementPattern": string,
          "alternatives": string[]
        }
      ],
      "recoveryGuidance": {
        "recommendedRestDays": number,
        "sorenessExpectations": string,
        "mobilityFocus": string[]
      },
      notes: {
        "safety": string[],
        "general": string[]
      }
    }
  }
`;

export const NUTRITION_PLAN_RESPONSE_SCHEMA_VERSION = "1.0";

export const NUTRITION_PLAN_RESPONSE_SCHEMA = `
  {
    "meta": {
      "planName": string,
      "planDescription": string,
      "planDurationWeeks": number
    },
    "plan": {
      "targets": {
        "averageDailyCalories": number,
        "trainingDayCalories": number,
        "restDayCalories": number,
        "macros": {
          "proteinGrams": number,
          "carbsGrams": number,
          "fatsGrams": number,
          "calories": number
        },
        "macroStrategy": string
      },
      "structure": {
        "mealsPerDay": number,
        "mealTimingStrategy": string,
        "hydrationGuidelines": string,
        "supplementGuidance": string
      },
      "meals": {
        "templates": [
          {
            "mealType": "breakfast" | "lunch" | "dinner" | "snack",
            "goal": string,
            "mealOptions": [
              {
                "mealName": string,
                "foods": [
                  {
                    "name": string,
                    "quantity": string,
                    "notes": string
                  }
                ],
                "estimatedMacros": {
                  "proteinGrams": number,
                  "carbsGrams": number,
                  "fatsGrams": number,
                  "calories": number
                }
              }
            ]
          }
        ]
      },
      "adjustments": {
        "checkInMetrics": [
          "bodyWeight",
          "energyLevels",
          "hunger",
          "trainingPerformance"
        ],
        "rules": [
          {
            "if": string,
            "then": string,
            "reasoning": string
          }
        ]
      },
      "flexibility": {
        "eatingOut": {
          "frequency": string,
          "rules": string[]
        },
        "substitutions": [
          {
            "category": string,
            "swapOptions": string[]
          }
        ],
        "budgetTips": string[]
      },
      "health": {
        "allergiesExcluded": string[],
        "medicalNotes": string[],
        "digestiveTips": string,
        "safetyNotes": string[]
      },
      "notes": {
        "adherenceTips": string[],
        "commonMistakes": string[],
        "general": string[]
      }
    }
  }
`;
