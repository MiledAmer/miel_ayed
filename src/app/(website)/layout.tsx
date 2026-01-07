// import { Analytics } from '@vercel/analytics/next'
import "../globals.css";
import { ThemeProvider } from "next-themes";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { getCategoriesWithSubcategories } from "@/sanity/sanity-utils";
import { NextIntlClientProvider } from "next-intl";
import { Toaster } from "@/components/ui/sonner";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const categories = await getCategoriesWithSubcategories();
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange={false}
    >
      <NextIntlClientProvider>
        <Header categories={categories} />
        {children}
        <Footer />
        <Toaster
          position="top-right"
          style={
            {
              "--normal-bg": "var(--accent)",
              "--normal-text": "var(--accent-foreground)",
              "--normal-border": "var(--accent)",
            } as React.CSSProperties
          }
        />
      </NextIntlClientProvider>

      {/* <Analytics /> */}
    </ThemeProvider>
  );
}
