import { db } from "@/lib/server/db/drizzle";
import { usersTable } from "@/lib/server/db/schema";

export async function createUser({ id, email }: { id: string; email: string }) {
  if (!id || !email) {
    throw new Error("Invalid user data");
  }

  await db
    .insert(usersTable)
    .values({
      id,
      email,
    })
    .onConflictDoNothing();
}
