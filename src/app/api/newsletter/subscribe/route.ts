import { NextResponse } from "next/server"
import { subscribeNewsletter } from "@/app/(admin)/admin/newsletter/actions"

export async function POST(request: Request) {
  try {
    const json = await request.json().catch(() => ({}))
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
      request.headers.get("x-real-ip") ??
      "anonymous"

    const result = await subscribeNewsletter(json, ip)
    if (!result.ok) {
      const isRateLimit = result.error.includes("Too many")
      return NextResponse.json(
        { ok: false, error: result.error },
        { status: isRateLimit ? 429 : 400 },
      )
    }

    return NextResponse.json({ ok: true, message: result.message })
  } catch (error) {
    return NextResponse.json(
      { ok: false, error: "Internal server error" },
      { status: 500 },
    )
  }
}
