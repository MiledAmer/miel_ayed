"use client";

import type { Product } from "@/sanity/types/products";
import { ProductCard } from "./product-card";
import { useLocale, useTranslations } from "next-intl";

export function HighlightedProducts({ products }: { products: Product[] }) {
  const t = useTranslations("HomePage.HighlightedProducts");
  const locale = useLocale();
  const isRTL = locale === "ar";

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
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
