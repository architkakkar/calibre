CREATE TYPE "public"."plan_activity_status" AS ENUM('PENDING', 'COMPLETED', 'MISSED', 'SKIPPED');--> statement-breakpoint
ALTER TYPE "public"."status" RENAME TO "plan_status";--> statement-breakpoint
ALTER TABLE "workout_day_activities" ALTER COLUMN "status" SET DEFAULT 'PENDING'::"public"."plan_activity_status";--> statement-breakpoint
ALTER TABLE "workout_day_activities" ALTER COLUMN "status" SET DATA TYPE "public"."plan_activity_status" USING "status"::"public"."plan_activity_status";