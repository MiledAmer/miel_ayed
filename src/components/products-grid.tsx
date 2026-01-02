import { getFilteredProducts } from "@/sanity/sanity-utils";
import PaginationComponent from "./pagination-component";
import { ProductCard } from "./product-card";
import { getTranslations } from "next-intl/server";

export default async function ProductsGrid({category, subcategory, page}: {category?: string; subcategory?: string; page?: string}) {
  const t = await getTranslations("ProductsPage");
  const filteredProducts = await getFilteredProducts({
    categorySlug: category,
    subcategorySlug: subcategory,
    page: page ? parseInt(page) : 1,
    pageSize: 6,
  });
  return (
    <>
    
      <div className="lg:col-span-3 md:-translate-y-10">
        <p className="text-muted-foreground mb-4">
          {t("showing")} {filteredProducts.products.length}{" "}
          {t("products_count")}
        </p>
        {filteredProducts.products.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {filteredProducts.products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
            <div className="flex justify-center lg:col-span-3">
              <PaginationComponent totalPages={filteredProducts.totalPages} />
            </div>
          </div>
        ) : (
          <div className="bg-muted rounded-lg py-12 text-center">
            <p className="text-muted-foreground text-lg">{t("no_results")}</p>
          </div>
        )}
      </div>
    </>
  );
}
