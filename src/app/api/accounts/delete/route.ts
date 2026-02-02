import "server-only";

import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/server/db/drizzle";
import { usersTable } from "@/lib/server/db/schema";
import { eq } from "drizzle-orm";

export async function DELETE() {
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    // Mark account for deletion (soft delete) or perform hard delete
    // In production, you might want to:
    // 1. Mark account as deleted and schedule cleanup
    // 2. Send confirmation email
    // 3. Allow grace period for recovery

    await db
      .update(usersTable)
      .set({
        is_active: false,
        updated_at: new Date(),
      })
      .where(eq(usersTable.id, userId));

    // TODO: Schedule complete data deletion after grace period
    // TODO: Revoke all access tokens
    // TODO: Send deletion confirmation email

    console.log("Account deletion requested:", {
      userId,
      timestamp: new Date().toISOString(),
    });

    return NextResponse.json({
      success: true,
      message: "Account has been scheduled for deletion",
    });
  } catch (error) {
    console.error("Error deleting account:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
