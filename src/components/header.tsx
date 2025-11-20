"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ShoppingCart, ChevronDown } from "lucide-react";
import { useCart } from "@/lib/store";
import { MobileNav } from "./mobile-nav";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { ThemeToggle } from "./theme-toggle";
import { LanguageSelector } from "./language-selector";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import type { Category } from "@/sanity/types/categories";
import { getTranslatedCategoryName, getTranslatedSubcategoryName } from "@/sanity/sanity-utils";

export function Header({categories}: {categories : Category[]}) {
  const locale = useLocale();
  const t = useTranslations("HomePage.Header");

  const router = useRouter();
  const { items } = useCart();
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const isRTL = locale === "ar";

  const cartCount = items.reduce((sum, item) => sum + item.quantity, 0);

  const handleCategoryClick = (categorySlug: string) => {
    setOpenDropdown(null);
    router.push(`/products?category=${categorySlug}`);
  };

  const handleSubcategoryClick = (
    categorySlug: string,
    subcategory: string,
  ) => {
    setOpenDropdown(null);
    router.push(
      `/products?category=${categorySlug}&subcategory=${encodeURIComponent(subcategory)}`,
    );
  };

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
          <nav className="hidden flex-1 items-center gap-6 md:flex">
            {/* Category Dropdown */}
            <div className="group relative">
              <button
                className="text-foreground hover:text-accent flex items-center gap-1 font-medium transition-colors"
                aria-haspopup="true"
                aria-expanded={openDropdown === "categories"}
                onClick={() =>
                  setOpenDropdown(
                    openDropdown === "categories" ? null : "categories",
                  )
                }
              >
                {t("products")}
                <ChevronDown className="h-4 w-4" />
              </button>

              {/* Dropdown Menu */}
              <div className="border-border invisible absolute top-full left-0 mt-0 w-56 rounded-lg border bg-white py-2 opacity-0 shadow-lg transition-all duration-200 group-hover:visible group-hover:opacity-100">
                {categories.map((category) => (
                  <div key={category._id}>
                    <button
                      onClick={() => handleCategoryClick(category.slug.current)}
                      className="text-foreground hover:bg-muted hover:text-accent w-full px-4 py-2 text-left text-sm font-medium transition-colors"
                    >
                      {getTranslatedCategoryName(category, locale)}
                    </button>
                    {category.subcategories && category.subcategories.length > 0 && (
                      <div className="bg-muted/30 pl-4">
                        {category.subcategories.map((sub) => (
                          <button
                            key={sub._id}
                            onClick={() =>
                              handleSubcategoryClick(category.slug.current, sub.slug.current)
                            }
                            className="text-muted-foreground hover:text-accent w-full px-4 py-1 text-left text-xs transition-colors"
                          >
                            {getTranslatedSubcategoryName(sub, locale)}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <Link
              href="/about"
              className="text-foreground hover:text-accent font-medium transition-colors"
            >
              {t("about")}
            </Link>
            <Link
              href="/contact"
              className="text-foreground hover:text-accent font-medium transition-colors"
            >
              {t("contact")}
            </Link>
          </nav>

          {/* Right Actions */}
          <div className="hidden items-center gap-3 sm:flex">
            {/* <LanguageToggle /> */}
            <LanguageSelector />

            <Link href="/cart">
              <Button variant="outline" size="icon" className="relative">
                <ShoppingCart className="h-5 w-5" />
                {cartCount > 0 && (
                  <span className="bg-accent text-accent-foreground absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full text-xs font-bold">
                    {cartCount}
                  </span>
                )}
              </Button>
            </Link>
            <ThemeToggle />
          </div>
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
