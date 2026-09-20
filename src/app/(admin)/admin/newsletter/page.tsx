import type { Metadata } from "next"
import { getNewsletterSubscribers } from "@/lib/data/newsletter"
import { SubscriberList } from "./components/subscriber-list"
import { Divider } from "@/components/ui/divider"

export const metadata: Metadata = {
  title: "Newsletter Subscribers",
}

export default async function AdminNewsletterPage() {
  const subscribers = await getNewsletterSubscribers()

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold">Newsletter Subscribers</h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Manage reader email subscriptions, statuses, and export subscriber lists.
        </p>
      </div>
      <Divider />
      <SubscriberList initialSubscribers={subscribers} />
    </div>
  )
}
