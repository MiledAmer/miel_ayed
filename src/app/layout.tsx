import type { Metadata } from "next";
// import { Analytics } from '@vercel/analytics/next'
import "./globals.css";
import { ThemeProvider } from "next-themes";
import localFont from "next/font/local";

const myFont = localFont({
  src: "./29LT-Azer-Bold.otf",
  weight: "700",
});

export const metadata: Metadata = {
  title: "Miel Ayed - عسل عياد",
  description: "Honey products from Tunisia - منتجات العسل التونسية",
  generator: "v0.app",
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
};

export const viewport = {
  themeColor: "#372d2b",
  colorScheme: "light",
  userScalable: true,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={myFont.className}>
      <body className={`font-sans antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange={false}
        >
          {children}
          {/* <Analytics /> */}
        </ThemeProvider>
      </body>
    </html>
  );
}
