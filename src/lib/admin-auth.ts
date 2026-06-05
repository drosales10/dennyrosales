import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export const ADMIN_COOKIE_NAME = "admin_session";

export const LANDING_SECTIONS = [
  "expertise",
  "projects",
  "events",
  "articles",
  "timeline",
  "certifications",
] as const;

export type LandingSection = (typeof LANDING_SECTIONS)[number];

function getAdminSessionSecret() {
  return process.env.ADMIN_SESSION_SECRET || "cambiar-esto-en-env";
}

export function isValidAdminCredentials(username: string, password: string) {
  const adminUser = process.env.ADMIN_USERNAME;
  const adminPass = process.env.ADMIN_PASSWORD;

  return username === adminUser && password === adminPass;
}

export function createAdminSessionCookie() {
  return {
    name: ADMIN_COOKIE_NAME,
    value: getAdminSessionSecret(),
    httpOnly: true,
    sameSite: "lax" as const,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24,
  };
}

export function clearAdminSessionCookie() {
  return {
    name: ADMIN_COOKIE_NAME,
    value: "",
    httpOnly: true,
    sameSite: "lax" as const,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 0,
  };
}

export async function hasAdminSession() {
  const store = await cookies();
  return store.get(ADMIN_COOKIE_NAME)?.value === getAdminSessionSecret();
}

export async function requireAdmin() {
  if (!(await hasAdminSession())) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  return null;
}

export function hasAdminSessionRequest(request: NextRequest) {
  return request.cookies.get(ADMIN_COOKIE_NAME)?.value === getAdminSessionSecret();
}
