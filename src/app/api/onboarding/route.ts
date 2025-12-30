import "server-only";

import { NextRequest, NextResponse } from "next/server";
import { auth, currentUser } from "@clerk/nextjs/server";
import { OnboardingSchema } from "@/lib/validators/onboarding.validator";
import { onboardUser } from "@/lib/server/services/user.service";

export async function POST(request: NextRequest) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const parseResult = OnboardingSchema.safeParse(body);

    if (!parseResult.success) {
      console.error("Onboarding validation failed:", parseResult.error);
      return NextResponse.json(
        { error: "Invalid request body", details: parseResult.error },
        { status: 400 }
      );
    }
    const { profile, goals } = parseResult.data;
    
    const user = await currentUser();
    const primaryEmail = user?.emailAddresses[0]?.emailAddress;

    await onboardUser({
      userId,
      email: primaryEmail,
      profile,
      goals,
    });

    return NextResponse.json(
      { message: "Onboarding completed successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Onboarding failed:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
