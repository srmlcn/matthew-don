import { config as loadEnv } from "dotenv"
import { defineConfig } from "drizzle-kit"

// Match Next.js: .env.local overrides .env (drizzle-kit does not load these by default)
loadEnv({ path: ".env.local" })
loadEnv()

function getDatabaseUrl(): string {
  const url = process.env["DATABASE_URL"]
  if (!url) {
    throw new Error(
      "DATABASE_URL is not set. Add your Neon connection string to .env.local.",
    )
  }
  return url
}

export default defineConfig({
  schema: "./src/lib/db/schema.ts",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    url: getDatabaseUrl(),
  },
})
