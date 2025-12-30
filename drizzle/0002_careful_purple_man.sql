CREATE TYPE "public"."activity_level" AS ENUM('SEDENTARY', 'LIGHTLY_ACTIVE', 'MODERATELY_ACTIVE', 'VERY_ACTIVE');--> statement-breakpoint
CREATE TYPE "public"."commitment_level" AS ENUM('LOW', 'MODERATE', 'HIGH');--> statement-breakpoint
CREATE TYPE "public"."fitness_level" AS ENUM('BEGINNER', 'INTERMEDIATE', 'ADVANCED');--> statement-breakpoint
CREATE TYPE "public"."gender" AS ENUM('MALE', 'FEMALE', 'OTHER', 'PREFER_NOT_TO_SAY');--> statement-breakpoint
CREATE TYPE "public"."motivation" AS ENUM('IMPROVE_HEALTH', 'LOOK_BETTER', 'BUILD_CONFIDENCE', 'INCREASE_ENERGY', 'REDUCE_STRESS', 'MENTAL_WELLBEING', 'PREPARE_FOR_EVENT', 'LIFESTYLE_CHANGE');--> statement-breakpoint
CREATE TYPE "public"."onboarding_status" AS ENUM('NOT_STARTED', 'PARTIAL', 'COMPLETED');--> statement-breakpoint
CREATE TYPE "public"."primary_goal" AS ENUM('BUILD_MUSCLE', 'LOSE_FAT', 'GAIN_WEIGHT', 'INCREASE_STRENGTH', 'IMPROVE_ENDURANCE', 'MAINTAIN_FITNESS', 'IMPROVE_MOBILITY', 'ATHLETIC_PERFORMANCE');--> statement-breakpoint
CREATE TYPE "public"."weekly_frequency" AS ENUM('2_3', '3_4', '4_5', '6_PLUS');