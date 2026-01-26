CREATE TYPE "public"."status" AS ENUM('GENERATED', 'ARCHIVED');--> statement-breakpoint
CREATE TABLE "workout_day_activities" (
	"id" varchar(36) PRIMARY KEY NOT NULL,
	"plan_day_id" varchar(36) NOT NULL,
	"user_id" varchar(255) NOT NULL,
	"status" "status" DEFAULT 'PENDING' NOT NULL,
	"completed_at" timestamp with time zone,
	"notes" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "workout_plan_days" (
	"id" varchar(36) PRIMARY KEY NOT NULL,
	"plan_id" varchar(36) NOT NULL,
	"week_number" integer NOT NULL,
	"week_label" varchar(50) NOT NULL,
	"day_number" integer NOT NULL,
	"day_label" varchar(50) NOT NULL,
	"day_focus" varchar(255) NOT NULL,
	"is_rest_day" boolean NOT NULL,
	"session_intent" varchar(50) NOT NULL,
	"total_duration_minutes" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "workout_plan_requests" (
	"id" varchar(36) PRIMARY KEY NOT NULL,
	"user_id" varchar(255) NOT NULL,
	"plan_template_id" varchar(100) NOT NULL,
	"plan_template_version" varchar(20) NOT NULL,
	"answers" jsonb NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "workout_plans" (
	"id" varchar(36) PRIMARY KEY NOT NULL,
	"user_id" varchar(255) NOT NULL,
	"request_id" varchar(36) NOT NULL,
	"plan_name" varchar(255) NOT NULL,
	"plan_description" text NOT NULL,
	"plan_duration_weeks" integer NOT NULL,
	"session_duration_minutes" integer NOT NULL,
	"primary_goals" varchar(255)[] NOT NULL,
	"fitness_level" varchar(36) NOT NULL,
	"weekly_frequency" varchar(20) NOT NULL,
	"training_environment" varchar(100) NOT NULL,
	"status" "status" DEFAULT 'GENERATED' NOT NULL,
	"is_active" boolean DEFAULT false NOT NULL,
	"plan_start_date" timestamp with time zone,
	"schema_version" varchar(20) NOT NULL,
	"raw_ai_json" jsonb NOT NULL,
	"parsed_plan" jsonb NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "workout_day_activities" ADD CONSTRAINT "workout_day_activities_plan_day_id_workout_plan_days_id_fk" FOREIGN KEY ("plan_day_id") REFERENCES "public"."workout_plan_days"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "workout_day_activities" ADD CONSTRAINT "workout_day_activities_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "workout_plan_days" ADD CONSTRAINT "workout_plan_days_plan_id_workout_plans_id_fk" FOREIGN KEY ("plan_id") REFERENCES "public"."workout_plans"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "workout_plan_requests" ADD CONSTRAINT "workout_plan_requests_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "workout_plans" ADD CONSTRAINT "workout_plans_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "workout_plans" ADD CONSTRAINT "workout_plans_request_id_workout_plan_requests_id_fk" FOREIGN KEY ("request_id") REFERENCES "public"."workout_plan_requests"("id") ON DELETE cascade ON UPDATE no action;