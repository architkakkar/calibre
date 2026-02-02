import "server-only";

import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/server/db/drizzle";
import { userGoalsTable } from "@/lib/server/db/schema";
import { eq } from "drizzle-orm";

export async function GET() {
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const goals = await db
      .select()
      .from(userGoalsTable)
      .where(eq(userGoalsTable.user_id, userId))
      .limit(1);

    if (!goals.length) {
      return NextResponse.json({ error: "Goals not found" }, { status: 404 });
    }

    const data = goals[0];

    return NextResponse.json({
      primaryGoals: data.primary_goals.join(", "),
      targetWeight: String(data.target_weight_kg),
      commitmentLevel: data.commitment_level,
      weeklyFrequency: data.weekly_frequency,
    });
  } catch (error) {
    console.error("Error fetching fitness goals:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}

export async function PATCH(request: NextRequest) {
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { primaryGoals, targetWeight, commitmentLevel, weeklyFrequency } =
      body;

    const updates: any = {};
    if (primaryGoals !== undefined) {
      // Convert comma-separated string to array
      updates.primary_goals = primaryGoals
        .split(",")
        .map((g: string) => g.trim())
        .filter(Boolean);
    }
    if (targetWeight !== undefined)
      updates.target_weight_kg = parseInt(targetWeight);
    if (commitmentLevel !== undefined)
      updates.commitment_level = commitmentLevel;
    if (weeklyFrequency !== undefined)
      updates.weekly_frequency = weeklyFrequency;
    updates.updated_at = new Date();

    await db
      .update(userGoalsTable)
      .set(updates)
      .where(eq(userGoalsTable.user_id, userId));

    // Fetch updated data
    const updated = await db
      .select()
      .from(userGoalsTable)
      .where(eq(userGoalsTable.user_id, userId))
      .limit(1);

    const data = updated[0];

    return NextResponse.json({
      primaryGoals: data.primary_goals.join(", "),
      targetWeight: String(data.target_weight_kg),
      commitmentLevel: data.commitment_level,
      weeklyFrequency: data.weekly_frequency,
    });
  } catch (error) {
    console.error("Error updating fitness goals:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
