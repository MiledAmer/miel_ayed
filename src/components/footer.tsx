"use client";

import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";
import Image from "next/image";

export function Footer() {
  const t = useTranslations("HomePage.Footer");
  const locale = useLocale();
  const isRTL = locale === "ar";

  return (
    <footer
      className={`bg-secondary py-12 ${isRTL ? "rtl" : "ltr"}`}
      dir={isRTL ? "rtl" : "ltr"}
    >
      <div className="relative container mx-auto px-4 text-amber-100">
        <div className="absolute left-1/2 top-0 -translate-x-1/2">
          <Link href="/" className="mb-4 inline-block">
            <Image
              src="/inverted-logo.png"
              alt="Miel Ayed"
              width={200}
              height={80}
              className="h-24 w-auto object-contain"
            />
          </Link>
        </div>
        <div className="mb-8 grid grid-cols-1 gap-8 pt-28 md:grid-cols-3">
          {/* About Section */}
          <div>
            <h3 className="mb-4 text-lg font-bold">{t("about_us")}</h3>
            <p className="text-sm opacity-90">{t("about_desc")}</p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-4 text-lg font-bold">{t("quick_links")}</h3>
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
            <h3 className="mb-4 text-lg font-bold">{t("contact")}</h3>
            <ul className="space-y-2 text-sm">
              <li>
                {t("phone")}: <span dir="ltr">+216 53 854 810</span>
              </li>
              <li>{t("email")}: contact@mielayed.com</li>
            </ul>
          </div>
        </div>

        <div className="border-secondary-foreground/20 border-t pt-8 text-center text-sm">
          <p>{t("copyright")}</p>
        </div>
      </div>
    </footer>
  );
}
