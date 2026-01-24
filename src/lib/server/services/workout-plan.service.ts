import { generateText } from "ai";
import { openrouter } from "@/lib/server/open-router";
import { ACTIVE_WORKOUT_PLAN } from "@/lib/templates";
import {
  assertPlanVersion,
  validateAnswersAgainstPlan,
  sanitizeAnswers,
  buildUserPrompt,
} from "@/lib/domain/plan.helpers";
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
