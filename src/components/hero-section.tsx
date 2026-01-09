"use client";

import { Button } from "@/components/ui/button";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import { useRouter } from "next/navigation";

export function HeroSection() {
  const t = useTranslations("HomePage.HeroSection");
  const locale = useLocale();
  const router = useRouter();

  const isRTL = locale === "ar";

  return (
    <>
      <section
        className="mx-auto flex max-w-7xl flex-col items-center gap-8 px-4 py-8 sm:gap-12 sm:px-6 sm:py-16 md:grid md:grid-cols-2 md:py-24"
        dir={isRTL ? "rtl" : "ltr"}
      >
        {/* Left Content */}
        <div className="flex w-full flex-col gap-6 sm:gap-8">
          <div className="space-y-3 sm:space-y-4">
            <h1 className="text-secondary font-serif text-4xl leading-tight font-bold text-balance sm:text-5xl md:text-6xl">
              {t("title_1")}{" "}
              <span className="text-primary block">{t("title_2")}</span>
            </h1>
            <div className="from-secondary to-primary h-1 w-12 bg-linear-to-r sm:w-16"></div>
          </div>

          <p className="text-muted-foreground max-w-md text-base leading-relaxed text-pretty sm:text-lg md:text-xl">
            {t("subtitle")}
          </p>

          <div className="flex w-full flex-col gap-3 pt-2 sm:w-auto sm:flex-row sm:gap-4 sm:pt-4">
            <Button 
              onClick={() => router.push("/products")}
              className="rounded-lg px-6 py-3 text-base text-white transition-transform hover:scale-105 sm:px-8 sm:py-6 sm:text-lg"
            >
              {t("cta")}
            </Button>
            <Button
              variant="outline"
              onClick={() => router.push("/about")}
              className="border-primary text-primary rounded-lg bg-transparent px-6 py-3 text-base sm:px-8 sm:py-6 sm:text-lg"
            >
              {t("learn_more")}
            </Button>
          </div>

          <div className="text-secondary hidden sm:grid grid-cols-1 gap-4 pt-4 text-xs sm:grid-cols-3 sm:gap-8 sm:pt-8 sm:text-sm">
            <div className="flex flex-col gap-1">
              <span className="font-semibold">{t("tag_1")}</span>
              <span className="text-secondary-foreground">
                {t("tag_1_message")}
              </span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="font-semibold">{t("tag_2")}</span>
              <span className="text-secondary-foreground">
                {t("tag_2_message")}
              </span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="font-semibold">{t("tag_3")}</span>
              <span className="text-secondary-foreground">
                {t("tag_3_message")}
              </span>
            </div>
          </div>
        </div>

        {/* Right Image */}
        <div className="hidden sm:block relative h-64 w-full sm:h-96 md:h-full md:min-h-[600px]">
          <Image
            src="/product.webp"
            alt="Honey jars with wooden dippers"
            fill
            className="object-contain"
            priority
          />
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 -z-10 h-24 w-24 rounded-full bg-amber-200/20 blur-3xl sm:h-32 sm:w-32"></div>
          <div className="absolute bottom-0 left-0 -z-10 h-32 w-32 rounded-full bg-amber-300/10 blur-3xl sm:h-40 sm:w-40"></div>
        </div>
      </section>
    </>
  );
}
