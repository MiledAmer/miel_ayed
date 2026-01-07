import {
  getLandingPageTopSales,
  getTranslatedCategoryName,
} from "@/sanity/sanity-utils";
import { ProductCard } from "@/components/product-card";
import { Suspense } from "react";
import SectionLoader from "@/components/section-loader";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { getLocale, getTranslations } from "next-intl/server";

async function FeaturedProducts({
  locale,
  t,
}: {
  locale: string;
  t: (key: string) => string;
}) {
  const categories = await getLandingPageTopSales();

  const isRTL = locale === "ar";

  return (
    <div className="space-y-12" dir={isRTL ? "rtl" : "ltr"}>
      {categories.map(
        (category) =>
          category.products &&
          category.products.length > 0 && (
            <div key={category._id} className="space-y-6">
              <div className="mb-8 flex flex-col items-center justify-between gap-6 md:flex-row md:items-end">
                <h3 className="text-primary text-3xl font-black">
                  {getTranslatedCategoryName(category, locale)}
                </h3>
                <Link
                  href={"/products?category=" + category.slug.current}
                  className={
                    `group text-primary hover:text-foreground flex items-center gap-2 text-sm font-bold tracking-wider uppercase transition` +
                    (isRTL ? " flex-row-reverse" : "")
                  }
                >
                  {t("see_more")}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
              <Carousel
                opts={{
                  align: "start",
                  loop: true,
                }}
                className="w-full relative"
              >
                <CarouselContent>
                  {category.products.map((product) => (
                    <CarouselItem
                      key={product._id}
                      className="basis-[85%] md:basis-1/2 lg:basis-1/3"
                    >
                      <div className="p-1">
                        <ProductCard product={product} />
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
              </Carousel>
            </div>
          ),
      )}
    </div>
  );
}

export default async function FeaturedCollection() {
  const t = await getTranslations("HomePage.HighlightedProducts");
  const locale = await getLocale();
  const isRTL = locale === "ar";

  return (
    <section
      className="bg-background relative min-h-screen overflow-hidden px-4 py-16"
      dir={isRTL ? "rtl" : "ltr"}
    >
      {/* Background elements */}
      <div className="bg-primary/10 absolute top-0 left-1/4 h-80 w-80 rounded-full mix-blend-multiply blur-3xl dark:mix-blend-screen" />

      <div className="relative z-10 mx-auto max-w-6xl">
        <div className="mb-10 flex flex-col items-center justify-between gap-6 md:flex-row md:items-end">
          <div className="text-center md:text-left">
            <h2 className="mb-4 text-4xl font-black tracking-tighter md:text-5xl">
              <span className="text-primary">{t("Featured")}</span>{" "}
              <span className="text-foreground">{t("Products")}</span>
            </h2>
            <p className="text-muted-foreground text-lg">{t("subtitle")}</p>
          </div>
        </div>

        <Suspense
          fallback={
            <div className="flex justify-center py-20">
              <SectionLoader />
            </div>
          }
        >
          <FeaturedProducts locale={locale} t={t} />
        </Suspense>
      </div>
    </section>
  );
}
