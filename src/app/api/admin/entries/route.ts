import { NextResponse } from "next/server";
import { Prisma } from "@prisma/client";

import { LANDING_SECTIONS, requireAdmin } from "@/lib/admin-auth";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  const unauthorized = await requireAdmin();
  if (unauthorized) return unauthorized;

  const { searchParams } = new URL(request.url);
  const section = searchParams.get("section");

  if (!section || !LANDING_SECTIONS.includes(section as (typeof LANDING_SECTIONS)[number])) {
    return NextResponse.json({ error: "Seccion invalida" }, { status: 400 });
  }

  const entries = await prisma.landingEntry.findMany({
    where: { section },
    orderBy: [{ sortOrder: "asc" }, { createdAt: "asc" }],
  });

  return NextResponse.json({ entries });
}

export async function POST(request: Request) {
  const unauthorized = await requireAdmin();
  if (unauthorized) return unauthorized;

  const body = (await request.json()) as {
    section?: string;
    key?: string;
    title?: string;
    subtitle?: string;
    description?: string;
    sortOrder?: number;
    content?: unknown;
  };

  if (!body.section || !LANDING_SECTIONS.includes(body.section as (typeof LANDING_SECTIONS)[number])) {
    return NextResponse.json({ error: "Seccion invalida" }, { status: 400 });
  }

  if (!body.key || !body.title) {
    return NextResponse.json({ error: "key y title son obligatorios" }, { status: 400 });
  }

  try {
    const entry = await prisma.landingEntry.create({
      data: {
        section: body.section,
        key: body.key,
        title: body.title,
        subtitle: body.subtitle || null,
        description: body.description || null,
        sortOrder: body.sortOrder || 0,
        content: (body.content ?? null) as Prisma.InputJsonValue | Prisma.NullableJsonNullValueInput,
      },
    });

    return NextResponse.json({ entry }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "No se pudo crear el registro" }, { status: 400 });
  }
}
