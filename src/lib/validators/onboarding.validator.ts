import { z } from "zod";
import {
  GENDERS,
  ACTIVITY_LEVELS,
  FITNESS_LEVELS,
  GOALS,
  MOTIVATIONS,
  WEEKLY_FREQUENCIES,
  COMMITMENT_LEVELS,
} from "@/lib/shared/constants";

export type Gender = (typeof GENDERS)[number];
export type ActivityLevel = (typeof ACTIVITY_LEVELS)[number];
export type FitnessLevel = (typeof FITNESS_LEVELS)[number];
export type Goal = (typeof GOALS)[number];
export type Motivation = (typeof MOTIVATIONS)[number];
export type CommitmentLevel = (typeof COMMITMENT_LEVELS)[number];
export type WeeklyFrequency = (typeof WEEKLY_FREQUENCIES)[number];

export const UserProfileSchema = z.object({
  firstName: z.string().trim().min(1, "First name is required").max(100),
  lastName: z.string().trim().min(1, "Last name is required").max(100),
  dob: z
    .string()
    .refine((v) => !Number.isNaN(Date.parse(v)), {
      message: "Invalid date",
    })
    .refine((v) => new Date(v) <= new Date(), {
      message: "Date cannot be in the future",
    }),
  gender: z.enum(GENDERS),
  heightCm: z.coerce
    .number()
    .refine(Number.isInteger, {
      message: "Height must be a whole number",
    })
    .min(50, "Height must be at least 50 cm")
    .max(300, "Height cannot exceed 300 cm"),
  weightKg: z.coerce
    .number()
    .refine(Number.isInteger, {
      message: "Weight must be a whole number",
    })
    .min(20, "Weight must be at least 20 kg")
    .max(500, "Weight cannot exceed 500 kg"),
  activityLevel: z.enum(ACTIVITY_LEVELS),
  fitnessLevel: z.enum(FITNESS_LEVELS),
});

const GoalEnum = z.enum(GOALS);

const MotivationEnum = z.enum(MOTIVATIONS);

export const FitnessGoalsSchema = z.object({
  primaryGoals: z
    .array(GoalEnum)
    .min(1, "Select at least one goal")
    .max(3, "Select up to 3 goals"),
  targetWeightKg: z.coerce
    .number()
    .refine(Number.isInteger, {
      message: "Weight must be a whole number",
    })
    .min(20)
    .max(500),
  commitmentLevel: z.enum(COMMITMENT_LEVELS),
  weeklyFrequency: z.enum(WEEKLY_FREQUENCIES),
  motivations: z
    .array(MotivationEnum)
    .min(1, "Select at least one motivation")
    .max(3, "Select up to 3 motivations"),
  notes: z.string().trim().max(255).optional(),
});

export const OnboardingSchema = z.object({
  profile: UserProfileSchema,
  goals: FitnessGoalsSchema,
});

export type UserProfile = z.infer<typeof UserProfileSchema>;
export type FitnessGoals = z.infer<typeof FitnessGoalsSchema>;
export type OnboardingPayload = z.infer<typeof OnboardingSchema>;
