import "server-only";

import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import {
  chatExistsForUser,
  getChatMessages,
} from "@/lib/server/services/chat.service";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ chatId: string }> }
) {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { chatId } = await params;

  const exists = await chatExistsForUser({ userId, chatId });
  if (!exists) {
    return NextResponse.json({ error: "Chat not found" }, { status: 404 });
  }

  const messages = await getChatMessages({ chatId });

  return NextResponse.json({ messages });
}
