import {
  boolean,
  integer,
  pgTable,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";
import {
  onboardingStatusEnum,
  genderEnum,
  activityLevelEnum,
  fitnessLevelEnum,
  primaryGoalEnum,
  commitmentLevelEnum,
  weeklyFrequencyEnum,
  motivationEnum,
} from "@/lib/server/db/enums";

export const usersTable = pgTable("users", {
  id: varchar({ length: 255 }).primaryKey(),
  email: varchar({ length: 255 }).notNull().unique(),
  is_active: boolean().notNull().default(true),
  is_subscribed: boolean().notNull().default(false),
  onboarding_status: onboardingStatusEnum().notNull().default("PENDING"),
  created_at: timestamp({ withTimezone: true }).notNull().defaultNow(),
  updated_at: timestamp({ withTimezone: true }).notNull().defaultNow(),
});

export const userProfilesTable = pgTable("user_profiles", {
  user_id: varchar({ length: 255 })
    .primaryKey()
    .references(() => usersTable.id, { onDelete: "cascade" }),
  first_name: varchar({ length: 255 }).notNull(),
  last_name: varchar({ length: 255 }).notNull(),
  dob: varchar({ length: 255 }).notNull(),
  gender: genderEnum().notNull(),
  height_cm: integer().notNull(),
  weight_kg: integer().notNull(),
  activity_level: activityLevelEnum().notNull(),
  fitness_level: fitnessLevelEnum().notNull(),
  updated_at: timestamp({ withTimezone: true }).notNull().defaultNow(),
});

export const userGoalsTable = pgTable("user_goals", {
  user_id: varchar({ length: 255 })
    .primaryKey()
    .references(() => usersTable.id, { onDelete: "cascade" }),
  primary_goals: primaryGoalEnum().array().notNull(),
  target_weight_kg: integer().notNull(),
  commitment_level: commitmentLevelEnum().notNull(),
  weekly_frequency: weeklyFrequencyEnum().notNull(),
  motivations: motivationEnum().array().notNull(),
  notes: varchar({ length: 255 }).default(""),
  updated_at: timestamp({ withTimezone: true }).notNull().defaultNow(),
});
