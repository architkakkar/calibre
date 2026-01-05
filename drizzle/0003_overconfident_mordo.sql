CREATE TYPE "public"."role" AS ENUM('USER', 'ASSISTANT');--> statement-breakpoint
CREATE TABLE "chats" (
	"id" varchar(36) PRIMARY KEY NOT NULL,
	"user_id" varchar(255) NOT NULL,
	"title" varchar(255) NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "messages" (
	"id" varchar(36) PRIMARY KEY NOT NULL,
	"chat_id" varchar(36) NOT NULL,
	"role" "role" NOT NULL,
	"content" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "user_goals" RENAME COLUMN "users_id" TO "user_id";--> statement-breakpoint
ALTER TABLE "user_profiles" RENAME COLUMN "users_id" TO "user_id";--> statement-breakpoint
ALTER TABLE "user_goals" DROP CONSTRAINT "user_goals_users_id_users_id_fk";
--> statement-breakpoint
ALTER TABLE "user_profiles" DROP CONSTRAINT "user_profiles_users_id_users_id_fk";
--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "onboarding_status" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "onboarding_status" SET DEFAULT 'PENDING'::text;--> statement-breakpoint
DROP TYPE "public"."onboarding_status";--> statement-breakpoint
CREATE TYPE "public"."onboarding_status" AS ENUM('PENDING', 'COMPLETED');--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "onboarding_status" SET DEFAULT 'PENDING'::"public"."onboarding_status";--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "onboarding_status" SET DATA TYPE "public"."onboarding_status" USING "onboarding_status"::"public"."onboarding_status";--> statement-breakpoint
ALTER TABLE "chats" ADD CONSTRAINT "chats_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "messages" ADD CONSTRAINT "messages_chat_id_chats_id_fk" FOREIGN KEY ("chat_id") REFERENCES "public"."chats"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_goals" ADD CONSTRAINT "user_goals_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_profiles" ADD CONSTRAINT "user_profiles_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;