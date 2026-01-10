"use client";

import { useTranslations } from "next-intl";
import { galleryImages } from "@/data/gallery-images";
import { useEffect, useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import CircularGallery from "@/components/CircularGallery";

export default function GallerySection() {
  const isMobile = useIsMobile();
  const [mounted, setMounted] = useState(false);
  const t = useTranslations("AboutPage");

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const bendValue = isMobile ? 0.3 : 1;
  return (
    <section className="bg-muted/30 px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
      <div className="mx-auto max-w-6xl">
        <h2 className="text-foreground mb-3 text-center text-2xl font-bold sm:mb-4 sm:text-3xl lg:text-4xl">
          {t("gallery_title")}
        </h2>
        <p className="text-muted-foreground mb-12 text-center text-base sm:mb-16 sm:text-lg">
          {t("gallery_subtitle")}
        </p>
        <div className="relative h-80 sm:h-96 md:h-[500px] lg:h-[600px]">
          <CircularGallery
            items={galleryImages}
            bend={bendValue}
            textColor="#000000"
            borderRadius={0.05}
            scrollEase={0.02}
            scrollSpeed={0.7}
          />
        </div>
      </div>
    </section>
  );
}
