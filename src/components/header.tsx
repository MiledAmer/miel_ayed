"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ShoppingCart, ChevronDown } from "lucide-react";
import { useLanguage } from "@/hooks/use-language";
import { useCart } from "@/lib/store";
import { LanguageToggle } from "./language-toggle";
import { MobileNav } from "./mobile-nav";
import { Button } from "@/components/ui/button";
import { CATEGORIES } from "@/lib/types";
import { useState } from "react";
import Image from "next/image";
import { ThemeToggle } from "./theme-toggle";
import { LanguageSelector } from "./language-selector";

const translations = {
  en: {
    products: "Products",
    about: "About",
    contact: "Contact",
  },
  fr: {
    products: "Produits",
    about: "À propos",
    contact: "Contact",
  },
  ar: {
    products: "المنتجات",
    about: "معلومات",
    contact: "تواصل",
  },
};

export function Header() {
  const router = useRouter();
  const { language, mounted } = useLanguage();
  const { items } = useCart();
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const t =
    translations[language as keyof typeof translations] || translations.fr;
  const isRTL = language === "ar";

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

  if (!mounted) return null;

  return (
    <header
      className={`border-border bg-background/60 backdrop-blur-sm sticky top-0 z-50 border-b shadow-sm ${isRTL ? "rtl" : "ltr"}`}
      dir={isRTL ? "rtl" : "ltr"}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between gap-6">
          {/* Logo */}
          <Link href="/">
            {/* <div className="text-2xl font-bold text-primary">Miel Ayed</div> */}
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
                {t.products}
                <ChevronDown className="h-4 w-4" />
              </button>

              {/* Dropdown Menu */}
              <div className="border-border invisible absolute top-full left-0 mt-0 w-56 rounded-lg border bg-white py-2 opacity-0 shadow-lg transition-all duration-200 group-hover:visible group-hover:opacity-100">
                {CATEGORIES.map((category) => (
                  <div key={category.slug}>
                    <button
                      onClick={() => handleCategoryClick(category.slug)}
                      className="text-foreground hover:bg-muted hover:text-accent w-full px-4 py-2 text-left text-sm font-medium transition-colors"
                    >
                      {category.name}
                    </button>
                    {category.subcategories.length > 0 && (
                      <div className="bg-muted/30 pl-4">
                        {category.subcategories.map((sub) => (
                          <button
                            key={sub}
                            onClick={() =>
                              handleSubcategoryClick(category.slug, sub)
                            }
                            className="text-muted-foreground hover:text-accent w-full px-4 py-1 text-left text-xs transition-colors"
                          >
                            {sub}
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
              {t.about}
            </Link>
            <Link
              href="/contact"
              className="text-foreground hover:text-accent font-medium transition-colors"
            >
              {t.contact}
            </Link>
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-3">
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
            <MobileNav />
          </div>
        </div>
      </div>
    </header>
  );
}
