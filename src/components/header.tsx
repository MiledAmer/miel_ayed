'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ShoppingCart, ChevronDown } from 'lucide-react'
import { useLanguage } from '@/hooks/use-language'
import { useCart } from '@/lib/store'
import { LanguageToggle } from './language-toggle'
import { MobileNav } from './mobile-nav'
import { Button } from '@/components/ui/button'
import { CATEGORIES } from '@/lib/types'
import { useState } from 'react'

const translations = {
  en: {
    products: 'Products',
    about: 'About',
    contact: 'Contact',
  },
  fr: {
    products: 'Produits',
    about: 'À propos',
    contact: 'Contact',
  },
  ar: {
    products: 'المنتجات',
    about: 'معلومات',
    contact: 'تواصل',
  },
}

export function Header() {
  const router = useRouter()
  const { language, mounted } = useLanguage()
  const { items } = useCart()
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)

  const t = translations[language as keyof typeof translations] || translations.fr
  const isRTL = language === 'ar'

  const cartCount = items.reduce((sum, item) => sum + item.quantity, 0)

  const handleCategoryClick = (categorySlug: string) => {
    setOpenDropdown(null)
    router.push(`/products?category=${categorySlug}`)
  }

  const handleSubcategoryClick = (categorySlug: string, subcategory: string) => {
    setOpenDropdown(null)
    router.push(`/products?category=${categorySlug}&subcategory=${encodeURIComponent(subcategory)}`)
  }

  if (!mounted) return null

  return (
    <header
      className={`sticky top-0 z-50 bg-white border-b border-border shadow-sm ${isRTL ? 'rtl' : 'ltr'}`}
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between gap-6">
          <MobileNav />

          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <div className="text-2xl font-bold text-primary">Miel Ayed</div>
          </Link>

          {/* Navigation Menu */}
          <nav className="hidden md:flex items-center gap-6 flex-1">
            {/* Category Dropdown */}
            <div className="relative group">
              <button
                className="flex items-center gap-1 text-foreground hover:text-accent transition-colors font-medium"
                aria-haspopup="true"
                aria-expanded={openDropdown === 'categories'}
                onClick={() => setOpenDropdown(openDropdown === 'categories' ? null : 'categories')}
              >
                {t.products}
                <ChevronDown className="w-4 h-4" />
              </button>

              {/* Dropdown Menu */}
              <div className="absolute left-0 top-full mt-0 w-56 bg-white border border-border rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 py-2">
                {CATEGORIES.map((category) => (
                  <div key={category.slug}>
                    <button
                      onClick={() => handleCategoryClick(category.slug)}
                      className="w-full text-left px-4 py-2 text-sm text-foreground hover:bg-muted hover:text-accent transition-colors font-medium"
                    >
                      {category.name}
                    </button>
                    {category.subcategories.length > 0 && (
                      <div className="pl-4 bg-muted/30">
                        {category.subcategories.map((sub) => (
                          <button
                            key={sub}
                            onClick={() => handleSubcategoryClick(category.slug, sub)}
                            className="w-full text-left px-4 py-1 text-xs text-muted-foreground hover:text-accent transition-colors"
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

            <Link href="/about" className="text-foreground hover:text-accent transition-colors font-medium">
              {t.about}
            </Link>
            <Link href="/contact" className="text-foreground hover:text-accent transition-colors font-medium">
              {t.contact}
            </Link>
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-3">
            <LanguageToggle />

            <Link href="/cart">
              <Button variant="outline" size="icon" className="relative">
                <ShoppingCart className="w-5 h-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-accent text-accent-foreground text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </Button>
            </Link>
          </div>
        </div>

        {/* Mobile Menu (simplified) */}
        <nav className="md:hidden flex gap-2 mt-4 justify-center flex-wrap">
          <Link href="/products">
            <Button variant="ghost" size="sm">{t.products}</Button>
          </Link>
          <Link href="/about">
            <Button variant="ghost" size="sm">{t.about}</Button>
          </Link>
          <Link href="/contact">
            <Button variant="ghost" size="sm">{t.contact}</Button>
          </Link>
        </nav>
      </div>
    </header>
  )
}
