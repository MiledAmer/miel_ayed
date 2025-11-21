import { ProductCard } from "@/components/product-card";
import { ProductsFilters } from "@/components/products-filters";
import { getLocale, getTranslations } from "next-intl/server";
import { getCategoriesWithSubcategories, getFilteredProducts } from "@/sanity/sanity-utils";

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ category: string; subcategory: string }>;
}) {
  const t = await getTranslations("ProductsPage");
  const locale = await getLocale();
  const isRTL = locale === "ar";
  
  const { category, subcategory } = await searchParams;
  
  const categories = await getCategoriesWithSubcategories();
  const filteredProducts = await getFilteredProducts({
    categorySlug: category,
    subcategorySlug: subcategory,
    page: 1,
    pageSize: 100,
  });

  return (
    <main className={isRTL ? "rtl" : "ltr"} dir={isRTL ? "rtl" : "ltr"}>
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-primary mb-2 text-3xl font-bold text-balance md:text-4xl">
          {t("products")}
        </h1>
        <p className="text-muted-foreground mb-8">
          {t("showing")} {filteredProducts.products.length} {t("products_count")}
        </p>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
          {/* Filters Sidebar - Hidden on mobile */}
          <div className="hidden lg:block">
            <ProductsFilters categories={categories} />
          </div>

          {/* Products Grid */}
          <div className="lg:col-span-3">
            {filteredProducts.products.length > 0 ? (
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                {filteredProducts.products.map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))}
              </div>
            ) : (
              <div className="bg-muted rounded-lg py-12 text-center">
                <p className="text-muted-foreground text-lg">
                  {t("no_results")}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
