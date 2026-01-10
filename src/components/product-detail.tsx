"use client";

import Image from "next/image";
import { useCart } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import type { Product, ProductVariant } from "@/sanity/types/products";
import { getTranslatedCategoryName, urlFor } from "@/sanity/sanity-utils";
import type { Category } from "@/sanity/types/categories";

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
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant>(
    product.selectedVariant || product.variants?.[0]
  );

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

  const handleAddToCart = () => {
    if (selectedVariant) {
      addItem(product, selectedVariant, quantity);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    }
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
              src={product.image?.asset ? urlFor(product.image)?.url() ?? "/organic-acacia-honey.jpg" : "/organic-acacia-honey.jpg"}
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
          </div>

          {/* Variants */}
          {product.variants && product.variants.length > 0 && (
            <div className="mb-6">
              <label className="text-sm font-medium text-muted-foreground mb-2 block">
                {t("weight")}
              </label>
              <div className="flex flex-wrap gap-3">
                {product.variants.map((variant) => (
                  <button
                    key={variant._key}
                    onClick={() => setSelectedVariant(variant)}
                    className={`rounded-md border px-4 py-2 text-sm font-medium transition-all ${
                      selectedVariant?._key === variant._key
                        ? "bg-primary text-primary-foreground border-primary ring-2 ring-primary/20"
                        : "bg-background text-foreground border-input hover:bg-accent hover:text-accent-foreground"
                    }`}
                  >
                    {variant.weight}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Price */}
          <div className="border-border mb-6 border-b pb-6">
            <div className="flex flex-col gap-2">
              <div className="text-accent text-4xl font-bold">
                {selectedVariant?.price ? selectedVariant.price.toFixed(2) : "0.00"}{" "}
                <span className="text-2xl">{t("price")}</span>
              </div>
              {selectedVariant && (
                <div className={`text-sm font-medium ${selectedVariant.availability ? 'text-green-600' : 'text-red-600'}`}>
                  {selectedVariant.availability ? t("inStock") : t("outOfStock")}
                </div>
              )}
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
              {getTranslatedCategoryName(product.category as Category, locale )}
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
            disabled={!selectedVariant?.availability}
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
