import type { Metadata } from "next"
import { redirect } from "next/navigation"
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components"
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
} from "@/components/ui/navbar"
import { LinkButton } from "@/components/ui/link-button"
import { Divider } from "@/components/ui/divider"
import { buttonVariants } from "@/components/ui/button"
import { AdminNav } from "./components/admin-nav"
import { colors } from "@/lib/theme"

export const dynamic = "force-dynamic"

export const metadata: Metadata = {
  title: {
    default: "Admin",
    template: "%s | Admin | Matthew Don",
  },
  robots: {
    index: false,
    follow: false,
  },
}

export default async function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  if (!process.env["KINDE_ISSUER_URL"]) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center p-4">
        <div className="max-w-md rounded-lg border border-gray-200 p-6 text-center dark:border-gray-800">
          <h1 className="text-xl font-bold">Admin auth not configured</h1>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            Set KINDE_ISSUER_URL and related Kinde environment variables to access the admin panel.
          </p>
          <div className="mt-4">
            <LinkButton href="/" variant="outline" size="sm">
              Back to site
            </LinkButton>
          </div>
        </div>
      </div>
    )
  }

  const { isAuthenticated, getUser } = getKindeServerSession()
  if (!(await isAuthenticated())) {
    redirect("/api/auth/login?post_login_redirect_url=/admin")
  }
  const user = await getUser()

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar aria-label="Admin top bar">
        <NavbarBrand>
          <span
            aria-hidden="true"
            className="inline-block h-2 w-2 rounded-full"
            style={{ backgroundColor: colors.brand.secondary.default }}
          />
          <span className="font-bold">Admin</span>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            Matthew Don
          </span>
        </NavbarBrand>
        <NavbarContent justify="end">
          {user?.email ? (
            <span className="hidden text-sm text-gray-500 sm:inline dark:text-gray-400">
              {user.email}
            </span>
          ) : null}
          <LinkButton href="/" variant="ghost" size="sm">
            View site
          </LinkButton>
          <LogoutLink
            className={buttonVariants({ variant: "outline", size: "sm" })}
          >
            Sign out
          </LogoutLink>
        </NavbarContent>
      </Navbar>
      <div className="container mx-auto flex flex-1 flex-col gap-6 px-4 py-8 md:flex-row md:gap-8">
        <aside className="shrink-0 md:w-56">
          <AdminNav />
        </aside>
        <div className="hidden md:block" aria-hidden="true">
          <Divider orientation="vertical" className="h-full" />
        </div>
        <main className="min-w-0 flex-1">{children}</main>
      </div>
    </div>
  )
}
