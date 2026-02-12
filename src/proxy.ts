import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export default function proxy(request: NextRequest) {
  // Check if the user is on the root path
  if (request.nextUrl.pathname === "/") {
    // Redirect to /game
    return NextResponse.redirect(new URL("/game", request.url));
  }

  return NextResponse.next();
}

// Configure which paths the middleware should run on
export const config = {
  matcher: "/",
};
