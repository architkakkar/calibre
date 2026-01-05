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
  if (messages.length === 1) {
    const title = await generateText({
      model: openrouter(process.env.OPEN_ROUTER_AI_MODEL!),
      prompt: `
        Generate a short and concise title for a chat conversation based on the following message: "${lastUserMessage}". 
        The title should be around 2-4 words.
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
