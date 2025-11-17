'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { type Product } from '@/lib/products';
import { type Language } from '@/lib/i18n';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCartStore } from '@/lib/store';

interface SpecialOffersCarouselProps {
  products: Product[];
  language: Language;
}

export function SpecialOffersCarousel({
  products,
  language,
}: SpecialOffersCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const addItem = useCartStore((state) => state.addItem);

  useEffect(() => {
    if (isPaused) return;

    timeoutRef.current = setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % products.length);
    }, 4000);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [currentIndex, isPaused, products.length]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + products.length) % products.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % products.length);
  };

  const handleAddToCart = (product: Product) => {
    addItem({
      id: product.id,
      title: product.title,
      price: product.price,
      quantity: 1,
      image: product.image,
    });
  };

  const product = products[currentIndex];

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-foreground mb-2">
          Special Offers
        </h2>
      </div>

      <div
        className="relative bg-gradient-to-r from-secondary to-accent rounded-lg overflow-hidden max-w-2xl mx-auto"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div className="relative w-full h-96 md:h-[500px]">
          <Image
            src={product?.image ?? "/placeholder.svg"}
            alt={product?.title ?? "Placeholder"}
            fill
            className="object-cover"
            priority
          />

          <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
            <div className="text-center text-white space-y-4 px-4">
              <h2 className="text-4xl md:text-5xl font-bold text-balance">
                {product?.title}
              </h2>
              <p className="text-lg md:text-xl text-balance max-w-md mx-auto">
                {product?.description}
              </p>
              <div className="text-3xl font-bold">{product?.price.toFixed(2)} TND</div>
              <Button
                onClick={() => handleAddToCart(product!)}
                className="bg-primary hover:bg-primary/90 text-primary-foreground px-8"
              >
                Add to Cart
              </Button>
            </div>
          </div>
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={handlePrev}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full transition z-10"
          aria-label="Previous"
        >
          <ChevronLeft className="w-6 h-6 text-black" />
        </button>

        <button
          onClick={handleNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full transition z-10"
          aria-label="Next"
        >
          <ChevronRight className="w-6 h-6 text-black" />
        </button>

        {/* Indicators */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
          {products.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`w-2 h-2 rounded-full transition ${
                idx === currentIndex ? 'bg-white' : 'bg-white/50'
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
