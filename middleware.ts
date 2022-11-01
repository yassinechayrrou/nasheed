import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest): NextResponse | null {
  if (!req.cookies.has("ACCESS_TOKEN")) {
    return NextResponse.rewrite(new URL("/signin", req.url));
  }
}

export const config = {
  matcher: ["/", "/library", "/playlist"],
};
