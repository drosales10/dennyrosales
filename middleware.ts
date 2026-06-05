import { NextRequest, NextResponse } from "next/server";

import { hasAdminSessionRequest } from "@/lib/admin-auth";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isAdminPage = pathname.startsWith("/admin") && !pathname.startsWith("/admin/login");
  const isAdminApi = pathname.startsWith("/api/admin") && !pathname.startsWith("/api/admin/login");

  if ((isAdminPage || isAdminApi) && !hasAdminSessionRequest(request)) {
    if (isAdminApi) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    const loginUrl = new URL("/admin/login", request.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};
