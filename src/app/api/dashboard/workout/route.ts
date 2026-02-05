import "server-only";

import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { z } from "zod";
import {
  getTodayWorkout,
  completeWorkout,
} from "@/lib/server/services/dashboard.service";
import { workoutSectionsSchema } from "@/lib/validators/dashboard.validator";

export async function GET() {
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const data = await getTodayWorkout({ userId });
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching today's workout:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();

    // Validate request body
    const requestSchema = z.object({
      sessionId: z.string(),
      sections: workoutSectionsSchema,
      difficultyRating: z.number().min(1).max(10).optional(),
      notes: z.string().optional(),
    });

    const validated = requestSchema.parse(body);

    const result = await completeWorkout({
      userId,
      ...validated,
    });

    return NextResponse.json(result);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid request body", details: error.issues },
        { status: 400 },
      );
    }
    console.error("Error completing workout:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
