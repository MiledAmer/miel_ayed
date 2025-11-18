'use client'

import Image from 'next/image'
import { useLanguage } from '@/hooks/use-language'
import { useCart } from '@/lib/store'
import { Button } from '@/components/ui/button'
import { ShoppingCart } from 'lucide-react'
import { useState } from 'react'
import type { Product } from '@/lib/types'

interface ProductDetailProps {
  product: Product
}

const translations = {
  en: {
    add_to_cart: 'Add to Cart',
    price: 'TND',
    description: 'Description',
    category: 'Category',
    quantity: 'Quantity',
    added: 'Added to cart!',
  },
  fr: {
    add_to_cart: 'Ajouter au panier',
    price: 'TND',
    description: 'Description',
    category: 'Catégorie',
    quantity: 'Quantité',
    added: 'Ajouté au panier!',
  },
  ar: {
    add_to_cart: 'أضف إلى السلة',
    price: 'دينار',
    description: 'الوصف',
    category: 'الفئة',
    quantity: 'الكمية',
    added: 'تمت الإضافة إلى السلة!',
  },
}

export function ProductDetail({ product }: ProductDetailProps) {
  const { language, mounted } = useLanguage()
  const { addItem } = useCart()
  const [quantity, setQuantity] = useState(1)
  const [showSuccess, setShowSuccess] = useState(false)

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

  const getCategoryName = () => {
    if (language === 'en') return product.category
    if (language === 'ar') return product.category
    return product.category
  }

  const handleAddToCart = () => {
    addItem(product, quantity)
    setShowSuccess(true)
    setTimeout(() => setShowSuccess(false), 3000)
  }

  const handleQuantityChange = (value: number) => {
    if (value >= 1) {
      setQuantity(value)
    }
  }

  return (
    <div
      className={`${isRTL ? 'rtl' : 'ltr'}`}
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Product Image */}
        <div className="flex items-center justify-center">
          <div className="relative w-full aspect-square bg-muted rounded-lg overflow-hidden">
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
            <h1 className="text-3xl md:text-4xl font-bold text-primary mb-2">
              {getName()}
            </h1>
            {product.subcategory && (
              <p className="text-sm text-muted-foreground mb-2">
                {product.subcategory}
              </p>
            )}
          </div>

          {/* Price */}
          <div className="mb-6 pb-6 border-b border-border">
            <div className="text-4xl font-bold text-accent">
              {product.price.toFixed(2)} <span className="text-2xl">{t.price}</span>
            </div>
          </div>

          {/* Description */}
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-foreground mb-3">
              {t.description}
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              {getDescription()}
            </p>
          </div>

          {/* Category */}
          <div className="mb-6 pb-6 border-b border-border">
            <p className="text-sm text-muted-foreground">
              <span className="font-semibold text-foreground">{t.category}:</span> {getCategoryName()}
            </p>
          </div>

          {/* Quantity Selector */}
          <div className="mb-6 flex items-center gap-4">
            <span className="font-semibold text-foreground">{t.quantity}:</span>
            <div className="flex items-center border border-border rounded-lg bg-card">
              <button
                onClick={() => handleQuantityChange(quantity - 1)}
                className="px-4 py-2 text-foreground hover:bg-muted transition-colors"
                aria-label="Decrease quantity"
              >
                −
              </button>
              <span className="px-6 py-2 font-semibold text-foreground">
                {quantity}
              </span>
              <button
                onClick={() => handleQuantityChange(quantity + 1)}
                className="px-4 py-2 text-foreground hover:bg-muted transition-colors"
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
            className="w-full bg-accent hover:bg-accent/90 text-accent-foreground mb-4"
          >
            <ShoppingCart className="w-5 h-5 mr-2" />
            {t.add_to_cart}
          </Button>

          {/* Success Message */}
          {showSuccess && (
            <div className="p-4 bg-green-50 border border-green-200 rounded-lg text-green-700 text-sm">
              {t.added}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
