import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { type AppType } from "next/app";
import {  Inter } from "next/font/google";

import { api } from "~/utils/api";

import "~/styles/globals.css";
import { GridPattern } from "~/components/magicui/grid-pattern";
import { ThemeProvider } from "~/components/theme-provider";
import { cn } from "~/lib/utils";
import Footer from "~/sections/footer";
import { Toaster } from "sonner";
import type { Metadata } from "next";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Nazal Prastya - Web Developer",
  description:
    "Portofolio resmi Nazal Gusti Prastya, seorang Web Developer dan UI Designer yang berfokus pada pembuatan aplikasi web modern dan desain antarmuka yang elegan.",
  keywords: [
    "Nazal Prastya",
    "Nazal Gusti Prastya",
    "Portofolio",
    "Web Developer",
    "UI Designer",
    "Frontend Developer",
    "React Developer",
    "Desain UI",
    "Developer Indonesia",
  ],
  authors: [
    { name: "Nazal Gusti Prastya", url: "https://nazalprastya.vercel.app" },
  ],
  creator: "Nazal Gusti Prastya",
  metadataBase: new URL("https://nazalprastya.vercel.app"),
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
  },
  openGraph: {
    title: "Nazal Prastya - Web Developer ",
    description:
      "Lihat karya dan proyek dari Nazal Gusti Prastya, seorang Web Developer",
    url: "nazalprastya.vercel.app",
    siteName: "Nazal Prastya Portofolio",
    // images: [
    //   {
    //     url: "/og-image.jpg",
    //     width: 1200,
    //     height: 630,
    //     alt: "Nazal Prastya - Web Developer ",
    //   },
    // ],
    locale: "id_ID",
    type: "website",
  },
};
const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
    <SessionProvider session={session}>
         <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <div className="relative min-h-screen w-full bg-background">
            <div className="fixed inset-0 z-0 overflow-hidden">
              <GridPattern
                width={20}
                height={20}
                x={-1}
                y={-1}
                className={cn(
                  "[mask-image:linear-gradient(to_bottom_left,white,transparent,transparent)]"
                )}
              />
            </div>
            {/* <CircularText
              text="CONTACT CONTACT CONTACT "
              onHover="speedUp"
              spinDuration={20}
              className="fixed z-20 bottom-2 right-4"
            /> */}
            {/* Main Content */}
      <div className={"relative z-10"}>
        <Component {...pageProps} />
              {/* {children} */}
              <Footer />
      </div>

            <Toaster position="top-right" />
          </div>
        </ThemeProvider>
    </SessionProvider>
    </body>
    </html>
  );
};

export default api.withTRPC(MyApp);
