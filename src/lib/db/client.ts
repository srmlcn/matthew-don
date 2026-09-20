/**
 * Neon Postgres client for Drizzle.
 */

import { neon } from "@neondatabase/serverless"
import { drizzle } from "drizzle-orm/neon-http"
import * as schema from "./schema"

function getDatabaseUrl(): string {
  const url = process.env["DATABASE_URL"]
  if (!url) {
    throw new Error(
      "DATABASE_URL is not set. Add it to .env.local or your deployment environment.",
    )
  }
  return url
}

let _db: ReturnType<typeof drizzle<typeof schema>> | null = null

function getDb() {
  if (!_db) {
    const sql = neon(getDatabaseUrl())
    _db = drizzle(sql, { schema })
  }
  return _db
}

export const db = new Proxy({} as ReturnType<typeof drizzle<typeof schema>>, {
  get(_target, prop, receiver) {
    const realDb = getDb()
    const value = Reflect.get(realDb, prop, receiver)
    if (typeof value === "function") {
      return value.bind(realDb)
    }
    return value
  },
})
