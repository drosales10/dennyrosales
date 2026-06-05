import { NextResponse } from "next/server";

import { createAdminSessionCookie, isValidAdminCredentials } from "@/lib/admin-auth";

export async function POST(request: Request) {
  const body = (await request.json()) as { username?: string; password?: string };

  if (!body.username || !body.password) {
    return NextResponse.json({ error: "Usuario y password son requeridos" }, { status: 400 });
  }

  if (!isValidAdminCredentials(body.username, body.password)) {
    return NextResponse.json({ error: "Credenciales invalidas" }, { status: 401 });
  }

  const response = NextResponse.json({ ok: true });
  response.cookies.set(createAdminSessionCookie());

  return response;
}
