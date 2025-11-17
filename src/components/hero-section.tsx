'use client';

import Image from 'next/image';
import { type Language, t } from '@/lib/i18n';

interface HeroSectionProps {
  language: Language;
}

export function HeroSection({ language }: HeroSectionProps) {
  return (
    <section className="relative w-full h-96 md:h-[500px] overflow-hidden rounded-lg mb-12">
      <Image
        src="/honey-farm-golden-fields-natural.jpg"
        alt="Miel Ayed Premium Honey"
        fill
        className="object-cover"
        priority
      />
      
      <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
        <div className="text-center text-white space-y-4 px-4">
          <h1 className="text-5xl md:text-6xl font-bold text-balance">
            Miel Ayed
          </h1>
          <p className="text-xl md:text-2xl text-balance">
            عسل عياد - Premium Organic Honey
          </p>
          <p className="text-lg text-white/90 max-w-2xl mx-auto">
            Authentic honey varieties sourced with care and tradition
          </p>
        </div>
      </div>
    </section>
  );
}
