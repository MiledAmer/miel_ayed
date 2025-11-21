"use client";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ChevronDown, Menu, ShoppingCart } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Image from "next/image";
import { LanguageSelector } from "./language-selector";
import { ThemeToggle } from "./theme-toggle";
import { useLocale, useTranslations } from "next-intl";
import type { Category } from "@/sanity/types/categories";
import {
  getTranslatedCategoryName,
  getTranslatedSubcategoryName,
} from "@/sanity/sanity-utils";

export function MobileNav({ categories }: { categories: Category[] }) {
  const router = useRouter();
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

  const t = useTranslations("HomePage.Header");
  const locale = useLocale();
  // const isRTL = locale === "ar";

  const handleCategoryClick = (categorySlug: string) => {

    setExpandedCategory(null);
    router.push(`/products?category=${categorySlug}`);
  };

  const handleSubcategoryClick = (
    categorySlug: string,
    subcategory: string,
  ) => {

    setExpandedCategory(null);
    router.push(
      `/products?category=${categorySlug}&subcategory=${encodeURIComponent(subcategory)}`,
    );
  };
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="flex sm:hidden">
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent className="overflow-y-auto">
        {/* Sidebar Panel */}
        <SheetHeader>
          <Link href="/">
            <Image
              src="/logo.png"
              alt="Miel Ayed Logo"
              width={250}
              height={150}
              priority
            />
          </Link>
        </SheetHeader>
        <div>
          <div className="flex flex-row-reverse items-center gap-3 p-3">
            <LanguageSelector />
            <ThemeToggle />
            <Link href="/cart">
              <Button variant="outline" size="icon" className="relative">
                <ShoppingCart className="h-5 w-5" />
                {/* {cartCount > 0 && (
                  <span className="bg-accent text-accent-foreground absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full text-xs font-bold">
                    {cartCount}
                  </span>
                )} */}
              </Button>
            </Link>
          </div>
          <nav className="divide-border flex flex-col divide-y">
            {/* Products Category with Subcategories */}
            <div>
              <button
                onClick={() =>
                  setExpandedCategory(
                    expandedCategory === "products" ? null : "products",
                  )
                }
                className="hover:bg-muted text-foreground flex w-full items-center justify-between px-6 py-4 font-medium transition-colors"
              >
                {t("products")}
                <ChevronDown
                  className={`h-4 w-4 transition-transform ${
                    expandedCategory === "products" ? "rotate-180" : ""
                  }`}
                />
              </button>

              {expandedCategory === "products" && (
                <div className="bg-muted/30">
                  {categories.map((category) => (
                    <div key={category.slug.current}>
                      <button
                        onClick={() =>
                          handleCategoryClick(category.slug.current)
                        }
                        className="text-foreground hover:text-accent hover:bg-muted/50 w-full px-8 py-3 text-left text-sm font-medium transition-colors"
                      >
                        {getTranslatedCategoryName(category, locale)}
                      </button>
                      {category.subcategories &&
                        category.subcategories.length > 0 && (
                          <div className="pl-6">
                            {category.subcategories.map((sub) => (
                              <button
                                key={sub._id}
                                onClick={() =>
                                  handleSubcategoryClick(
                                    category.slug.current,
                                    sub.slug.current,
                                  )
                                }
                                className="text-muted-foreground hover:text-accent w-full px-8 py-2 text-left text-xs transition-colors"
                              >
                                {getTranslatedSubcategoryName(sub, locale)}
                              </button>
                            ))}
                          </div>
                        )}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* About Link */}
            <Link
              href="/about"
              className="text-foreground hover:text-accent block px-6 py-4 font-medium transition-colors"
            >
              {t("about")}
            </Link>

            {/* Contact Link */}
            <Link
              href="/contact"
              className="text-foreground hover:text-accent block px-6 py-4 font-medium transition-colors"
            >
              {t("contact")}
            </Link>
          </nav>
        </div>
      </SheetContent>
    </Sheet>
  );
}
