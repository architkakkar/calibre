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
      firstName: data.first_name,
      lastName: data.last_name,
      email: userId, // In production, fetch from Clerk or users table
      dateOfBirth: data.dob,
      gender: data.gender,
    });
  } catch (error) {
    console.error("Error fetching account info:", error);
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
    const { firstName, lastName, dateOfBirth, gender } = body;

    const updates: any = {};
    if (firstName !== undefined) updates.first_name = firstName;
    if (lastName !== undefined) updates.last_name = lastName;
    if (dateOfBirth !== undefined) updates.dob = dateOfBirth;
    if (gender !== undefined) updates.gender = gender;
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
      firstName: data.first_name,
      lastName: data.last_name,
      email: userId,
      dateOfBirth: data.dob,
      gender: data.gender,
    });
  } catch (error) {
    console.error("Error updating account info:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
