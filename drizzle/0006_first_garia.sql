CREATE TABLE "nutrition_meal_logs" (
	"id" varchar(36) PRIMARY KEY NOT NULL,
	"plan_day_id" varchar(36) NOT NULL,
	"user_id" varchar(255) NOT NULL,
	"meal_type" varchar(20) NOT NULL,
	"meal_name" varchar(255),
	"notes" text,
	"logged_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "nutrition_plan_days" (
	"id" varchar(36) PRIMARY KEY NOT NULL,
	"plan_id" varchar(36) NOT NULL,
	"user_id" varchar(255) NOT NULL,
	"date" timestamp with time zone NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "nutrition_plan_requests" (
	"id" varchar(36) PRIMARY KEY NOT NULL,
	"user_id" varchar(255) NOT NULL,
	"plan_template_id" varchar(100) NOT NULL,
	"plan_template_version" varchar(20) NOT NULL,
	"answers" jsonb NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "nutrition_plans" (
	"id" varchar(36) PRIMARY KEY NOT NULL,
	"user_id" varchar(255) NOT NULL,
	"request_id" varchar(36) NOT NULL,
	"plan_name" varchar(255) NOT NULL,
	"plan_description" text NOT NULL,
	"plan_duration_weeks" integer NOT NULL,
	"primary_goal" varchar(100) NOT NULL,
	"diet_type" varchar(50) NOT NULL,
	"meals_per_day" varchar(20) NOT NULL,
	"budget_level" varchar(20) NOT NULL,
	"plan_status" "plan_status" DEFAULT 'GENERATED' NOT NULL,
	"is_active" boolean DEFAULT false NOT NULL,
	"plan_start_date" timestamp with time zone,
	"schema_version" varchar(20) NOT NULL,
	"raw_ai_json" jsonb NOT NULL,
	"parsed_plan" jsonb NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "workout_day_activities" RENAME COLUMN "status" TO "plan_activity_status";--> statement-breakpoint
ALTER TABLE "workout_plans" RENAME COLUMN "status" TO "plan_status";--> statement-breakpoint
ALTER TABLE "nutrition_meal_logs" ADD CONSTRAINT "nutrition_meal_logs_plan_day_id_nutrition_plan_days_id_fk" FOREIGN KEY ("plan_day_id") REFERENCES "public"."nutrition_plan_days"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "nutrition_meal_logs" ADD CONSTRAINT "nutrition_meal_logs_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "nutrition_plan_days" ADD CONSTRAINT "nutrition_plan_days_plan_id_nutrition_plans_id_fk" FOREIGN KEY ("plan_id") REFERENCES "public"."nutrition_plans"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "nutrition_plan_days" ADD CONSTRAINT "nutrition_plan_days_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "nutrition_plan_requests" ADD CONSTRAINT "nutrition_plan_requests_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "nutrition_plans" ADD CONSTRAINT "nutrition_plans_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "nutrition_plans" ADD CONSTRAINT "nutrition_plans_request_id_nutrition_plan_requests_id_fk" FOREIGN KEY ("request_id") REFERENCES "public"."nutrition_plan_requests"("id") ON DELETE cascade ON UPDATE no action;