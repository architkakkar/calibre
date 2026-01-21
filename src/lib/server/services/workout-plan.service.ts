import { generateText } from "ai";
import { openrouter } from "@/lib/server/open-router";
import { ACTIVE_WORKOUT_PLAN } from "@/lib/templates";
import {
  validateAnswersAgainstPlan,
  sanitizeAnswers,
  extractAiHints,
  assertPlanVersion,
} from "@/lib/domain/plan.helpers";
import {
  buildWorkoutUserPrompt,
  WORKOUT_PLAN_SYSTEM_PROMPT,
} from "@/lib/server/ai-prompts";

export async function createWorkoutPlan({
  userId,
  planVersion,
  answers,
}: {
  userId: string;
  planVersion: string;
  answers: Record<string, unknown>;
}) {
  assertPlanVersion(ACTIVE_WORKOUT_PLAN, planVersion);

  validateAnswersAgainstPlan(ACTIVE_WORKOUT_PLAN, answers);

  const sanitized = sanitizeAnswers(ACTIVE_WORKOUT_PLAN, answers);
  const aiHints = extractAiHints(ACTIVE_WORKOUT_PLAN, sanitized);

  const userPrompt = buildWorkoutUserPrompt({
    answers: sanitized,
    aiHints,
  });

  const plan = await generateText({
    model: openrouter(process.env.OPEN_ROUTER_AI_MODEL!),
    prompt: userPrompt,
    system: WORKOUT_PLAN_SYSTEM_PROMPT,
  });

  return {
    status: "generated",
    plan,
    userId,
  };
}
