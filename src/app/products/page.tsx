"use client";

import { useSearchParams } from "next/navigation";
import { useMemo } from "react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { ProductCard } from "@/components/product-card";
import { ProductsFilters } from "@/components/products-filters";
import { mockProducts } from "@/lib/mock-data";
import { useLocale, useTranslations } from "next-intl";

export default function ProductsPage() {
  const t = useTranslations("ProductsPage");
  const locale = useLocale();
  const isRTL = locale === "ar";

  const searchParams = useSearchParams();

  const selectedCategory = searchParams.get("category");
  const selectedSubcategory = searchParams.get("subcategory");

  const filteredProducts = useMemo(() => {
    let result = mockProducts;

    if (selectedCategory) {
      result = result.filter((p) => p.category === selectedCategory);
    }

    if (selectedSubcategory) {
      result = result.filter(
        (p) => p.subcategory === decodeURIComponent(selectedSubcategory),
      );
    }

    return result;
  }, [selectedCategory, selectedSubcategory]);

  return (
    <main className={isRTL ? "rtl" : "ltr"} dir={isRTL ? "rtl" : "ltr"}>
      <Header />

      <div className="container mx-auto px-4 py-12">
        <h1 className="text-primary mb-2 text-3xl font-bold text-balance md:text-4xl">
          {t("products")}
        </h1>
        <p className="text-muted-foreground mb-8">
          {t("showing")} {filteredProducts.length} {t("products_count")}
        </p>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
          {/* Filters Sidebar - Hidden on mobile */}
          <div className="hidden lg:block">
            <ProductsFilters />
          </div>

          {/* Products Grid */}
          <div className="lg:col-span-3">
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="bg-muted rounded-lg py-12 text-center">
                <p className="text-muted-foreground text-lg">
                  {t("no_results")}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
