import "server-only";

import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { getOverviewStats } from "@/lib/server/services/dashboard.service";

export async function GET() {
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const data = await getOverviewStats({ userId });
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching overview stats:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
