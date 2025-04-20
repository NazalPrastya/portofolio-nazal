import type React from "react";
import { SidebarProvider, SidebarTrigger } from "~/components/ui/sidebar";
import { AppSidebar } from "~/components/app-sidebar";
import { AuthRoute } from "./AuthRoute";
import { ThemeToggle } from "~/components/theme-toggle";
import { UserNav } from "~/components/user-nav";
import { api } from "~/utils/api";
import Head from "next/head";
import Footer from "~/sections/footer";

export default function DashboardLayout({
  children,
  title = " ",
}: {
  children: React.ReactNode;
  title: string;
}) {
  const { data } = api.profile.getProfile.useQuery() as {
    data: Record<string, string> | undefined;
  };
  return (
    <AuthRoute>
      <Head>
        <title>Dashboard | {title}</title>
        <link rel="icon" href="/favicon.png" />
        <link rel="shortcut icon" href="/favicon.png" />
      </Head>
      <SidebarProvider>
        <AppSidebar />
        <main className="flex min-h-screen w-full flex-col">
          <header className="bg-background sticky top-0 z-10 flex h-16 items-center justify-between gap-4 border-b px-4 sm:px-6">
            <SidebarTrigger />
            <div className="ml-auto flex items-center space-x-4">
              <ThemeToggle />
              {data && <UserNav user={data} />}
            </div>
          </header>
          <>
            <div className="border-b px-4 py-4 sm:px-6">
              <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
            </div>
            <div className="flex-1 p-4 sm:p-6">{children}</div>
            <Footer />
          </>
        </main>
      </SidebarProvider>
    </AuthRoute>
  );
}
