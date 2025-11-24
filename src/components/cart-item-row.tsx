'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useCart } from '@/lib/store'
import { Button } from '@/components/ui/button'
import { Trash2 } from 'lucide-react'
import type { CartItem } from '@/lib/store'
import { useLocale, useTranslations } from 'next-intl'
import { urlFor } from '@/sanity/sanity-utils'

interface CartItemRowProps {
  item: CartItem
}

export function CartItemRow({ item }: CartItemRowProps) {
  
  const t = useTranslations('CartPage')
  const locale = useLocale()
  const isRTL = locale === 'ar'
  

  const { updateQuantity, removeItem } = useCart()
  const getName = () => {
    if (locale === 'en') return item.product.title.en
    if (locale === 'ar') return item.product.title.ar
    return item.product.title.fr
  }

  const subtotal = item.variant.price * item.quantity

  return (
    <div
      className={`flex gap-4 pb-4 border-b border-border last:border-b-0 ${
        isRTL ? 'rtl' : 'ltr'
      }`}
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      {/* Product Image */}
      <Link href={`/product/${item.product._id}`}>
        <div className="relative w-24 h-24 bg-muted rounded-lg overflow-hidden">
          <Image
            src={item.product.image?.asset ? urlFor(item.product.image)?.url() ?? "/organic-acacia-honey.jpg" : "/organic-acacia-honey.jpg"}
            alt={getName()}
            fill
            className="object-cover hover:scale-105 transition-transform"
          />
        </div>
      </Link>

      {/* Product Info */}
      <div className="flex-1 flex flex-col justify-between">
        <div>
          <Link href={`/product/${item.product._id}`}>
            <h3 className="font-semibold text-foreground hover:text-accent transition-colors">
              {getName()}
            </h3>
          </Link>
          <p className="text-sm text-muted-foreground">
            {item.variant.weight} - {item.variant.price.toFixed(2)} {t('price')}
          </p>
        </div>

        {/* Quantity Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => updateQuantity(item.id, item.quantity - 1)}
            className="px-2 py-1 text-sm font-medium text-foreground bg-muted hover:bg-border rounded transition-colors"
            aria-label="Decrease quantity"
          >
            −
          </button>
          <span className="px-3 py-1 text-sm font-semibold text-foreground">
            {item.quantity}
          </span>
          <button
            onClick={() => updateQuantity(item.id, item.quantity + 1)}
            className="px-2 py-1 text-sm font-medium text-foreground bg-muted hover:bg-border rounded transition-colors"
            aria-label="Increase quantity"
          >
            +
          </button>
        </div>
      </div>

      {/* Subtotal & Remove */}
      <div className="flex flex-col items-end justify-between">
        <div className="text-right">
          <p className="text-xs text-muted-foreground mb-1">{t('subtotal')}</p>
          <p className="text-lg font-bold text-accent">
            {subtotal.toFixed(2)} {t('price')}
          </p>
        </div>

        <Button
          variant="ghost"
          size="sm"
          onClick={() => removeItem(item.id)}
          className="text-destructive hover:bg-destructive/10 hover:text-destructive"
        >
          <Trash2 className="w-4 h-4" />
        </Button>
      </div>
    </div>
  )
}
