"use client";

import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Heart, Leaf, Users } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";

export default function AboutPage() {
  const t = useTranslations("AboutPage");
  const locale = useLocale();
  const isRTL = locale === "ar";

  return (
    <main className={isRTL ? "rtl" : "ltr"} dir={isRTL ? "rtl" : "ltr"}>
      <div className="container mx-auto px-4 py-12">
        {/* Hero */}
        <div className="mb-16 text-center">
          <h1 className="text-primary mb-4 text-4xl font-bold text-balance md:text-5xl">
            {t("title")}
          </h1>
          <p className="text-muted-foreground mx-auto max-w-2xl text-xl text-pretty">
            {t("intro")}
          </p>
        </div>

        {/* Story Section */}
        <section className="mb-16">
          <h2 className="text-primary mb-6 text-3xl font-bold">
            {t("story_title")}
          </h2>
          <p className="text-muted-foreground max-w-3xl text-lg leading-relaxed">
            {t("story_desc")}
          </p>
        </section>

        {/* Mission Section */}
        <section className="bg-cream mb-16 rounded-lg p-8">
          <h2 className="text-primary mb-6 text-3xl font-bold">
            {t("mission_title")}
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            {t("mission_desc")}
          </p>
        </section>

        {/* Values Section */}
        <section>
          <h2 className="text-primary mb-12 text-center text-3xl font-bold">
            {t("values_title")}
          </h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {/* Quality */}
            <div className="text-center">
              <div className="mb-4 flex justify-center">
                <div className="bg-accent/10 rounded-full p-4">
                  <Heart className="text-accent h-8 w-8" />
                </div>
              </div>
              <h3 className="text-foreground mb-3 text-xl font-bold">
                {t("quality")}
              </h3>
              <p className="text-muted-foreground">{t("quality_desc")}</p>
            </div>

            {/* Sustainability */}
            <div className="text-center">
              <div className="mb-4 flex justify-center">
                <div className="bg-accent/10 rounded-full p-4">
                  <Leaf className="text-accent h-8 w-8" />
                </div>
              </div>
              <h3 className="text-foreground mb-3 text-xl font-bold">
                {t("sustainability")}
              </h3>
              <p className="text-muted-foreground">
                {t("sustainability_desc")}
              </p>
            </div>

            {/* Community */}
            <div className="text-center">
              <div className="mb-4 flex justify-center">
                <div className="bg-accent/10 rounded-full p-4">
                  <Users className="text-accent h-8 w-8" />
                </div>
              </div>
              <h3 className="text-foreground mb-3 text-xl font-bold">
                {t("community")}
              </h3>
              <p className="text-muted-foreground">{t("community_desc")}</p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
