"use client"

import * as React from "react"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { ProductCard } from "@/components/product-card"
import type { Product } from "@/sanity/types/products"
import { useTranslations, useLocale } from "next-intl"

interface TopSalesProps {
  products: Product[]
}

export default function TopSales({ products }: TopSalesProps) {
  const t = useTranslations("HomePage.TopSales")
  const locale = useLocale()
  const isRTL = locale === "ar"

  return (
    <section className="py-16 bg-background" dir={isRTL ? "rtl" : "ltr"}>
      <div className="container px-4 mx-auto">
        <h2 className="mb-8 text-3xl font-bold text-center md:text-4xl text-primary">
          {t("title")}
        </h2>
        <Carousel
          opts={{
            align: "start",
            loop: true,
            direction: isRTL ? "rtl" : "ltr",
          }}
          className="w-full max-w-7xl mx-auto"
        >
          <CarouselContent>
            {products.map((product) => (
              <CarouselItem key={product._id} className="basis-[85%] md:basis-1/2 lg:basis-1/3">
                <div className="p-1 h-full">
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
  )
}
