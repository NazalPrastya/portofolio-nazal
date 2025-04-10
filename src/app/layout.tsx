import type React from "react";
import "@/app/globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "sonner";
import { GridPattern } from "@/components/magicui/grid-pattern";
import { cn } from "@/lib/utils";
import CircularText from "@/components/CircularText/CircularText";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Portfolio | Creative Developer",
  description:
    "Personal portfolio showcasing my work, experience, and achievements",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
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
            <CircularText
              text="CONTACT CONTACT CONTACT "
              onHover="speedUp"
              spinDuration={20}
              className="fixed z-1 bottom-2 right-4"
            />
            {/* Main Content */}
            <div className="relative z-10">{children}</div>

            <Toaster position="top-right" />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
