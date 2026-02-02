import "server-only";

import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/server/db/drizzle";
import { userProfilesTable } from "@/lib/server/db/schema";
import { eq } from "drizzle-orm";

export async function GET() {
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const profile = await db
      .select()
      .from(userProfilesTable)
      .where(eq(userProfilesTable.user_id, userId))
      .limit(1);

    if (!profile.length) {
      return NextResponse.json({ error: "Profile not found" }, { status: 404 });
    }

    const data = profile[0];

    return NextResponse.json({
      height: String(data.height_cm),
      weight: String(data.weight_kg),
      activityLevel: data.activity_level,
      fitnessLevel: data.fitness_level,
    });
  } catch (error) {
    console.error("Error fetching physical stats:", error);
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
    const { height, weight, activityLevel, fitnessLevel } = body;

    const updates: any = {};
    if (height !== undefined) updates.height_cm = parseInt(height);
    if (weight !== undefined) updates.weight_kg = parseInt(weight);
    if (activityLevel !== undefined) updates.activity_level = activityLevel;
    if (fitnessLevel !== undefined) updates.fitness_level = fitnessLevel;
    updates.updated_at = new Date();

    await db
      .update(userProfilesTable)
      .set(updates)
      .where(eq(userProfilesTable.user_id, userId));

    // Fetch updated data
    const updated = await db
      .select()
      .from(userProfilesTable)
      .where(eq(userProfilesTable.user_id, userId))
      .limit(1);

    const data = updated[0];

    return NextResponse.json({
      height: String(data.height_cm),
      weight: String(data.weight_kg),
      activityLevel: data.activity_level,
      fitnessLevel: data.fitness_level,
    });
  } catch (error) {
    console.error("Error updating physical stats:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
