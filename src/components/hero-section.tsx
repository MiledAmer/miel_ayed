'use client'

import { useLanguage } from '@/hooks/use-language'
import { Button } from '@/components/ui/button'
import { ChevronDown } from 'lucide-react'

const translations = {
  en: {
    title: 'Premium Tunisian Honey',
    subtitle: 'Discover authentic honey and bee products from Tunisia. Organic, pure, and delivered to your door.',
    cta: 'Explore Products',
  },
  fr: {
    title: 'Miel Tunisien Haut de Gamme',
    subtitle: 'Découvrez le miel authentique et les produits apicoles de Tunisie. Biologique, pur et livré chez vous.',
    cta: 'Explorer les Produits',
  },
  ar: {
    title: 'العسل التونسي الفاخر',
    subtitle: 'اكتشف العسل الأصلي ومنتجات النحل من تونس. عضوي وصافٍ وموصول إلى باب منزلك.',
    cta: 'استكشف المنتجات',
  },
}

export function HeroSection() {
  const { language, mounted } = useLanguage()

  if (!mounted) return null

  const t = translations[language as keyof typeof translations] || translations.fr
  const isRTL = language === 'ar'

  const scrollToProducts = () => {
    const element = document.getElementById('highlighted-products')
    element?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      className={`relative from-cream to-background py-20 px-4 ${
        isRTL ? 'rtl' : 'ltr'
      }`}
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      <div className="container mx-auto text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-primary mb-6 text-balance">
          {t.title}
        </h1>

        <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8 text-pretty">
          {t.subtitle}
        </p>

        <Button
          onClick={scrollToProducts}
          size="lg"
          className="bg-accent hover:bg-accent/90 text-accent-foreground mb-8 md:mb-0"
        >
          {t.cta}
        </Button>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronDown className="w-6 h-6 text-accent" />
        </div>
      </div>
    </section>
  )
}
