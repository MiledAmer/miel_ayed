"use client";

import Image from "next/image";
import { useCart } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { useState } from "react";
import type { Product } from "@/lib/types";
import { useLocale, useTranslations } from "next-intl";

interface ProductDetailProps {
  product: Product;
}


export function ProductDetail({ product }: ProductDetailProps) {
  const t = useTranslations("ProductCard");
  const locale = useLocale();
  const isRTL = locale === "ar";

  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [showSuccess, setShowSuccess] = useState(false);

  const getName = () => {
    if (locale === "en") return product.nameEn;
    if (locale === "ar") return product.nameAr;
    return product.nameFr;
  };

  const getDescription = () => {
    if (locale === "en") return product.descriptionEn;
    if (locale === "ar") return product.descriptionAr;
    return product.descriptionFr;
  };

  const getCategoryName = () => {
    if (locale === "en") return product.category;
    if (locale === "ar") return product.category;
    return product.category;
  };

  const handleAddToCart = () => {
    addItem(product, quantity);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const handleQuantityChange = (value: number) => {
    if (value >= 1) {
      setQuantity(value);
    }
  };

  return (
    <div className={`${isRTL ? "rtl" : "ltr"}`} dir={isRTL ? "rtl" : "ltr"}>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        {/* Product Image */}
        <div className="flex items-center justify-center">
          <div className="bg-muted relative aspect-square w-full overflow-hidden rounded-lg">
            <Image
              src={product.image || "/placeholder.svg"}
              alt={getName()}
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>

        {/* Product Info */}
        <div className="flex flex-col justify-start">
          <div className="mb-6">
            <h1 className="text-primary mb-2 text-3xl font-bold md:text-4xl">
              {getName()}
            </h1>
            {product.subcategory && (
              <p className="text-muted-foreground mb-2 text-sm">
                {product.subcategory}
              </p>
            )}
          </div>

          {/* Price */}
          <div className="border-border mb-6 border-b pb-6">
            <div className="text-accent text-4xl font-bold">
              {product.price.toFixed(2)}{" "}
              <span className="text-2xl">{t("price")}</span>
            </div>
          </div>

          {/* Description */}
          <div className="mb-6">
            <h2 className="text-foreground mb-3 text-lg font-semibold">
              {t("description")}
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              {getDescription()}
            </p>
          </div>

          {/* Category */}
          <div className="border-border mb-6 border-b pb-6">
            <p className="text-muted-foreground text-sm">
              <span className="text-foreground font-semibold">
                {t("category")}:
              </span>{" "}
              {getCategoryName()}
            </p>
          </div>

          {/* Quantity Selector */}
          <div className="mb-6 flex items-center gap-4">
            <span className="text-foreground font-semibold">{t("quantity")}:</span>
            <div className="border-border bg-card flex items-center rounded-lg border">
              <button
                onClick={() => handleQuantityChange(quantity - 1)}
                className="text-foreground hover:bg-muted px-4 py-2 transition-colors"
                aria-label="Decrease quantity"
              >
                −
              </button>
              <span className="text-foreground px-6 py-2 font-semibold">
                {quantity}
              </span>
              <button
                onClick={() => handleQuantityChange(quantity + 1)}
                className="text-foreground hover:bg-muted px-4 py-2 transition-colors"
                aria-label="Increase quantity"
              >
                +
              </button>
            </div>
          </div>

          {/* Add to Cart Button */}
          <Button
            onClick={handleAddToCart}
            size="lg"
            className="bg-accent hover:bg-accent/90 text-accent-foreground mb-4 w-full"
          >
            <ShoppingCart className="mr-2 h-5 w-5" />
            {t("add_to_cart")}
          </Button>

          {/* Success Message */}
          {showSuccess && (
            <div className="rounded-lg border border-green-200 bg-green-50 p-4 text-sm text-green-700">
              {t("added")}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
