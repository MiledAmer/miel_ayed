'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Menu, X, ChevronDown } from 'lucide-react'
import { useLanguage } from '@/hooks/use-language'
import { CATEGORIES } from '@/lib/types'

const translations = {
  en: {
    menu: 'Menu',
    products: 'Products',
    about: 'About',
    contact: 'Contact',
  },
  fr: {
    menu: 'Menu',
    products: 'Produits',
    about: 'À propos',
    contact: 'Contact',
  },
  ar: {
    menu: 'القائمة',
    products: 'المنتجات',
    about: 'معلومات',
    contact: 'تواصل',
  },
}

export function MobileNav() {
  const router = useRouter()
  const { language, mounted } = useLanguage()
  const [isOpen, setIsOpen] = useState(false)
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null)

  const t = translations[language as keyof typeof translations] || translations.fr
  const isRTL = language === 'ar'

  if (!mounted) return null

  const handleCategoryClick = (categorySlug: string) => {
    setIsOpen(false)
    setExpandedCategory(null)
    router.push(`/products?category=${categorySlug}`)
  }

  const handleSubcategoryClick = (categorySlug: string, subcategory: string) => {
    setIsOpen(false)
    setExpandedCategory(null)
    router.push(`/products?category=${categorySlug}&subcategory=${encodeURIComponent(subcategory)}`)
  }

  return (
    <div className={`${isRTL ? 'rtl' : 'ltr'}`} dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Menu Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden p-2 text-foreground hover:text-accent"
        aria-label={t.menu}
      >
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Sidebar */}
      {isOpen && (
        <>
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-black/50 z-40 top-20"
            onClick={() => setIsOpen(false)}
          />

          {/* Sidebar Panel */}
          <div className="fixed top-20 left-0 right-0 bottom-0 bg-white z-50 overflow-y-auto">
            <nav className="flex flex-col divide-y divide-border">
              {/* Products Category with Subcategories */}
              <div>
                <button
                  onClick={() =>
                    setExpandedCategory(expandedCategory === 'products' ? null : 'products')
                  }
                  className="w-full px-6 py-4 flex items-center justify-between hover:bg-muted transition-colors text-foreground font-medium"
                >
                  {t.products}
                  <ChevronDown
                    className={`w-4 h-4 transition-transform ${
                      expandedCategory === 'products' ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {expandedCategory === 'products' && (
                  <div className="bg-muted/30">
                    {CATEGORIES.map((category) => (
                      <div key={category.slug}>
                        <button
                          onClick={() => handleCategoryClick(category.slug)}
                          className="w-full px-8 py-3 text-left text-sm text-foreground hover:text-accent hover:bg-muted/50 transition-colors font-medium"
                        >
                          {category.name}
                        </button>
                        {category.subcategories.length > 0 && (
                          <div className="pl-6">
                            {category.subcategories.map((sub) => (
                              <button
                                key={sub}
                                onClick={() => handleSubcategoryClick(category.slug, sub)}
                                className="w-full px-8 py-2 text-left text-xs text-muted-foreground hover:text-accent transition-colors"
                              >
                                {sub}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* About Link */}
              <Link
                href="/about"
                onClick={() => setIsOpen(false)}
                className="px-6 py-4 text-foreground hover:text-accent font-medium transition-colors block"
              >
                {t.about}
              </Link>

              {/* Contact Link */}
              <Link
                href="/contact"
                onClick={() => setIsOpen(false)}
                className="px-6 py-4 text-foreground hover:text-accent font-medium transition-colors block"
              >
                {t.contact}
              </Link>
            </nav>
          </div>
        </>
      )}
    </div>
  )
}
