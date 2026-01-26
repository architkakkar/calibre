import {
  boolean,
  integer,
  pgTable,
  text,
  timestamp,
  varchar,
  jsonb,
  uniqueIndex,
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
  messageRoleEnum,
  planStatusEnum,
  planActivityStatusEnum,
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

export const chatsTable = pgTable("chats", {
  id: varchar({ length: 36 }).primaryKey(),
  user_id: varchar({ length: 255 })
    .notNull()
    .references(() => usersTable.id, { onDelete: "cascade" }),
  title: varchar({ length: 255 }).notNull(),
  created_at: timestamp({ withTimezone: true }).notNull().defaultNow(),
  updated_at: timestamp({ withTimezone: true }).notNull().defaultNow(),
});

export const messagesTable = pgTable("messages", {
  id: varchar({ length: 36 }).primaryKey(),
  chat_id: varchar({ length: 36 })
    .notNull()
    .references(() => chatsTable.id, { onDelete: "cascade" }),
  role: messageRoleEnum().notNull(),
  content: text().notNull(),
  created_at: timestamp({ withTimezone: true }).notNull().defaultNow(),
});

export const workoutPlanRequestsTable = pgTable("workout_plan_requests", {
  id: varchar({ length: 36 }).primaryKey(),
  user_id: varchar({ length: 255 })
    .notNull()
    .references(() => usersTable.id, { onDelete: "cascade" }),
  plan_template_id: varchar({ length: 100 }).notNull(),
  plan_template_version: varchar({ length: 20 }).notNull(),
  answers: jsonb().notNull(),
  created_at: timestamp({ withTimezone: true }).notNull().defaultNow(),
});

export const workoutPlansTable = pgTable("workout_plans", {
  id: varchar({ length: 36 }).primaryKey(),
  user_id: varchar({ length: 255 })
    .notNull()
    .references(() => usersTable.id, { onDelete: "cascade" }),
  request_id: varchar({ length: 36 })
    .notNull()
    .references(() => workoutPlanRequestsTable.id, { onDelete: "cascade" }),
  plan_name: varchar({ length: 255 }).notNull(),
  plan_description: text().notNull(),
  plan_duration_weeks: integer().notNull(),
  session_duration_minutes: integer().notNull(),
  primary_goals: primaryGoalEnum().array().notNull(),
  fitness_level: fitnessLevelEnum().notNull(),
  weekly_frequency: varchar({ length: 20 }).notNull(),
  training_environment: varchar({ length: 100 }).notNull(),
  status: planStatusEnum().notNull().default("GENERATED"),
  is_active: boolean().notNull().default(false),
  plan_start_date: timestamp({ withTimezone: true }),
  schema_version: varchar({ length: 20 }).notNull(),
  raw_ai_json: jsonb().notNull(),
  parsed_plan: jsonb().notNull(),
  created_at: timestamp({ withTimezone: true }).notNull().defaultNow(),
});

export const workoutPlanDaysTable = pgTable("workout_plan_days", {
  id: varchar({ length: 36 }).primaryKey(),
  plan_id: varchar({ length: 36 })
    .notNull()
    .references(() => workoutPlansTable.id, { onDelete: "cascade" }),
  week_number: integer().notNull(),
  week_label: varchar({ length: 50 }).notNull(),
  day_number: integer().notNull(),
  day_label: varchar({ length: 50 }).notNull(),
  day_focus: varchar({ length: 255 }).notNull(),
  is_rest_day: boolean().notNull(),
  session_intent: varchar({ length: 50 }).notNull(),
  total_duration_minutes: integer().notNull(),
});

export const workoutPlanDaysUniqueIndex = uniqueIndex(
  "workout_plan_days_unique",
).on(
  workoutPlanDaysTable.plan_id,
  workoutPlanDaysTable.week_number,
  workoutPlanDaysTable.day_number,
);

export const workoutDayActivitiesTable = pgTable("workout_day_activities", {
  id: varchar({ length: 36 }).primaryKey(),
  plan_day_id: varchar({ length: 36 })
    .notNull()
    .references(() => workoutPlanDaysTable.id, { onDelete: "cascade" }),
  user_id: varchar({ length: 255 })
    .notNull()
    .references(() => usersTable.id, { onDelete: "cascade" }),
  status: planActivityStatusEnum().notNull().default("PENDING"),
  completed_at: timestamp({ withTimezone: true }),
  notes: text(),
  created_at: timestamp({ withTimezone: true }).notNull().defaultNow(),
});
