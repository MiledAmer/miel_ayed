"use client";

import { useTranslations, useLocale } from "next-intl";
import Image from "next/image";

export default function WhyUs() {
  const t = useTranslations("AboutPage");
  const locale = useLocale();
  const isRTL = locale === "ar";
  return (
    <section className="px-4 py-16 sm:px-6 lg:px-8" dir={isRTL ? "rtl" : "ltr"}>
      <div className="mx-auto max-w-6xl">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Image Side */}
          <div className="bg-muted relative order-2 h-[500px] overflow-hidden rounded-2xl lg:order-1">
            <Image
              src="/product.webp"
              alt={t("products_alt")}
              className="h-full w-full object-cover"
              fill
            />
          </div>

          {/* Content Side */}
          <div className="order-1 lg:order-2">
            <h2 className="text-foreground mb-8 text-4xl font-bold">
              {t("why_choose_title")}
            </h2>

            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="bg-primary/10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full">
                  <svg
                    className="text-primary h-6 w-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="text-foreground mb-2 text-xl font-bold">
                    {t("artisanal_production_title")}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {t("artisanal_production_desc")}
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="bg-primary/10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full">
                  <svg
                    className="text-primary h-6 w-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="text-foreground mb-2 text-xl font-bold">
                    {t("additives_free_title")}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {t("additives_free_desc")}
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="bg-primary/10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full">
                  <svg
                    className="text-primary h-6 w-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="text-foreground mb-2 text-xl font-bold">
                    {t("passionate_expertise_title")}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {t("passionate_expertise_desc")}
                  </p>
                </div>
              </div>
            </div>

            <div className="border-border mt-8 border-t pt-8">
              <p className="text-primary text-2xl font-semibold">
                {t("taste_difference")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
