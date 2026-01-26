/*
Database enum definitions.
These should correspond to the constants defined in src/lib/shared/constants.ts
*/
import { pgEnum } from "drizzle-orm/pg-core";

export const onboardingStatusEnum = pgEnum("onboarding_status", [
  "PENDING",
  "COMPLETED",
]);

export const genderEnum = pgEnum("gender", [
  "MALE",
  "FEMALE",
  "OTHER",
  "PREFER_NOT_TO_SAY",
]);

export const activityLevelEnum = pgEnum("activity_level", [
  "SEDENTARY",
  "LIGHTLY_ACTIVE",
  "MODERATELY_ACTIVE",
  "VERY_ACTIVE",
]);

export const fitnessLevelEnum = pgEnum("fitness_level", [
  "BEGINNER",
  "INTERMEDIATE",
  "ADVANCED",
]);

export const primaryGoalEnum = pgEnum("primary_goal", [
  "BUILD_MUSCLE",
  "LOSE_FAT",
  "GAIN_WEIGHT",
  "INCREASE_STRENGTH",
  "IMPROVE_ENDURANCE",
  "MAINTAIN_FITNESS",
  "IMPROVE_MOBILITY",
  "ATHLETIC_PERFORMANCE",
]);

export const commitmentLevelEnum = pgEnum("commitment_level", [
  "LOW",
  "MODERATE",
  "HIGH",
]);

export const weeklyFrequencyEnum = pgEnum("weekly_frequency", [
  "2_3",
  "3_4",
  "4_5",
  "6_PLUS",
]);

export const motivationEnum = pgEnum("motivation", [
  "IMPROVE_HEALTH",
  "LOOK_BETTER",
  "BUILD_CONFIDENCE",
  "INCREASE_ENERGY",
  "REDUCE_STRESS",
  "MENTAL_WELLBEING",
  "PREPARE_FOR_EVENT",
  "LIFESTYLE_CHANGE",
]);

export const messageRoleEnum = pgEnum("role", ["USER", "ASSISTANT"]);

export const planStatusEnum = pgEnum("status", ["GENERATED", "ARCHIVED"]);

export const planActivityStatusEnum = pgEnum("status", [
  "PENDING",
  "COMPLETED",
  "MISSED",
  "SKIPPED",
]);
