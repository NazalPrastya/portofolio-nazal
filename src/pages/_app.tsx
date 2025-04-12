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
import Head from "next/head";

const inter = Inter({ subsets: ["latin"] });


const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <html lang="en" suppressHydrationWarning>
       <Head>
        <title>Nazal Prastya - Web Developer</title>
        <meta name="description" content="Portofolio resmi Nazal Gusti Prastya, seorang Web Developer dan UI Designer yang berfokus pada pembuatan aplikasi web modern dan desain antarmuka yang elegan." />
        <meta name="keywords" content="Nazal Prastya, Nazal Gusti Prastya, Portofolio, Web Developer, UI Designer, Frontend Developer, React Developer, Desain UI, Developer Indonesia" />
        <meta name="author" content="Nazal Gusti Prastya" />
        <meta name="creator" content="Nazal Gusti Prastya" />
        <meta property="og:title" content="Nazal Prastya - Web Developer" />
        <meta property="og:description" content="Lihat karya dan proyek dari Nazal Gusti Prastya, seorang Web Developer" />
        <meta property="og:url" content="https://nazalprastya.vercel.app" />
        <meta property="og:site_name" content="Nazal Prastya Portofolio" />
        <meta property="og:locale" content="id_ID" />
        <meta property="og:type" content="website" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/favicon.png" />
        <link rel="shortcut icon" href="/favicon.png" />
      </Head>
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
