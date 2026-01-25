import { generateText } from "ai";
import { openrouter } from "@/lib/server/open-router";
import { ACTIVE_WORKOUT_PLAN } from "@/lib/templates";
import {
  assertPlanVersion,
  validateAnswersAgainstPlan,
  sanitizeAnswers,
  buildUserPrompt,
} from "@/lib/domain/plan.helpers";
import { validateWorkoutPlanJSON } from "@/lib/validators/workout-plan.validator";
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

  const sanitized = sanitizeAnswers({ plan: ACTIVE_WORKOUT_PLAN, answers });
  const userPrompt = buildUserPrompt({
    plan: ACTIVE_WORKOUT_PLAN,
    answers: sanitized,
  });

  const { output } = await generateText({
    model: openrouter(process.env.OPEN_ROUTER_AI_MODEL!),
    prompt: userPrompt,
    system: WORKOUT_PLAN_SYSTEM_PROMPT,
  });

  const raw = output.trim();
  console.log("Generated workout plan JSON:", raw);

  const validation = validateWorkoutPlanJSON(raw);

  if (validation.status === "invalid") {
    console.error("Workout plan JSON validation error:", validation.error);
    throw new Error(
      `Generated workout plan JSON is invalid: ${validation.error}`,
    );
  }

  return {
    status: "generated",
    plan: validation.plan,
    userId,
  };
}
