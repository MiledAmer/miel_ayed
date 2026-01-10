"use client";
import { useTranslations, useLocale } from "next-intl";
import Stack from "@/components/Stack";
import Image from "next/image";

export default function FounderSection() {
  const t = useTranslations("AboutPage");
  const locale = useLocale();
  const isRTL = locale === "ar";
  
  const abdouImages = [
    <Image
      key="img1"
      src="/about/abdou/el-moudir-1.jpg"
      alt={t("founder_alt")}
      width={600}
      height={600}
      className="pointer-events-none h-full w-full rounded-xl object-cover"
      loading="lazy"
    />,
    <Image
      key="img2"
      src="/about/abdou/el-moudir-2.jpg"
      alt={t("beekeeping_alt")}
      width={600}
      height={600}
      className="pointer-events-none h-full w-full rounded-xl object-cover"
      loading="lazy"
    />,
    <Image
      key="img3"
      src="/about/abdou/el-moudir-3.jpg"
      alt={t("nature_alt")}
      width={600}
      height={600}
      className="pointer-events-none h-full w-full rounded-xl object-cover"
      loading="lazy"
    />,
    <Image
      key="img4"
      src="/about/abdou/el-moudir-4.jpg"
      alt={t("production_alt")}
      width={600}
      height={600}
      className="pointer-events-none h-full w-full rounded-xl object-cover"
      loading="lazy"
    />,
  ];
  return (
    <section 
      className="bg-card px-4 py-16 sm:px-6 lg:px-8"
      dir={isRTL ? "rtl" : "ltr"}
    >
      <div className="mx-auto max-w-4xl">
        <div className="grid items-center gap-12 md:grid-cols-2">
          <div>
            <h2 className="text-card-foreground mb-6 text-3xl font-bold">
              {t("story_title")}
            </h2>
            <p className="text-muted-foreground mb-4 text-lg leading-relaxed">
              {t("story_desc")}
            </p>
          </div>
          <div className="bg-muted relative h-80 overflow-hidden rounded-lg">
            <div className="h-full w-full p-10">
              <Stack
                autoplay
                autoplayDelay={2500}
                pauseOnHover={true}
                cards={abdouImages}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
