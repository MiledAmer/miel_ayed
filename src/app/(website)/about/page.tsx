"use client";

import { useTranslations } from "next-intl";
import FounderSection from "@/components/founder-section";
import GallerySection from "@/components/gallery-section";
import WhyUs from "@/components/why-us";

export default function AboutPage() {
  const t = useTranslations("AboutPage");

  return (
    <div className="bg-background min-h-screen">
      {/* Hero Section */}
      <section className="relative px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="text-foreground mb-6 text-5xl font-bold text-balance sm:text-6xl">
            {t("title")}
          </h1>
          <p className="text-muted-foreground text-xl">{t("intro")}</p>
        </div>
      </section>

      {/* Founder Section */}
      <FounderSection />

      {/* Circular Gallery Section */}
      <GallerySection />

      {/* Products/Why Choose Us Section */}
      <WhyUs />
    </div>
  );
}
