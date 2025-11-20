'use client'

import Link from 'next/link'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { CartItemRow } from '@/components/cart-item-row'
import { Button } from '@/components/ui/button'
import { useCart } from '@/lib/store'
import { ShoppingBag, ArrowRight } from 'lucide-react'
import { useLocale, useTranslations } from 'next-intl'

export default function CartPage() {
  const { items, getTotal } = useCart()
    

  const t = useTranslations('CartPage')
  const locale = useLocale()
  const isRTL = locale === 'ar'
  const total = getTotal()

  return (
    <main className={isRTL ? 'rtl' : 'ltr'} dir={isRTL ? 'rtl' : 'ltr'}>
      <Header />

      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl md:text-4xl font-bold text-primary mb-8">{t("cart")}</h1>

        {items.length === 0 ? (
          <div className="text-center py-16">
            <ShoppingBag className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-foreground mb-2">{t("empty_cart")}</h2>
            <p className="text-muted-foreground mb-8">{t("empty_desc")}</p>
            <Link href="/products">
              <Button className="bg-accent hover:bg-accent/90 text-accent-foreground">
                {t("continue_shopping")}
              </Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="bg-card border border-border rounded-lg p-6">
                <div className="space-y-4">
                  {items.map((item) => (
                    <CartItemRow key={item.product.id} item={item} />
                  ))}
                </div>
              </div>
            </div>

            {/* Cart Summary */}
            <div className="lg:col-span-1">
              <div className="bg-card border border-border rounded-lg p-6 sticky top-24 h-fit">
                <h2 className="text-lg font-bold text-foreground mb-6">{t("order_summary")}</h2>

                <div className="space-y-4 pb-6 border-b border-border">
                  <div className="flex justify-between text-muted-foreground">
                    <span>{t("subtotal")}</span>
                    <span>{total.toFixed(2)} {t("price")}</span>
                  </div>
                  <div className="flex justify-between text-muted-foreground text-sm">
                    <span>{t("shipping")}</span>
                    <span>{t("free")}</span>
                  </div>
                </div>

                <div className="flex justify-between mb-6 pt-6">
                  <span className="font-bold text-foreground">{t("total")}</span>
                  <span className="text-2xl font-bold text-accent">
                    {total.toFixed(2)} {t("price")}
                  </span>
                </div>

                <Button
                  disabled
                  className="w-full bg-accent/50 text-accent-foreground cursor-not-allowed"
                >
                  {t("checkout")}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>

                <p className="text-xs text-muted-foreground text-center mt-4">
                  {t("checkout_integration_coming_soon")}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </main>
  )
}
