'use client'

import { useLocale, useTranslations } from 'next-intl'
import Link from 'next/link'


export function Footer() {
  const t = useTranslations('HomePage.Footer')
  const locale = useLocale()
  const isRTL = locale === 'ar'

  return (
    <footer
      className={`bg-secondary text-primary-foreground py-12 ${isRTL ? 'rtl' : 'ltr'}`}
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      <div className="container mx-auto px-4 text-primary">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* About Section */}
          <div>
            <h3 className="text-lg font-bold mb-4">{t("about_us")}</h3>
            <p className="text-sm opacity-90">{t("about_desc")}</p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-4">{t("quick_links")}</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="hover:underline">
                  {t("home")}
                </Link>
              </li>
              <li>
                <Link href="/products" className="hover:underline">
                  {t("products")}
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:underline">
                  {t("about_us")}
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:underline">
                  {t("contact")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-bold mb-4">{t("contact")}</h3>
            <ul className="space-y-2 text-sm">
              <li>
                {t("phone")}: +216 XX XXX XXXX
              </li>
              <li>
                {t("email")}: info@mielayed.tn
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-secondary-foreground/20 pt-8 text-center text-sm">
          <p>{t("copyright")}</p>
        </div>
      </div>
    </footer>
  )
}
