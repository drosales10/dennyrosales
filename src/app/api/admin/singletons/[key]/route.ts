import { NextResponse } from "next/server";
import { Prisma } from "@prisma/client";

import { requireAdmin } from "@/lib/admin-auth";
import { prisma } from "@/lib/prisma";

export async function GET(_request: Request, context: { params: Promise<{ key: string }> }) {
  const unauthorized = await requireAdmin();
  if (unauthorized) return unauthorized;

  const { key } = await context.params;

  const singleton = await prisma.landingSingleton.findUnique({ where: { key } });
  return NextResponse.json({ singleton });
}

export async function PUT(request: Request, context: { params: Promise<{ key: string }> }) {
  const unauthorized = await requireAdmin();
  if (unauthorized) return unauthorized;

  const { key } = await context.params;
  const body = (await request.json()) as { value?: unknown };

  if (body.value === undefined) {
    return NextResponse.json({ error: "value es requerido" }, { status: 400 });
  }

  const singleton = await prisma.landingSingleton.upsert({
    where: { key },
    update: { value: body.value as Prisma.InputJsonValue },
    create: { key, value: body.value as Prisma.InputJsonValue },
  });

  return NextResponse.json({ singleton });
}
