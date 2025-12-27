import {
  boolean,
  pgEnum,
  pgTable,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

export const onboardingStatusEnum = pgEnum("onboarding_status", [
  "NOT_STARTED",
  "PARTIAL",
  "COMPLETED",
]);

export const usersTable = pgTable("users", {
  id: varchar({ length: 255 }).primaryKey(),
  email: varchar({ length: 255 }).notNull().unique(),
  is_active: boolean().notNull().default(true),
  is_subscribed: boolean().notNull().default(false),
  onboarding_status: onboardingStatusEnum().notNull().default("NOT_STARTED"),
  created_at: timestamp({ withTimezone: true }).notNull().defaultNow(),
});
