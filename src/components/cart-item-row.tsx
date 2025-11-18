'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useLanguage } from '@/hooks/use-language'
import { useCart } from '@/lib/store'
import { Button } from '@/components/ui/button'
import { Trash2 } from 'lucide-react'
import type { CartItem } from '@/lib/types'

interface CartItemRowProps {
  item: CartItem
}

const translations = {
  en: { remove: 'Remove', price: 'TND', subtotal: 'Subtotal' },
  fr: { remove: 'Supprimer', price: 'TND', subtotal: 'Sous-total' },
  ar: { remove: 'إزالة', price: 'دينار', subtotal: 'الإجمالي الفرعي' },
}

export function CartItemRow({ item }: CartItemRowProps) {
  const { language, mounted } = useLanguage()
  const { updateQuantity, removeItem } = useCart()

  if (!mounted) return null

  const t = translations[language as keyof typeof translations] || translations.fr
  const isRTL = language === 'ar'

  const getName = () => {
    if (language === 'en') return item.product.nameEn
    if (language === 'ar') return item.product.nameAr
    return item.product.nameFr
  }

  const subtotal = item.product.price * item.quantity

  return (
    <div
      className={`flex gap-4 pb-4 border-b border-border last:border-b-0 ${
        isRTL ? 'rtl' : 'ltr'
      }`}
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      {/* Product Image */}
      <Link href={`/product/${item.product.id}`}>
        <div className="relative w-24 h-24 bg-muted rounded-lg overflow-hidden flex-shrink-0">
          <Image
            src={item.product.image || "/placeholder.svg"}
            alt={getName()}
            fill
            className="object-cover hover:scale-105 transition-transform"
          />
        </div>
      </Link>

      {/* Product Info */}
      <div className="flex-1 flex flex-col justify-between">
        <div>
          <Link href={`/product/${item.product.id}`}>
            <h3 className="font-semibold text-foreground hover:text-accent transition-colors">
              {getName()}
            </h3>
          </Link>
          <p className="text-sm text-muted-foreground">
            {item.product.price.toFixed(2)} {t.price}
          </p>
        </div>

        {/* Quantity Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
            className="px-2 py-1 text-sm font-medium text-foreground bg-muted hover:bg-border rounded transition-colors"
            aria-label="Decrease quantity"
          >
            −
          </button>
          <span className="px-3 py-1 text-sm font-semibold text-foreground">
            {item.quantity}
          </span>
          <button
            onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
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
          <p className="text-xs text-muted-foreground mb-1">{t.subtotal}</p>
          <p className="text-lg font-bold text-accent">
            {subtotal.toFixed(2)} {t.price}
          </p>
        </div>

        <Button
          variant="ghost"
          size="sm"
          onClick={() => removeItem(item.product.id)}
          className="text-destructive hover:bg-destructive/10 hover:text-destructive"
        >
          <Trash2 className="w-4 h-4" />
        </Button>
      </div>
    </div>
  )
}
