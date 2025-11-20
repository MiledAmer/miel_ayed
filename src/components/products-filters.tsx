"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { CATEGORIES } from "@/lib/types";
import { X, FilterIcon } from "lucide-react";
import { Suspense, useState } from "react";
import { useLocale, useTranslations } from "next-intl";

const translations = {
  en: {
    filter: "Filter",
    categories: "Categories",
    all: "All Products",
    clear: "Clear Filters",
  },
  fr: {
    filter: "Filtrer",
    categories: "Catégories",
    all: "Tous les Produits",
    clear: "Effacer les filtres",
  },
  ar: {
    filter: "تصفية",
    categories: "الفئات",
    all: "جميع المنتجات",
    clear: "مسح المرشحات",
  },
};

export function ProductsFilters() {
  const t = useTranslations("ProductsFilters");
  const locale = useLocale();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isOpen, setIsOpen] = useState(false);

  const isRTL = locale === "ar";

  const selectedCategory = searchParams.get("category");
  const selectedSubcategory = searchParams.get("subcategory");

  const handleCategoryClick = (slug: string) => {
    router.push(`/products?category=${slug}`);
  };

  const handleSubcategoryClick = (slug: string, subcategory: string) => {
    router.push(
      `/products?category=${slug}&subcategory=${encodeURIComponent(subcategory)}`,
    );
  };

  const handleClearFilters = () => {
    router.push("/products");
  };

  const handleAllProducts = () => {
    router.push("/products");
    setIsOpen(false);
  };

  const filterContent = (
    <div className="space-y-4">
      {/* All Products */}
      <button
        onClick={handleAllProducts}
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
        <h3 className="text-foreground mb-3 font-semibold">{t("categories")}</h3>
        <div className="space-y-2">
          {CATEGORIES.map((category) => (
            <div key={category.slug}>
              <button
                onClick={() => {
                  handleCategoryClick(category.slug);
                  setIsOpen(false);
                }}
                className={`w-full rounded-md px-3 py-2 text-left text-sm transition-colors ${
                  selectedCategory === category.slug
                    ? "bg-accent text-accent-foreground font-medium"
                    : "bg-muted text-foreground hover:bg-border"
                }`}
              >
                {category.name}
              </button>

              {/* Subcategories */}
              {selectedCategory === category.slug &&
                category.subcategories.length > 0 && (
                  <div className="mt-2 ml-2 space-y-1">
                    {category.subcategories.map((sub) => (
                      <button
                        key={sub}
                        onClick={() => {
                          handleSubcategoryClick(category.slug, sub);
                          setIsOpen(false);
                        }}
                        className={`w-full rounded-md px-3 py-1 text-left text-xs transition-colors ${
                          selectedSubcategory === sub
                            ? "bg-accent/80 text-accent-foreground font-medium"
                            : "bg-muted/50 text-muted-foreground hover:bg-border"
                        }`}
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

      {/* Clear Filters Button */}
      {(selectedCategory ?? selectedSubcategory) && (
        <button
          onClick={handleClearFilters}
          className="bg-destructive/10 text-destructive hover:bg-destructive/20 mt-6 flex w-full items-center justify-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors"
        >
          <X className="h-4 w-4" />
          {t("clear")}
        </button>
      )}
    </div>
  );

  return (
    <Suspense>
      {/* Mobile Filter Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="bg-accent text-accent-foreground fixed right-6 bottom-6 z-40 flex items-center gap-2 rounded-full p-3 px-4 shadow-lg lg:hidden"
      >
        <FilterIcon className="h-5 w-5" />
        <span className="text-sm font-medium">{t("filter")}</span>
      </button>

      {/* Mobile Filter Modal */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/50 lg:hidden"
          onClick={() => setIsOpen(false)}
        >
          <div
            className={`bg-background fixed right-0 bottom-0 left-0 max-h-[90vh] overflow-y-auto rounded-t-lg p-6 ${
              isRTL ? "rtl" : "ltr"
            }`}
            dir={isRTL ? "rtl" : "ltr"}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-foreground text-lg font-bold">{t("filter")}</h2>
              <button
                onClick={() => setIsOpen(false)}
                className="hover:bg-muted rounded-md p-1 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            {filterContent}
          </div>
        </div>
      )}

      {/* Desktop Filters Sidebar */}
      <aside
        className={`bg-card border-border sticky top-24 hidden h-fit rounded-lg border p-6 lg:block ${
          isRTL ? "rtl" : "ltr"
        }`}
        dir={isRTL ? "rtl" : "ltr"}
      >
        <h2 className="text-foreground mb-4 text-lg font-bold">{t("filter")}</h2>
        {filterContent}
      </aside>
    </Suspense>
  );
}
