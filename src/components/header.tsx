'use client';

import Link from 'next/link';
import { type Language, t } from '@/lib/i18n';
import { LanguageSwitcher } from './language-switcher';
import { useCartStore } from '@/lib/store';
import { ShoppingCart } from 'lucide-react';

interface HeaderProps {
  language: Language;
}

export function Header({ language }: HeaderProps) {
  const totalItems = useCartStore((state) => state.getTotalItems());

  return (
    <header className="sticky top-0 z-50 bg-background border-b border-border">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold text-primary">
          {t(language, 'home.title')}
        </Link>

        <nav className="hidden md:flex gap-6 items-center">
          <Link href="/" className="text-sm hover:text-primary transition">
            {t(language, 'nav.home')}
          </Link>
          <Link href="/#products" className="text-sm hover:text-primary transition">
            {t(language, 'nav.shop')}
          </Link>
        </nav>

        <div className="flex items-center gap-4">
          <LanguageSwitcher currentLanguage={language} />
          <Link
            href="/cart"
            className="relative p-2 hover:bg-secondary rounded-lg transition"
          >
            <ShoppingCart className="w-5 h-5" />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 bg-accent text-accent-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                {totalItems}
              </span>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
}
