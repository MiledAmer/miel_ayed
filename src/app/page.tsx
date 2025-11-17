'use client';

import { useState, useEffect } from 'react';
import { Header } from '@/components/header';
import { HeroSection } from '@/components/hero-section';
import { ProductGrid } from '@/components/product-grid';
import { SpecialOffersCarousel } from '@/components/special-offers-carousel';
import { products } from '@/lib/products';
import { type Language } from '@/lib/i18n';

export default function Home() {
  const [language, setLanguage] = useState<Language>('en');

  useEffect(() => {
    const saved = localStorage.getItem('language') as Language | null;
    if (saved) setLanguage(saved);

    const handleStorageChange = () => {
      const updated = localStorage.getItem('language') as Language | null;
      if (updated) setLanguage(updated);
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const specialProducts = products.filter((p) => p.category === 'special');
  const allProducts = products;

  return (
    <main className="min-h-screen bg-background">
      <Header language={language} />

      <section className="max-w-7xl mx-auto px-4 py-4 md:py-6">
        <HeroSection language={language} />
      </section>

      {/* Special Offers Carousel */}
      <section className="max-w-7xl mx-auto px-4 py-8 md:py-12">
        {specialProducts.length > 3 ? (
          <SpecialOffersCarousel products={specialProducts} language={language} />
        ) : (
          <div className="bg-secondary rounded-lg p-8 text-center space-y-4">
            <h2 className="text-3xl font-bold text-secondary-foreground">
              Special Offers
            </h2>
            {specialProducts.length > 0 && (
              <ProductGrid products={specialProducts} language={language} />
            )}
          </div>
        )}
      </section>

      {/* Products Section */}
      <section id="products" className="max-w-7xl mx-auto px-4 py-12 md:py-16">
        <h2 className="text-3xl font-bold mb-8 text-center text-foreground">
          Our Collection
        </h2>
        <ProductGrid products={allProducts} language={language} />
      </section>

      {/* Footer */}
      <footer className="bg-secondary text-secondary-foreground py-8 mt-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-sm">
            © 2025 Miel Ayed. عسل عياد. All rights reserved.
          </p>
        </div>
      </footer>
    </main>
  );
}
