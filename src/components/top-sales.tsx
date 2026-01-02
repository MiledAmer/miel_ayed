"use client";

import * as React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { ProductCard } from "@/components/product-card";
import type { Product } from "@/sanity/types/products";
import { useTranslations, useLocale } from "next-intl";

interface TopSalesProps {
  products: Product[];
}

export default function TopSales({ products }: TopSalesProps) {
  const t = useTranslations("HomePage.TopSales");
  const locale = useLocale();
  const isRTL = locale === "ar";

  return (
    <section className="bg-background py-16" dir={isRTL ? "rtl" : "ltr"}>
      <div className="container mx-auto px-4">
        <h2 className="text-primary mb-8 text-center text-3xl font-bold md:text-4xl">
          {t("title")}
        </h2>
        <Carousel
          opts={{
            align: "start",
            loop: true,
            direction: isRTL ? "rtl" : "ltr",
          }}
          className="mx-auto w-full max-w-7xl"
        >
          <CarouselContent>
            {products.map((product) => (
              <CarouselItem
                key={product._id}
                className="basis-[85%] md:basis-1/2 lg:basis-1/3"
              >
                <div className="h-full p-1">
                  <ProductCard product={product} />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden md:flex" />
          <CarouselNext className="hidden md:flex" />
        </Carousel>
      </div>
    </section>
  );
}
