import { withAuth } from "@kinde-oss/kinde-auth-nextjs/middleware"

export default withAuth(async function middleware() {})

export const config = {
  matcher: ["/admin/:path*"],
}
