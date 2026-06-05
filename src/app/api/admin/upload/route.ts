import { randomUUID } from "node:crypto";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

import { NextResponse } from "next/server";

import { requireAdmin } from "@/lib/admin-auth";

const ALLOWED_MIME_TYPES = new Set([
  "image/png",
  "image/jpeg",
  "image/jpg",
  "image/gif",
  "video/mp4",
]);

function extensionFromMime(mimeType: string) {
  switch (mimeType) {
    case "image/png":
      return "png";
    case "image/jpeg":
    case "image/jpg":
      return "jpg";
    case "image/gif":
      return "gif";
    case "video/mp4":
      return "mp4";
    default:
      return "bin";
  }
}

export async function POST(request: Request) {
  const unauthorized = await requireAdmin();
  if (unauthorized) return unauthorized;

  const formData = await request.formData();
  const file = formData.get("file");

  if (!(file instanceof File)) {
    return NextResponse.json({ error: "Archivo requerido" }, { status: 400 });
  }

  if (!ALLOWED_MIME_TYPES.has(file.type)) {
    return NextResponse.json(
      { error: "Formato no permitido. Solo PNG, JPG, GIF y MP4." },
      { status: 400 }
    );
  }

  const extension = extensionFromMime(file.type);
  const fileName = `${Date.now()}-${randomUUID()}.${extension}`;

  const uploadDirectory = path.join(process.cwd(), "public", "uploads");
  const filePath = path.join(uploadDirectory, fileName);

  await mkdir(uploadDirectory, { recursive: true });

  const bytes = await file.arrayBuffer();
  await writeFile(filePath, Buffer.from(bytes));

  return NextResponse.json({
    url: `/uploads/${fileName}`,
    mimeType: file.type,
    fileName,
  });
}
