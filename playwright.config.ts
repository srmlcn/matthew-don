import { defineConfig, devices } from "@playwright/test"

const PORT = 3000
const baseURL = `http://localhost:${PORT}`

export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  workers: process.env["CI"] ? 1 : 4,
  forbidOnly: !!process.env["CI"],
  retries: process.env["CI"] ? 2 : 0,
  reporter: process.env["CI"] ? "github" : "list",
  use: {
    baseURL,
    trace: "on-first-retry",
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
    {
      name: "mobile-chrome",
      use: { ...devices["Pixel 5"] },
    },
  ],
  webServer: {
    command: "npm run build && npm run start -- -p 3000",
    url: baseURL,
    reuseExistingServer: !process.env["CI"],
    timeout: 120_000,
  },
})
