'use client'

import { useLanguage } from '@/hooks/use-language'
import Link from 'next/link'

const translations = {
  en: {
    about_us: 'About Us',
    about_desc: 'Miel Ayed - Premium honey products from Tunisia',
    quick_links: 'Quick Links',
    contact: 'Contact',
    follow_us: 'Follow Us',
    copyright: '© 2025 Miel Ayed. All rights reserved.',
    phone: 'Phone',
    email: 'Email',
  },
  fr: {
    about_us: 'À Propos',
    about_desc: 'Miel Ayed - Produits de miel premium de Tunisie',
    quick_links: 'Liens Rapides',
    contact: 'Contact',
    follow_us: 'Suivez-nous',
    copyright: '© 2025 Miel Ayed. Tous droits réservés.',
    phone: 'Téléphone',
    email: 'Email',
  },
  ar: {
    about_us: 'عن الشركة',
    about_desc: 'عسل عياد - منتجات عسل فاخرة من تونس',
    quick_links: 'روابط سريعة',
    contact: 'اتصل بنا',
    follow_us: 'تابعنا',
    copyright: '© 2025 عسل عياد. جميع الحقوق محفوظة.',
    phone: 'الهاتف',
    email: 'البريد الإلكتروني',
  },
}

export function Footer() {
  const { language, mounted } = useLanguage()

  if (!mounted) return null

  const t = translations[language as keyof typeof translations] || translations.fr
  const isRTL = language === 'ar'

  return (
    <footer
      className={`bg-primary text-primary-foreground py-12 ${isRTL ? 'rtl' : 'ltr'}`}
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* About Section */}
          <div>
            <h3 className="text-lg font-bold mb-4">{t.about_us}</h3>
            <p className="text-sm opacity-90">{t.about_desc}</p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-4">{t.quick_links}</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="hover:underline">
                  {language === 'en' ? 'Home' : language === 'fr' ? 'Accueil' : 'الرئيسية'}
                </Link>
              </li>
              <li>
                <Link href="/products" className="hover:underline">
                  {language === 'en' ? 'Products' : language === 'fr' ? 'Produits' : 'المنتجات'}
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:underline">
                  {t.about_us}
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:underline">
                  {t.contact}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-bold mb-4">{t.contact}</h3>
            <ul className="space-y-2 text-sm">
              <li>
                {t.phone}: +216 XX XXX XXXX
              </li>
              <li>
                {t.email}: info@mielayed.tn
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 pt-8 text-center text-sm">
          <p>{t.copyright}</p>
        </div>
      </div>
    </footer>
  )
}
