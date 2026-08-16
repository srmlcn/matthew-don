import { test, expect } from "@playwright/test"

test("site footer is present", async ({ page }) => {
  await page.goto("/")
  await expect(page.getByRole("contentinfo")).toContainText(
    "© 2025 Matthew Don"
  )
})

test("home books section is reachable", async ({ page }) => {
  await page.goto("/#books")
  await expect(page.locator("#books")).toBeVisible()
  await expect(page.getByRole("heading", { name: /My Books/i })).toBeVisible()
})

test("invalid book slug shows not found page", async ({ page }) => {
  await page.goto("/books/not-a-real-book")
  await expect(
    page.getByRole("heading", { name: "Page Not Found" })
  ).toBeVisible()
})
