import "server-only";

import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { z } from "zod";
import {
  getTodayNutrition,
  completeMeal,
} from "@/lib/server/services/dashboard.service";
import { completeMealInputSchema } from "@/lib/validators/dashboard.validator";

export async function GET() {
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const data = await getTodayNutrition({ userId });
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching today's nutrition:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();

    const validated = completeMealInputSchema.parse({
      userId,
      ...body,
    });

    const result = await completeMeal(validated);

    return NextResponse.json(result);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid request body", details: error.issues },
        { status: 400 },
      );
    }
    console.error("Error completing meal:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
