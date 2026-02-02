import "server-only";

import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/server/db/drizzle";
import {
  usersTable,
  userProfilesTable,
  userGoalsTable,
} from "@/lib/server/db/schema";
import { eq } from "drizzle-orm";

export async function POST() {
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    // Fetch all user data
    const profile = await db
      .select()
      .from(userProfilesTable)
      .where(eq(userProfilesTable.user_id, userId));

    const goals = await db
      .select()
      .from(userGoalsTable)
      .where(eq(userGoalsTable.user_id, userId));

    const user = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.id, userId));

    // TODO: Add workout plans, nutrition plans, chat history, etc.

    const exportData = {
      exportDate: new Date().toISOString(),
      user: user[0] || {},
      profile: profile[0] || {},
      goals: goals[0] || {},
      // Add more data as needed
    };

    // Convert to JSON and return as downloadable file
    const jsonData = JSON.stringify(exportData, null, 2);
    const blob = new Blob([jsonData], { type: "application/json" });

    return new NextResponse(blob, {
      headers: {
        "Content-Type": "application/json",
        "Content-Disposition": `attachment; filename="calibre-data-export-${new Date().toISOString().split("T")[0]}.json"`,
      },
    });
  } catch (error) {
    console.error("Error exporting data:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
