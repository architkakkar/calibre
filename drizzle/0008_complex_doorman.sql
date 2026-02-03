ALTER TYPE "public"."plan_activity_status" RENAME TO "workout_status";--> statement-breakpoint
CREATE TABLE "workout_session_logs" (
	"id" varchar(36) PRIMARY KEY NOT NULL,
	"plan_id" varchar(36) NOT NULL,
	"user_id" varchar(255) NOT NULL,
	"week_number" integer NOT NULL,
	"day_number" integer NOT NULL,
	"is_rest_day" boolean DEFAULT false NOT NULL,
	"workout_date" timestamp with time zone NOT NULL,
	"warmup_completed" boolean DEFAULT false NOT NULL,
	"main_workout_completed" boolean DEFAULT false NOT NULL,
	"cooldown_completed" boolean DEFAULT false NOT NULL,
	"workout_status" "workout_status" DEFAULT 'PENDING' NOT NULL,
	"difficulty_rating" integer,
	"notes" text,
	"completed_at" timestamp with time zone,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
DROP TABLE "workout_day_activities" CASCADE;--> statement-breakpoint
DROP TABLE "workout_plan_days" CASCADE;--> statement-breakpoint
ALTER TABLE "workout_session_logs" ADD CONSTRAINT "workout_session_logs_plan_id_workout_plans_id_fk" FOREIGN KEY ("plan_id") REFERENCES "public"."workout_plans"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "workout_session_logs" ADD CONSTRAINT "workout_session_logs_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;