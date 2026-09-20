import { type NextRequest, NextResponse } from "next/server"
import { withAuth } from "@kinde-oss/kinde-auth-nextjs/middleware"

export default function middleware(req: NextRequest) {
  if (!process.env["KINDE_ISSUER_URL"]) {
    return NextResponse.next()
  }

  return withAuth(req, {
    isReturnToCurrentPage: true,
    redirectURLBase: req.nextUrl.origin,
  })
}

export const config = {
  matcher: ["/admin/:path*"],
}
