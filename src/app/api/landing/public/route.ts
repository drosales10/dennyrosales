import { NextResponse } from "next/server";

import { LANDING_SECTIONS } from "@/lib/admin-auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const [entries, singletons] = await Promise.all([
    prisma.landingEntry.findMany({
      orderBy: [{ section: "asc" }, { sortOrder: "asc" }, { createdAt: "asc" }],
    }),
    prisma.landingSingleton.findMany(),
  ]);

  const sections: Record<string, typeof entries> = {};

  for (const section of LANDING_SECTIONS) {
    sections[section] = entries.filter((entry) => entry.section === section);
  }

  const singletonMap = Object.fromEntries(singletons.map((item) => [item.key, item.value]));

  return NextResponse.json({
    sections,
    singletons: singletonMap,
  });
}
