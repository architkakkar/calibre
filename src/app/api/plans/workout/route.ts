import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { createWorkoutPlan } from "@/lib/server/services/workout-plan.service";

export async function POST(request: NextRequest) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { planVersion, answers } = body;

    if (!planVersion || typeof planVersion !== "string") {
      return NextResponse.json(
        { error: "Invalid or missing planVersion" },
        { status: 400 },
      );
    }

    if (!answers || typeof answers !== "object") {
      return NextResponse.json(
        { error: "Invalid or missing answers" },
        { status: 400 },
      );
    }

    const result = await createWorkoutPlan({
      userId,
      planVersion,
      answers,
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error("Workout plan creation failed:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
