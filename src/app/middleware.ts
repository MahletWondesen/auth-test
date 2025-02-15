import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const protectedPaths = ["/dashboard", "/pin", "/otp"];

  const authToken = request.cookies.get("auth_token");

  if (protectedPaths.includes(path) && !authToken) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}
