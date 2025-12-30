CREATE TABLE "user_goals" (
	"users_id" varchar(255) PRIMARY KEY NOT NULL,
	"primary_goals" "primary_goal"[] NOT NULL,
	"target_weight_kg" integer NOT NULL,
	"commitment_level" "commitment_level" NOT NULL,
	"weekly_frequency" "weekly_frequency" NOT NULL,
	"motivations" "motivation"[] NOT NULL,
	"notes" varchar(255) DEFAULT '',
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "user_profiles" (
	"users_id" varchar(255) PRIMARY KEY NOT NULL,
	"first_name" varchar(255) NOT NULL,
	"last_name" varchar(255) NOT NULL,
	"dob" varchar(255) NOT NULL,
	"gender" "gender" NOT NULL,
	"height_cm" integer NOT NULL,
	"weight_kg" integer NOT NULL,
	"activity_level" "activity_level" NOT NULL,
	"fitness_level" "fitness_level" NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "updated_at" timestamp with time zone DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "user_goals" ADD CONSTRAINT "user_goals_users_id_users_id_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_profiles" ADD CONSTRAINT "user_profiles_users_id_users_id_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
DROP TYPE "public"."onboarding_status";