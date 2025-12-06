/**
 * Newsletter Signup Component
 *
 * Email capture for upcoming releases and reader engagement.
 */

"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { AnimatedSection } from "./animated-section"

export function NewsletterSignup() {
  const [email, setEmail] = React.useState("")
  const [status, setStatus] = React.useState<
    "idle" | "loading" | "success" | "error"
  >("idle")
  const [message, setMessage] = React.useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus("loading")

    // TODO: Integrate with email service (Mailchimp, ConvertKit, etc.)
    // For now, just simulate submission
    setTimeout(() => {
      setStatus("success")
      setMessage("Thanks for subscribing! Check your email to confirm.")
      setEmail("")
    }, 1000)
  }

  return (
    <AnimatedSection className="py-12">
      <div className="max-w-2xl mx-auto bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 rounded-2xl p-8 text-center">
        <h2 className="text-3xl font-bold mb-2">Stay in the Loop!</h2>
        <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
          Get notified about new releases, special offers, and behind-the-scenes
          updates.
        </p>

        {status === "success" ? (
          <div className="bg-green-100 dark:bg-green-900/30 border border-green-400 dark:border-green-700 text-green-800 dark:text-green-300 px-6 py-4 rounded-lg">
            {message}
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your.email@example.com"
              required
              disabled={status === "loading"}
              className="flex-1 px-4 py-3 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
              aria-label="Email address"
            />
            <Button type="submit" disabled={status === "loading"} size="lg">
              {status === "loading" ? "Subscribing..." : "Subscribe"}
            </Button>
          </form>
        )}

        {status === "error" && (
          <p className="mt-4 text-sm text-red-600 dark:text-red-400">
            {message}
          </p>
        )}

        <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
          We respect your privacy. Unsubscribe at any time.
        </p>
      </div>
    </AnimatedSection>
  )
}
