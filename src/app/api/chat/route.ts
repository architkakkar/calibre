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
import { SYSTEM_PROMPT, TITLE_PROMPT } from "@/lib/server/ai-prompts";

export async function POST(request: NextRequest) {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const { id: chatId, messages }: { id: string; messages: UIMessage[] } = body;

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
        ${TITLE_PROMPT}
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

  const result = streamText({
    model: openrouter(process.env.OPEN_ROUTER_AI_MODEL!),
    messages: await convertToModelMessages(messages),
    system: `${SYSTEM_PROMPT}`,
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
