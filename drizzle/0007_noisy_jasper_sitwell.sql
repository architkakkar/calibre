ALTER TABLE "nutrition_plans" ADD COLUMN "eating_out_frequency" varchar(100) NOT NULL;--> statement-breakpoint
ALTER TABLE "nutrition_plans" ADD COLUMN "allergies" varchar(255)[] NOT NULL;