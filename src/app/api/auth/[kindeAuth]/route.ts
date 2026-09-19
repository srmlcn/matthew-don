import type { NextRequest } from "next/server"

interface AuthRouteContext {
  params: Promise<{ kindeAuth: string }>
}

// handleAuth() validates Kinde env at call time, so defer the SDK import
// to request time: builds stay green without Kinde vars configured.
export async function GET(request: NextRequest, context: AuthRouteContext) {
  const { handleAuth } = await import("@kinde-oss/kinde-auth-nextjs/server")
  return handleAuth()(request, context)
}
