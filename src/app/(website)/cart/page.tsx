"use client";

import Link from "next/link";
import { CartItemRow } from "@/components/cart-item-row";
import { Button } from "@/components/ui/button";
import { useCart } from "@/lib/store";
import { ShoppingBag, ArrowRight, Truck } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";

export default function CartPage() {
  const { items, getTotal } = useCart();

  const t = useTranslations("CartPage");
  const locale = useLocale();
  const isRTL = locale === "ar";
  const total = getTotal();
  const FREE_SHIPPING_THRESHOLD = 200;
  const remainingForFreeShipping = FREE_SHIPPING_THRESHOLD - total;
  const hasFreeShipping = total >= FREE_SHIPPING_THRESHOLD;

  return (
    <main className={isRTL ? "rtl" : "ltr"} dir={isRTL ? "rtl" : "ltr"}>
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-primary mb-8 text-3xl font-bold md:text-4xl">
          {t("cart")}
        </h1>

        {items.length === 0 ? (
          <div className="py-16 text-center">
            <ShoppingBag className="text-muted-foreground mx-auto mb-4 h-16 w-16" />
            <h2 className="text-foreground mb-2 text-2xl font-bold">
              {t("empty_cart")}
            </h2>
            <p className="text-muted-foreground mb-8">{t("empty_desc")}</p>
            <Link href="/products">
              <Button className="bg-accent hover:bg-accent/90 text-accent-foreground">
                {t("continue_shopping")}
              </Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            {/* Free Shipping Banner */}
            <div className="lg:col-span-3">
              <div
                className={`flex items-center gap-3 rounded-lg p-4 ${
                  hasFreeShipping
                    ? "border-2 border-green-500 bg-green-50 dark:bg-green-950/30"
                    : "border-2 border-amber-500 bg-amber-50 dark:bg-amber-950/30"
                }`}
              >
                <Truck
                  className={`h-5 w-5 shrink-0 ${
                    hasFreeShipping ? "text-green-600" : "text-amber-600"
                  }`}
                />
                <p
                  className={`text-sm font-medium ${
                    hasFreeShipping
                      ? "text-green-700 dark:text-green-400"
                      : "text-amber-700 dark:text-amber-400"
                  }`}
                >
                  {hasFreeShipping
                    ? t("free_shipping_unlocked")
                    : t("add_more_for_free_shipping", {
                        amount: remainingForFreeShipping.toFixed(2),
                      })}
                </p>
              </div>
            </div>

            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="bg-card border-border rounded-lg border p-6">
                <div className="space-y-4">
                  {items.map((item) => (
                    <CartItemRow key={item.id} item={item} />
                  ))}
                </div>
              </div>
            </div>

            {/* Cart Summary */}
            <div className="lg:col-span-1">
              <div className="bg-card border-border sticky top-24 h-fit rounded-lg border p-6">
                <h2 className="text-foreground mb-6 text-lg font-bold">
                  {t("order_summary")}
                </h2>

                <div className="border-border space-y-4 border-b pb-6">
                  <div className="text-muted-foreground flex justify-between">
                    <span>{t("subtotal")}</span>
                    <span>
                      {total.toFixed(2)} {t("price")}
                    </span>
                  </div>
                  <div className="text-muted-foreground flex justify-between text-sm">
                    <span>{t("shipping")}</span>
                    <span
                      className={
                        hasFreeShipping ? "font-semibold text-green-600" : ""
                      }
                    >
                      {hasFreeShipping ? t("free") : `8 ${t("price")}`}
                    </span>
                  </div>
                </div>

                <div className="mb-6 flex justify-between pt-6">
                  <span className="text-foreground font-bold">
                    {t("total")}
                  </span>
                  <span className="text-accent text-2xl font-bold">
                    {Number(total.toFixed(2)) >= 200 ? total.toFixed(2) : (Number(total.toFixed(2)) + 8).toFixed(2)} {t("price")}
                  </span>
                </div>

                <Link href="/checkout" className="block w-full">
                  <Button className="bg-accent hover:bg-accent/90 text-accent-foreground w-full">
                    {t("checkout")}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
