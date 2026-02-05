CREATE TYPE "public"."meal_status" AS ENUM('PENDING', 'COMPLETED', 'SKIPPED', 'MISSED');--> statement-breakpoint
ALTER TABLE "nutrition_meal_logs" ADD COLUMN "calories" integer;--> statement-breakpoint
ALTER TABLE "nutrition_meal_logs" ADD COLUMN "protein_grams" integer;--> statement-breakpoint
ALTER TABLE "nutrition_meal_logs" ADD COLUMN "carbs_grams" integer;--> statement-breakpoint
ALTER TABLE "nutrition_meal_logs" ADD COLUMN "fats_grams" integer;--> statement-breakpoint
ALTER TABLE "nutrition_meal_logs" ADD COLUMN "meal_status" "meal_status" DEFAULT 'PENDING' NOT NULL;