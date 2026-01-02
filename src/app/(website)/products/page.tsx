import { ProductsFilters } from "@/components/products-filters";
import { getLocale, getTranslations } from "next-intl/server";
import { getCategoriesWithSubcategories } from "@/sanity/sanity-utils";
import ProductsGrid from "@/components/products-grid";
import { Suspense } from "react";
import SectionLoader from "@/components/section-loader";

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{
    category: string;
    subcategory: string;
    page?: string;
  }>;
}) {
  const t = await getTranslations("ProductsPage");
  const locale = await getLocale();
  const isRTL = locale === "ar";

  const { category, subcategory, page } = await searchParams;

  const categories = await getCategoriesWithSubcategories();

  return (
    <main className={isRTL ? "rtl" : "ltr"} dir={isRTL ? "rtl" : "ltr"}>
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-primary mb-2 text-3xl font-bold text-balance md:text-4xl">
          {t("products")}
        </h1>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
          {/* Filters Sidebar - Hidden on mobile */}
          <div className="hidden lg:block">
            <ProductsFilters categories={categories} />
          </div>

          {/* Products Grid */}
          <Suspense
            key={`${category}-${subcategory}-${page}`}
            fallback={
              <div className="flex min-h-[50vh] items-center justify-center lg:col-span-3">
                <SectionLoader />
              </div>
            }
          >
            <ProductsGrid
              category={category}
              subcategory={subcategory}
              page={page}
            />
          </Suspense>
        </div>
      </div>
    </main>
  );
}
