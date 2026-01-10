"use client";

import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { useCart } from "@/lib/store";
import { MobileNav } from "./mobile-nav";
import { Button } from "@/components/ui/button";
import { LanguageSelector } from "./language-selector";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import type { Category } from "@/sanity/types/categories";
import { HeaderNavigation } from "./header-navigation";
// import { ThemeToggle } from "./theme-toggle";

export function Header({ categories }: { categories: Category[] }) {
  const locale = useLocale();
  const t = useTranslations("HomePage.Header");
  const { items } = useCart();

  const isRTL = locale === "ar";

  const cartCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header
      className={`border-border bg-background/60 sticky top-0 z-50 border-b shadow-sm backdrop-blur-sm ${isRTL ? "rtl" : "ltr"}`}
      dir={isRTL ? "rtl" : "ltr"}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between gap-6">
          {/* Logo */}
          <Link href="/">
            <Image
              src="/logo.png"
              alt="Miel Ayed Logo"
              width={250}
              height={150}
              priority
            />
          </Link>

          {/* Navigation Menu */}
          <HeaderNavigation categories={categories} />

          {/* Right Actions */}
          <div className="hidden items-center gap-3 sm:flex">
            {/* <LanguageToggle /> */}
            <LanguageSelector />

            <Link href="/cart">
              <Button
                variant="outline"
                size="icon"
                className="relative"
                aria-label={t("cart")}
              >
                <ShoppingCart className="h-5 w-5" />
                {cartCount > 0 && (
                  <span className="bg-accent text-accent-foreground absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full text-xs font-bold">
                    {cartCount}
                  </span>
                )}
              </Button>
            </Link>
            {/* <ThemeToggle /> */}
          </div>
          <MobileNav categories={categories} />
        </div>
      </div>
    </header>
  );
}
