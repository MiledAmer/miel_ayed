"use client"

import { CheckoutForm } from "@/components/checkout-form"
import { useCart } from "@/lib/store"
import { useTranslations, useLocale } from "next-intl"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function CheckoutPage() {
  const t = useTranslations("Checkout")
  const { items, getTotal } = useCart()
  const router = useRouter()
  const locale = useLocale()
  const isRTL = locale === "ar"
  const total = getTotal()

  useEffect(() => {
    if (items.length === 0) {
      router.push("/cart")
    }
  }, [items, router])

  if (items.length === 0) {
    return null
  }

  return (
    <main className={isRTL ? "rtl" : "ltr"} dir={isRTL ? "rtl" : "ltr"}>
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-primary mb-8 text-3xl font-bold md:text-4xl">
          {t("title")}
        </h1>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* Checkout Form */}
          <div>
            <div className="bg-card border-border rounded-lg border p-6">
              <h2 className="text-foreground mb-6 text-xl font-bold">
                {t("shipping_details")}
              </h2>
              <CheckoutForm />
            </div>
          </div>

          {/* Order Summary */}
          <div>
            <div className="bg-card border-border sticky top-24 h-fit rounded-lg border p-6">
              <h2 className="text-foreground mb-6 text-xl font-bold">
                {t("order_summary")}
              </h2>

              <div className="space-y-4 border-b border-border pb-6">
                {items.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span className="text-muted-foreground">
                      {item.quantity}x {locale === 'en' ? item.product.title.en : locale === 'ar' ? item.product.title.ar : item.product.title.fr} ({item.variant.weight})
                    </span>
                    <span className="font-medium">
                      {(item.variant.price * item.quantity).toFixed(2)} {t("currency")}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-6 flex justify-between">
                <span className="text-foreground font-bold">{t("total")}</span>
                <span className="text-accent text-2xl font-bold">
                  {total.toFixed(2)} {t("currency")}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}