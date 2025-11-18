'use client'

import { useSearchParams, useRouter } from 'next/navigation'
import { useLanguage } from '@/hooks/use-language'
import { CATEGORIES } from '@/lib/types'
import { X, FilterIcon } from 'lucide-react'
import { Suspense, useState } from 'react'

const translations = {
  en: {
    filter: 'Filter',
    categories: 'Categories',
    all: 'All Products',
    clear: 'Clear Filters',
  },
  fr: {
    filter: 'Filtrer',
    categories: 'Catégories',
    all: 'Tous les Produits',
    clear: 'Effacer les filtres',
  },
  ar: {
    filter: 'تصفية',
    categories: 'الفئات',
    all: 'جميع المنتجات',
    clear: 'مسح المرشحات',
  },
}

export function ProductsFilters() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { language, mounted } = useLanguage()
  const [isOpen, setIsOpen] = useState(false)

  if (!mounted) return null

  const t = translations[language as keyof typeof translations] || translations.fr
  const isRTL = language === 'ar'

  const selectedCategory = searchParams.get('category')
  const selectedSubcategory = searchParams.get('subcategory')

  const handleCategoryClick = (slug: string) => {
    router.push(`/products?category=${slug}`)
  }

  const handleSubcategoryClick = (slug: string, subcategory: string) => {
    router.push(`/products?category=${slug}&subcategory=${encodeURIComponent(subcategory)}`)
  }

  const handleClearFilters = () => {
    router.push('/products')
  }

  const handleAllProducts = () => {
    router.push('/products')
    setIsOpen(false)
  }

  const filterContent = (
    <div className="space-y-4">
      {/* All Products */}
      <button
        onClick={handleAllProducts}
        className={`w-full text-left px-3 py-2 rounded-md transition-colors ${
          !selectedCategory
            ? 'bg-accent text-accent-foreground'
            : 'bg-muted text-foreground hover:bg-border'
        }`}
      >
        {t.all}
      </button>

      {/* Categories */}
      <div>
        <h3 className="font-semibold text-foreground mb-3">{t.categories}</h3>
        <div className="space-y-2">
          {CATEGORIES.map((category) => (
            <div key={category.slug}>
              <button
                onClick={() => {
                  handleCategoryClick(category.slug)
                  setIsOpen(false)
                }}
                className={`w-full text-left px-3 py-2 rounded-md transition-colors text-sm ${
                  selectedCategory === category.slug
                    ? 'bg-accent text-accent-foreground font-medium'
                    : 'bg-muted text-foreground hover:bg-border'
                }`}
              >
                {category.name}
              </button>

              {/* Subcategories */}
              {selectedCategory === category.slug && category.subcategories.length > 0 && (
                <div className="mt-2 ml-2 space-y-1">
                  {category.subcategories.map((sub) => (
                    <button
                      key={sub}
                      onClick={() => {
                        handleSubcategoryClick(category.slug, sub)
                        setIsOpen(false)
                      }}
                      className={`w-full text-left px-3 py-1 rounded-md transition-colors text-xs ${
                        selectedSubcategory === sub
                          ? 'bg-accent/80 text-accent-foreground font-medium'
                          : 'bg-muted/50 text-muted-foreground hover:bg-border'
                      }`}
                    >
                      {sub}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Clear Filters Button */}
      {(selectedCategory ?? selectedSubcategory) && (
        <button
          onClick={handleClearFilters}
          className="w-full flex items-center justify-center gap-2 px-3 py-2 bg-destructive/10 text-destructive rounded-md hover:bg-destructive/20 transition-colors text-sm font-medium mt-6"
        >
          <X className="w-4 h-4" />
          {t.clear}
        </button>
      )}
    </div>
  )

  return (
    <Suspense>
      {/* Mobile Filter Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="lg:hidden fixed bottom-6 right-6 bg-accent text-accent-foreground rounded-full p-3 shadow-lg z-40 flex items-center gap-2 px-4"
      >
        <FilterIcon className="w-5 h-5" />
        <span className="text-sm font-medium">{t.filter}</span>
      </button>

      {/* Mobile Filter Modal */}
      {isOpen && (
        <div className="lg:hidden fixed inset-0 bg-black/50 z-50" onClick={() => setIsOpen(false)}>
          <div
            className={`fixed bottom-0 left-0 right-0 bg-background rounded-t-lg p-6 max-h-[90vh] overflow-y-auto ${
              isRTL ? 'rtl' : 'ltr'
            }`}
            dir={isRTL ? 'rtl' : 'ltr'}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold text-foreground">{t.filter}</h2>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 hover:bg-muted rounded-md transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            {filterContent}
          </div>
        </div>
      )}

      {/* Desktop Filters Sidebar */}
      <aside
        className={`hidden lg:block bg-card border border-border rounded-lg p-6 h-fit sticky top-24 ${
          isRTL ? 'rtl' : 'ltr'
        }`}
        dir={isRTL ? 'rtl' : 'ltr'}
      >
        <h2 className="text-lg font-bold text-foreground mb-4">{t.filter}</h2>
        {filterContent}
      </aside>
    </Suspense>
  )
}
