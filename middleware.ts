import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// This middleware runs before the request reaches the route handler
export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  // Define paths that are protected and require authentication
  const protectedPaths = ["/dashboard", "/pin", "/otp"];

  // If the path is one of the protected ones
  if (protectedPaths.some((protectedPath) => path.startsWith(protectedPath))) {
    // Access the accessToken from localStorage (client-side), or better, use cookies.
    const accessToken = request.cookies.get("accesstoken");

    // If there's no accessToken, redirect to error page
    if (!accessToken) {
      return NextResponse.redirect(new URL("/error", request.url));
    }
  }

  // Allow access to "/" or "/login"
  if (path === "/" || path === "/login") {
    return NextResponse.next();
  }

  // Default behavior to allow the request if none of the above conditions are matched
  return NextResponse.next();
}

// Apply middleware to specific paths
export const config = {
  matcher: ["/dashboard", "/otp", "/pin", "/error", "/login"],
};
