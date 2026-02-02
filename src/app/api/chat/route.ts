import "server-only";

import { NextRequest, NextResponse } from "next/server";
import {
  streamText,
  UIMessage,
  convertToModelMessages,
  generateText,
} from "ai";
import { auth } from "@clerk/nextjs/server";
import { openrouter } from "@/lib/server/open-router";
import { createChat, saveMessage } from "@/lib/server/services/chat.service";
import { getActiveNutritionPlanForUser } from "@/lib/server/services/nutrition-plan.service";
import { getActiveWorkoutPlanForUser } from "@/lib/server/services/workout-plan.service";
import {
  CHAT_SYSTEM_PROMPT,
  CHAT_WITH_WORKOUT_PLAN_PROMPT,
  CHAT_WITH_NUTRITION_PLAN_PROMPT,
  CHAT_WITH_BOTH_PLANS_PROMPT,
  GENERATE_CHAT_TITLE_USER_PROMPT,
} from "@/lib/server/ai/ai-prompts";

export async function POST(request: NextRequest) {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const {
    id: chatId,
    messages,
    data,
  }: {
    id: string;
    messages: UIMessage[];
    data?: { workout: boolean; nutrition: boolean };
  } = body;
  const planContext = data || { workout: false, nutrition: false };

  const lastUserMessage = messages
    .filter((message) => message.role === "user")
    .at(-1)
    ?.parts.find((part) => part.type === "text")?.text;

  if (!lastUserMessage) {
    return NextResponse.json({ error: "No user message" }, { status: 400 });
  }

  // first message in the chat
  if (messages.filter((message) => message.role === "assistant").length === 0) {
    const title = await generateText({
      model: openrouter(process.env.OPEN_ROUTER_AI_MODEL!),
      prompt: `
        ${GENERATE_CHAT_TITLE_USER_PROMPT}
        User message: ${lastUserMessage}
      `,
    });

    await createChat({
      userId,
      chatId,
      title: title.output.trim(),
    });
  }

  await saveMessage({
    chatId,
    role: "user",
    content: lastUserMessage,
  });

  let systemPrompt: string = CHAT_SYSTEM_PROMPT;
  let activeWorkoutPlan: string | null = null;
  let activeNutritionPlan: string | null = null;

  if (planContext.workout || planContext.nutrition) {
    if (planContext.workout) {
      const plan = await getActiveWorkoutPlanForUser({ userId });
      activeWorkoutPlan = plan ? JSON.stringify(plan, null, 2) : null;
    }
    if (planContext.nutrition) {
      const plan = await getActiveNutritionPlanForUser({ userId });
      activeNutritionPlan = plan ? JSON.stringify(plan, null, 2) : null;
    }

    if (activeWorkoutPlan && activeNutritionPlan) {
      systemPrompt = `${CHAT_WITH_BOTH_PLANS_PROMPT}
        \nACTIVE WORKOUT PLAN: ${activeWorkoutPlan}
        \nACTIVE NUTRITION PLAN: ${activeNutritionPlan}
      `;
    } else if (activeWorkoutPlan) {
      systemPrompt = `${CHAT_WITH_WORKOUT_PLAN_PROMPT}
        \nACTIVE WORKOUT PLAN: ${activeWorkoutPlan}
      `;
    } else if (activeNutritionPlan) {
      systemPrompt = `${CHAT_WITH_NUTRITION_PLAN_PROMPT}
        \nACTIVE NUTRITION PLAN: ${activeNutritionPlan}
      `;
    }
  }

  console.log("System Prompt:", systemPrompt);

  const result = streamText({
    model: openrouter(process.env.OPEN_ROUTER_AI_MODEL!),
    messages: await convertToModelMessages(messages),
    system: systemPrompt,
    onFinish: async (result) => {
      await saveMessage({
        chatId,
        role: "assistant",
        content: result.text,
      });
    },
  });

  return result.toUIMessageStreamResponse();
}
