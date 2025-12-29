/* App related constants */
export const APP_NAME = "Calibre" as const;

/* Onboarding related constants */
export const GENDERS = [
  "Male",
  "Female",
  "Other",
  "Prefer not to say",
] as const;

export const ACTIVITY_LEVELS = [
  "Sedentary",
  "Lightly Active",
  "Moderately Active",
  "Very Active",
] as const;

export type ActivityLevel = (typeof ACTIVITY_LEVELS)[number];

export const ACTIVITY_LEVEL_LABELS: Record<ActivityLevel, string> = {
  "Sedentary": "Sedentary - Little or no exercise",
  "Lightly Active": "Lightly Active - Light exercise 1-3 days/week",
  "Moderately Active":
    "Moderately Active - Moderate exercise 3-5 days/week",
  "Very Active": "Very Active - Hard exercise 6-7 days a week",
};

export const FITNESS_LEVELS = ["Beginner", "Intermediate", "Advanced"] as const;

export type FitnessLevel = (typeof FITNESS_LEVELS)[number];

export const FITNESS_LEVEL_LABELS: Record<FitnessLevel, string> = {
  "Beginner": "Beginner - New to fitness or just starting out",
  "Intermediate": "Intermediate - Regularly active with some experience",
  "Advanced": "Advanced - Highly active with extensive experience",
};

export const GOALS = [
  "Build Muscle",
  "Lose Fat",
  "Gain Weight",
  "Increase Strength",
  "Improve Endurance",
  "Maintain Fitness",
  "Improve Mobility",
  "Athletic Performance",
] as const;

export const MOTIVATIONS = [
  "Improve Health",
  "Look Better",
  "Build Confidence",
  "Increase Energy",
  "Reduce Stress",
  "Mental Wellbeing",
  "Prepare for Event",
  "Lifestyle Change",
] as const;

export const COMMITMENT_LEVELS = ["Low", "Moderate", "High"] as const;

export type CommitmentLevel = (typeof COMMITMENT_LEVELS)[number];

export const COMMITMENT_LEVEL_LABELS: Record<CommitmentLevel, string> = {
  "Low": "Low - easy & flexible",
  "Moderate": "Moderate - balanced routine",
  "High": "High - disciplined & intense",
};

export const WEEKLY_FREQUENCIES = ["2-3", "3-4", "4-5", "6+"] as const;

export type WeeklyFrequency = (typeof WEEKLY_FREQUENCIES)[number];

export const WEEKLY_FREQUENCY_LABELS: Record<WeeklyFrequency, string> = {
  "2-3": "2–3 days",
  "3-4": "3–4 days",
  "4-5": "4–5 days",
  "6+": "6+ days",
};
