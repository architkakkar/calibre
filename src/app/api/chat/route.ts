import { streamText, UIMessage, convertToModelMessages } from "ai";
import { createOpenRouter } from "@openrouter/ai-sdk-provider";

export async function POST(req: Request) {
  const openrouter = createOpenRouter({
    apiKey: process.env.OPEN_ROUTER_API_KEY!,
  });
  const { messages }: { messages: UIMessage[] } = await req.json();

  const result = streamText({
    model: openrouter("xiaomi/mimo-v2-flash:free"),
    messages: await convertToModelMessages(messages),
  });

  return result.toUIMessageStreamResponse();
}
