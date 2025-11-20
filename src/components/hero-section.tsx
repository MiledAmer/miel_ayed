"use client";

import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";

export function HeroSection() {
  const t = useTranslations("HomePage.HeroSection");
  const locale = useLocale();

  const isRTL = locale === "ar";

  const scrollToProducts = () => {
    const element = document.getElementById("highlighted-products");
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      className={`from-cream to-background relative px-4 py-20 ${
        isRTL ? "rtl" : "ltr"
      }`}
      dir={isRTL ? "rtl" : "ltr"}
    >
      <div className="container mx-auto text-center">
        <h1 className="text-primary mb-6 text-4xl font-bold text-balance md:text-5xl">
          {t("title")}
        </h1>

        <p className="text-muted-foreground mx-auto mb-8 max-w-2xl text-lg text-pretty">
          {t("subtitle")}
        </p>

        <Button
          onClick={scrollToProducts}
          size="lg"
          className="bg-accent hover:bg-accent/90 text-accent-foreground mb-8 md:mb-0"
        >
          {t("cta")}
        </Button>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 transform animate-bounce">
          <ChevronDown className="text-accent h-6 w-6" />
        </div>
      </div>
    </section>
  );
}
