CREATE TYPE "public"."onboarding_status" AS ENUM('NOT_STARTED', 'PARTIAL', 'COMPLETED');--> statement-breakpoint
CREATE TABLE "users" (
	"id" varchar(255) PRIMARY KEY NOT NULL,
	"email" varchar(255) NOT NULL,
	"is_active" boolean DEFAULT true NOT NULL,
	"is_subscribed" boolean DEFAULT false NOT NULL,
	"onboarding_status" "onboarding_status" DEFAULT 'NOT_STARTED' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
