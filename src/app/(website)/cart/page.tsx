"use client";

import Link from "next/link";
import { CartItemRow } from "@/components/cart-item-row";
import { Button } from "@/components/ui/button";
import { useCart } from "@/lib/store";
import { ShoppingBag, ArrowRight } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";

export default function CartPage() {
  const { items, getTotal } = useCart();

  const t = useTranslations("CartPage");
  const locale = useLocale();
  const isRTL = locale === "ar";
  const total = getTotal();

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
                    <span>{t("free")}</span>
                  </div>
                </div>

                <div className="mb-6 flex justify-between pt-6">
                  <span className="text-foreground font-bold">
                    {t("total")}
                  </span>
                  <span className="text-accent text-2xl font-bold">
                    {total.toFixed(2)} {t("price")}
                  </span>
                </div>

                <Link href="/checkout" className="w-full block">
                  <Button
                    className="bg-accent hover:bg-accent/90 text-accent-foreground w-full"
                  >
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
