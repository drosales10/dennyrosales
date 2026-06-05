import { NextResponse } from "next/server";
import { Prisma } from "@prisma/client";

import { requireAdmin } from "@/lib/admin-auth";
import { prisma } from "@/lib/prisma";

export async function PATCH(request: Request, context: { params: Promise<{ id: string }> }) {
  const unauthorized = await requireAdmin();
  if (unauthorized) return unauthorized;

  const { id } = await context.params;

  const body = (await request.json()) as {
    key?: string;
    title?: string;
    subtitle?: string;
    description?: string;
    sortOrder?: number;
    content?: unknown;
  };

  const entry = await prisma.landingEntry.update({
    where: { id },
    data: {
      key: body.key,
      title: body.title,
      subtitle: body.subtitle,
      description: body.description,
      sortOrder: body.sortOrder,
      content: body.content as Prisma.InputJsonValue | Prisma.NullableJsonNullValueInput | undefined,
    },
  });

  return NextResponse.json({ entry });
}

export async function DELETE(_request: Request, context: { params: Promise<{ id: string }> }) {
  const unauthorized = await requireAdmin();
  if (unauthorized) return unauthorized;

  const { id } = await context.params;
  await prisma.landingEntry.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
