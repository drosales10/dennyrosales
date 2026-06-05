import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const userCount = await prisma.user.count();

    return NextResponse.json({
      ok: true,
      database: "connected",
      userCount,
      timestamp: new Date().toISOString(),
    });
  } catch {
    return NextResponse.json(
      {
        ok: false,
        database: "disconnected",
        timestamp: new Date().toISOString(),
      },
      { status: 503 }
    );
  }
}
