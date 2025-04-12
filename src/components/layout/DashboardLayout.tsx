import type React from "react"
import { SidebarProvider, SidebarTrigger } from "~/components/ui/sidebar"
import { AppSidebar } from "~/components/app-sidebar"
import { AuthRoute } from "./AuthRoute"
import { ThemeToggle } from "~/components/theme-toggle"
import { UserNav } from "~/components/user-nav"
import { api } from "~/utils/api"
import Head from "next/head"
interface UserNavProps {
  user: {
    email: string;
    emailVerified: string;
    id: string;
    image: string;
    name: string;
  };
}
export default function DashboardLayout({ children,title }: { children: React.ReactNode,title:string }) {
  const {data} = api.profile.getProfile.useQuery()
  return (
    <AuthRoute>
      <Head>
        <title>{title}</title>
      </Head>
      <SidebarProvider>
        <AppSidebar />
        <main className="flex flex-col min-h-screen w-full">
          <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-4 sm:px-6 justify-between">
            <SidebarTrigger />
            <div className="ml-auto flex items-center space-x-4">
              <ThemeToggle />
              <UserNav user={data as UserNavProps["user"]} />
            </div>
          </header>
          <div className="px-4 sm:px-6 py-4 border-b">
            <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
          </div>
          <div className="flex-1 p-4 sm:p-6">{children}</div>
        </main>
      </SidebarProvider>
    </AuthRoute>
  )
}
