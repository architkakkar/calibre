import "server-only";

import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import {
  getTodayHydration,
  addWater,
  updateHydrationTarget,
} from "@/lib/server/services/dashboard.service";
import {
  addWaterInputSchema,
  updateHydrationTargetInputSchema,
} from "@/lib/validators/dashboard.validator";

export async function GET() {
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const data = await getTodayHydration({ userId });

    // Return null if user hasn't set up hydration tracking
    if (data === null) {
      return NextResponse.json(null);
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching today's hydration:", error);
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

    const validated = addWaterInputSchema.parse({
      userId,
      ...body,
    });

    const result = await addWater(validated);

    return NextResponse.json(result);
  } catch (error) {
    console.error("Error adding water:", error);
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

    const validated = updateHydrationTargetInputSchema.parse({
      userId,
      ...body,
    });

    const result = await updateHydrationTarget(validated);

    return NextResponse.json(result);
  } catch (error) {
    console.error("Error updating hydration target:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
