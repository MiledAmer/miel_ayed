"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { X } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import type { Category } from "@/sanity/types/categories";
import {
  getTranslatedCategoryName,
  getTranslatedSubcategoryName,
} from "@/sanity/sanity-utils";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useTransition } from "react";

export function ProductsFilters({ categories }: { categories: Category[] }) {
  const t = useTranslations("ProductsFilters");
  const locale = useLocale();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const isRTL = locale === "ar";

  const selectedCategory = searchParams.get("category");
  const selectedSubcategory = searchParams.get("subcategory");

  const handleRouter = (route: string) => {
    startTransition(() => {
      router.push(route);
    });
  };

  return (
    <aside
      className={`bg-card border-border sticky top-24 hidden h-fit rounded-lg border p-6 lg:block ${
        isRTL ? "rtl" : "ltr"
      }`}
      dir={isRTL ? "rtl" : "ltr"}
    >
      <h2 className="text-foreground mb-4 text-lg font-bold">{t("filter")}</h2>
      <div className="space-y-4" style={{ opacity: isPending ? 0.6 : 1, transition: 'opacity 0.2s' }}>
        {/* All Products */}
        <button
          onClick={() => handleRouter("/products")}
          className={`w-full rounded-md px-3 py-2 text-left transition-colors ${
            !selectedCategory
              ? "bg-accent text-accent-foreground"
              : "bg-muted text-foreground hover:bg-border"
          }`}
        >
          {t("all")}
        </button>

        {/* Categories */}
        <div>
          <h3 className="text-foreground mb-3 font-semibold">
            {t("categories")}
          </h3>
          <div className="space-y-2">
            <Accordion
              type="single"
              collapsible
              className="w-full"
              defaultValue="item-1"
            >
              {categories.map((category) => (
                <AccordionItem value={category._id} key={category._id}>
                  <AccordionTrigger
                    className={`w-full rounded-md px-3 py-2 text-left text-sm transition-colors ${
                      selectedCategory === category.slug.current
                        ? "bg-accent text-accent-foreground font-medium"
                        : "bg-muted text-foreground hover:bg-border"
                    }`}
                    onClick={() =>
                      handleRouter(
                        `/products?category=${category.slug.current}`,
                      )
                    }
                  >
                    {getTranslatedCategoryName(category, locale)}
                  </AccordionTrigger>
                  <AccordionContent>
                    {selectedCategory === category.slug.current &&
                      category.subcategories &&
                      category.subcategories.length > 0 && (
                        <div className="mt-2 ml-2 space-y-1">
                          {category.subcategories.map((sub) => (
                            <button
                              onClick={() =>
                                handleRouter(
                                  `/products?category=${category.slug.current}&subcategory=${sub.slug.current}`,
                                )
                              }
                              key={sub._id}
                              className={`w-full rounded-md px-3 py-1 text-left text-xs transition-colors ${
                                selectedSubcategory === sub.slug.current
                                  ? "bg-accent/80 text-accent-foreground font-medium"
                                  : "bg-muted/50 text-muted-foreground hover:bg-border"
                              }`}
                            >
                              {getTranslatedSubcategoryName(sub, locale)}
                            </button>
                          ))}
                        </div>
                      )}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>

        {/* Clear Filters Button */}
        {(selectedCategory ?? selectedSubcategory) && (
          <button
            onClick={() => handleRouter("/products")}
            className="bg-destructive/10 text-destructive hover:bg-destructive/20 mt-6 flex w-full items-center justify-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors"
          >
            <X className="h-4 w-4" />
            {t("clear")}
          </button>
        )}
      </div>
    </aside>
  );
}
