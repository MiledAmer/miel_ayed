"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { useLocale, useTranslations } from "next-intl";
import type { Product } from "@/sanity/types/products";
import { urlFor } from "@/sanity/sanity-utils";
import { toast } from "sonner";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const t = useTranslations("ProductCard");
  const locale = useLocale();
  const isRTL = locale === "ar";

  const { addItem } = useCart();

  const getName = () => {
    if (locale === "en") return product.title.en;
    if (locale === "ar") return product.title.ar;
    return product.title.fr;
  };

  const getDescription = () => {
    if (locale === "en") return product.description.en;
    if (locale === "ar") return product.description.ar;
    return product.description.fr;
  };

  return (
    <div
      className={`bg-card border-border overflow-hidden rounded-lg border shadow-sm transition-shadow hover:shadow-md ${
        isRTL ? "rtl" : "ltr"
      }`}
      dir={isRTL ? "rtl" : "ltr"}
    >
      {/* Product Image */}
      <Link href={`/product/${product._id}`}>
        <div className="bg-muted relative h-48 overflow-hidden">
          <Image
            src={
              product.image?.asset
                ? (urlFor(product.image)?.url() ?? "/organic-acacia-honey.jpg")
                : "/organic-acacia-honey.jpg"
            }
            alt={getName()}
            fill
            className="object-cover transition-transform duration-300 hover:scale-105"
            loading="lazy"
          />
        </div>
      </Link>

      {/* Product Info */}
      <div className="p-4">
        <Link href={`/product/${product._id}`}>
          <h3 className="text-foreground hover:text-accent line-clamp-2 font-bold transition-colors">
            {getName()}
          </h3>
        </Link>

        <p className="text-muted-foreground mt-1 line-clamp-2 text-sm">
          {getDescription()}
        </p>

        {/* Price and Button */}
        <div className="border-border mt-4 flex items-center justify-between border-t pt-4">
          <div className="text-accent text-lg font-bold">
            {product.selectedVariant.price.toFixed(2)} {t("price")}
          </div>
          <Button
            size="sm"
            onClick={() => {
              addItem(product, product.selectedVariant, 1);
              toast.success(t("added"));
            }}
            className="bg-accent hover:bg-accent/90 text-accent-foreground"
          >
            {t("add_to_cart")}
          </Button>
        </div>
      </div>
    </div>
  );
}
