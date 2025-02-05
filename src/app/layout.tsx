import type { ReactNode } from "react";
import "./globals.css";
import { IRANYekan } from "@/fonts/local-fonts";
import { ThemeProvider } from "next-themes";
import Header from "@/components/theme/header";
import { Toaster } from "sonner";

import { metadata } from "./metadata";
export { metadata };
export { viewport } from "./viewport";

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: Readonly<RootLayoutProps>) {
  return (
    <html lang="fa-IR" dir="rtl" suppressHydrationWarning>
      <body
        className={`${IRANYekan.className} antialiased min-h-dvh`}
        suppressHydrationWarning
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
          themes={["light", "dark", "system"]}
        >
          <Toaster
            toastOptions={{
              classNames: {
                toast: IRANYekan.className,
                title: IRANYekan.className,
                description: IRANYekan.className,
              },
            }}
          />
          <Header />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
