import "server-only";

import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";

export async function POST(request: NextRequest) {
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { type, message } = body;

    if (!type || !message) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    // In production, save to database or send to a feedback service
    console.log("Feedback received:", {
      userId,
      type,
      message,
      timestamp: new Date().toISOString(),
    });

    // TODO: Save to database or send email notification
    // await db.insert(feedbackTable).values({
    //   userId,
    //   type,
    //   message,
    //   createdAt: new Date(),
    // });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error submitting feedback:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
