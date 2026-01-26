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
