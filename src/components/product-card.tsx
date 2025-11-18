'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useLanguage } from '@/hooks/use-language'
import { useCart } from '@/lib/store'
import { Button } from '@/components/ui/button'
import type { Product } from '@/lib/types'

interface ProductCardProps {
  product: Product
}

const translations = {
  en: { add_to_cart: 'Add to Cart', price: 'TND' },
  fr: { add_to_cart: 'Ajouter au panier', price: 'TND' },
  ar: { add_to_cart: 'أضف إلى السلة', price: 'دينار' },
}

export function ProductCard({ product }: ProductCardProps) {
  const { language, mounted } = useLanguage()
  const { addItem } = useCart()

  if (!mounted) return null

  const t = translations[language as keyof typeof translations] || translations.fr
  const isRTL = language === 'ar'

  const getName = () => {
    if (language === 'en') return product.nameEn
    if (language === 'ar') return product.nameAr
    return product.nameFr
  }

  const getDescription = () => {
    if (language === 'en') return product.descriptionEn
    if (language === 'ar') return product.descriptionAr
    return product.descriptionFr
  }

  return (
    <div
      className={`bg-card rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-border ${
        isRTL ? 'rtl' : 'ltr'
      }`}
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      {/* Product Image */}
      <Link href={`/product/${product.id}`}>
        <div className="relative h-48 bg-muted overflow-hidden">
          <Image
            src={product.image || "/placeholder.svg"}
            alt={getName()}
            fill
            className="object-cover hover:scale-105 transition-transform duration-300"
          />
        </div>
      </Link>

      {/* Product Info */}
      <div className="p-4">
        <Link href={`/product/${product.id}`}>
          <h3 className="font-bold text-foreground hover:text-accent transition-colors line-clamp-2">
            {getName()}
          </h3>
        </Link>

        <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
          {getDescription()}
        </p>

        {/* Price and Button */}
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
          <div className="text-lg font-bold text-accent">
            {product.price.toFixed(2)} {t.price}
          </div>
          <Button
            size="sm"
            onClick={() => addItem(product, 1)}
            className="bg-accent hover:bg-accent/90 text-accent-foreground"
          >
            {t.add_to_cart}
          </Button>
        </div>
      </div>
    </div>
  )
}
