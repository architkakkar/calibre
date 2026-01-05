import "server-only";

import { db } from "@/lib/server/db/drizzle";
import { eq } from "drizzle-orm";
import { nanoid } from "nanoid";
import { chatsTable, messagesTable } from "@/lib/server/db/schema";

export async function createChat({
  userId,
  chatId,
  title,
}: {
  userId: string;
  chatId: string;
  title: string;
}) {
  // insert new chat
  await db.insert(chatsTable).values({
    id: chatId,
    user_id: userId,
    title,
  });
}

export async function saveMessage({
  chatId,
  role,
  content,
}: {
  chatId: string;
  role: "user" | "assistant";
  content: string;
}) {
  const messageId = nanoid();

  // insert new message
  await db.insert(messagesTable).values({
    id: messageId,
    chat_id: chatId,
    role: role === "user" ? "USER" : "ASSISTANT",
    content,
  });

  // update chat's updated_at timestamp
  await db
    .update(chatsTable)
    .set({ updated_at: new Date() })
    .where(eq(chatsTable.id, chatId));
}
