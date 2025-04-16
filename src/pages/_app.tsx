import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { type AppType } from "next/app";
import { Inter } from "next/font/google";

import { api } from "~/utils/api";

import "~/styles/globals.css";
import { GridPattern } from "~/components/magicui/grid-pattern";
import { ThemeProvider } from "~/components/theme-provider";
import { cn } from "~/lib/utils";
import Footer from "~/sections/footer";
import { Toaster } from "~/components/ui/sonner";
import { type ComponentType, type ReactElement } from "react";
const inter = Inter({ subsets: ["latin"] });
type PageWithLayout<P = object> = ComponentType<P> & {
  getLayout?: (page: ReactElement) => ReactElement;
};

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  const getLayout =
    (Component as PageWithLayout).getLayout ??
    ((page: React.ReactNode) => page);

  return (
    <SessionProvider session={session}>
      <ThemeProvider
        attribute="class"
        defaultTheme="light"
        enableSystem
        disableTransitionOnChange
      >
        <div
          className={`${inter.className} bg-background relative min-h-screen w-full`}
        >
          <div className="fixed inset-0 z-0 overflow-hidden">
            <GridPattern
              width={20}
              height={20}
              x={-1}
              y={-1}
              className={cn(
                "[mask-image:linear-gradient(to_bottom_left,white,transparent,transparent)]",
              )}
            />
          </div>

          <div className="relative z-10">
            {getLayout(<Component {...pageProps} />)}
            <Footer />
          </div>

          <Toaster position="top-right" />
        </div>
      </ThemeProvider>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
