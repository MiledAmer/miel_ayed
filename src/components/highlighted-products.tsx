'use client'

import { useLanguage } from '@/hooks/use-language'
import { ProductCard } from './product-card'
import { mockProducts } from '@/lib/mock-data'

const translations = {
  en: {
    featured: 'Featured Products',
    subtitle: 'Hand-picked selection of our finest honey and bee products',
  },
  fr: {
    featured: 'Produits Vedettes',
    subtitle: 'Sélection soigneusement choisie de nos meilleurs miels et produits apicoles',
  },
  ar: {
    featured: 'المنتجات المميزة',
    subtitle: 'مجموعة مختارة بعناية من أفضل العسل ومنتجات النحل لدينا',
  },
}

export function HighlightedProducts() {
  const { language, mounted } = useLanguage()

  if (!mounted) return null

  const t = translations[language as keyof typeof translations] || translations.fr
  const isRTL = language === 'ar'

  // Show first 6 products as highlighted
  const featured = mockProducts.slice(0, 6)

  return (
    <section
      id="highlighted-products"
      className={`py-16 px-4 ${isRTL ? 'rtl' : 'ltr'}`}
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4 text-balance">
            {t.featured}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            {t.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featured.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  )
}
