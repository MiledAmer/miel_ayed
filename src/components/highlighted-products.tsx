"use client";

import { ProductCard } from "./product-card";
import { mockProducts } from "@/lib/mock-data";
import { useLocale, useTranslations } from "next-intl";

export function HighlightedProducts() {
  const t = useTranslations("HomePage.HighlightedProducts");
  const locale  = useLocale();
  const isRTL = locale === "ar";

  // Show first 6 products as highlighted
  const featured = mockProducts.slice(0, 6);

  return (
    <section
      id="highlighted-products"
      className={`px-4 py-16 ${isRTL ? "rtl" : "ltr"}`}
      dir={isRTL ? "rtl" : "ltr"}
    >
      <div className="container mx-auto">
        <div className="mb-12 text-center">
          <h2 className="text-primary mb-4 text-3xl font-bold text-balance md:text-4xl">
            {t("featured")}
          </h2>
          <p className="text-muted-foreground mx-auto max-w-2xl text-lg text-pretty">
            {t("subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {featured.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
