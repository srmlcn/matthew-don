import { test, expect } from "@playwright/test"

const staticPages = [
  { path: "/", heading: /Matthew Don/i },
  { path: "/about", heading: /About Me/i },
  { path: "/contact", heading: /Get in Touch/i },
]

const catalogPages = [
  {
    path: "/books/the-adventures-of-luca-and-kai-the-celestial-samurai",
    heading: /Celestial Samurai/i,
  },
  {
    path: "/books/the-adventures-of-luca-and-kai-the-moon-queen",
    heading: /Moon Queen/i,
  },
  {
    path: "/books/a-celebration-of-the-history-of-celebrating-history",
    heading: /Celebration of the History/i,
  },
  {
    path: "/books/the-adventures-of-luca-and-kai-hyogikai",
    heading: /Hyogikai/i,
  },
  {
    path: "/comics/the-adventures-of-luca-and-kai-the-comics",
    heading: /Comics/i,
  },
]

for (const { path, heading } of staticPages) {
  test(`static page loads: ${path}`, async ({ page }) => {
    await page.goto(path)
    await expect(page.locator("#main-content")).toBeVisible()
    await expect(page.getByRole("heading", { name: heading })).toBeVisible()
  })
}

for (const { path, heading } of catalogPages) {
  test(`catalog page loads: ${path}`, async ({ page }) => {
    await page.goto(path, { waitUntil: "domcontentloaded" })
    await expect(page.locator("#main-content")).toBeVisible()
    await expect(page.getByRole("heading", { name: heading })).toBeVisible()
  })
}

test("books dropdown links resolve", async ({ page, isMobile }) => {
  test.skip(isMobile, "Desktop books dropdown only")

  await page.goto("/")
  await page.getByRole("button", { name: "Books" }).click()
  await page.getByText(/Moon Queen \(Book 1\)/).click()
  await expect(page).toHaveURL(/the-moon-queen/)
  await expect(
    page.getByRole("heading", { name: /Moon Queen/i })
  ).toBeVisible()
})

test("mobile nav opens and links to about", async ({ page, isMobile }) => {
  test.skip(!isMobile, "Mobile-only navigation check")

  await page.goto("/")
  await page.getByRole("button", { name: /open menu/i }).click()
  await page
    .getByRole("navigation")
    .getByRole("link", { name: "About", exact: true })
    .click()
  await expect(page).toHaveURL("/about")
  await expect(page.getByRole("heading", { name: /About Me/i })).toBeVisible()
})
