import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { getUserChats } from "@/lib/server/services/chat.service";

export async function GET() {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const chats = await getUserChats({ userId });

  return NextResponse.json({ chats });
}
