import "server-only";

import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";

export async function PATCH(request: NextRequest) {
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();

    // In production, save preferences to database
    console.log("Privacy settings updated:", {
      userId,
      settings: body,
      timestamp: new Date().toISOString(),
    });

    // TODO: Save to database
    // await db.update(userPrivacyTable)
    //   .set(body)
    //   .where(eq(userPrivacyTable.userId, userId));

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error updating privacy settings:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
