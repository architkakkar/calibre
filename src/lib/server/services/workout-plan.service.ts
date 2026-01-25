import { generateText } from "ai";
import { openrouter } from "@/lib/server/open-router";
import { ACTIVE_WORKOUT_PLAN } from "@/lib/templates";
import {
  assertPlanVersion,
  validateAnswersAgainstPlan,
  buildUserPrompt,
} from "@/lib/domain/plan.helpers";
import {
  validateWorkoutPlanJSON,
  WorkoutPlan,
} from "@/lib/validators/workout-plan.validator";
import { WORKOUT_PLAN_SYSTEM_PROMPT } from "@/lib/server/ai-prompts";

export async function createWorkoutPlan({
  userId,
  planVersion,
  answers,
}: {
  userId: string;
  planVersion: string;
  answers: Record<string, unknown>;
}) {
  assertPlanVersion({ plan: ACTIVE_WORKOUT_PLAN, planVersion });
  validateAnswersAgainstPlan({ plan: ACTIVE_WORKOUT_PLAN, answers });

  const userPrompt = buildUserPrompt({ plan: ACTIVE_WORKOUT_PLAN, answers });

  const MAX_RETRIES = 2;
  let attempt = 1;
  let plan: WorkoutPlan | undefined;

  while (attempt <= MAX_RETRIES) {
    try {
      plan = await generateWorkoutPlan({ userPrompt });
      break;
    } catch (error) {
      console.error(
        `Attempt ${attempt} to generate workout plan failed:`,
        error,
      );
      attempt++;
      if (attempt > MAX_RETRIES) {
        throw new Error(
          "Failed to generate a valid workout plan after multiple attempts.",
        );
      }
    }
  }

  return {
    status: "generated",
    plan: plan!,
  };
}

async function generateWorkoutPlan({ userPrompt }: { userPrompt: string }) {
  const { output } = await generateText({
    model: openrouter(process.env.OPEN_ROUTER_AI_MODEL!),
    prompt: userPrompt,
    system: WORKOUT_PLAN_SYSTEM_PROMPT,
  });

  const raw = output.trim();
  const validation = validateWorkoutPlanJSON(raw);

  if (validation.status === "invalid") {
    throw new Error(
      `Generated workout plan JSON is invalid: ${validation.error}`,
    );
  }

  return validation.plan;
}
