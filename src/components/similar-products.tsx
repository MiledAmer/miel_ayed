import { getSimilarProducts } from "@/sanity/sanity-utils";
import { ProductCard } from "./product-card";
import { getTranslations } from "next-intl/server";

interface SimilarProductsProps {
  productId: string;
  categoryId: string;
}

export async function SimilarProducts({
  productId,
  categoryId,
}: SimilarProductsProps) {
  const t = await getTranslations("ProductsPage");
  const similarProducts = await getSimilarProducts(productId, categoryId, 4);

  if (similarProducts.length === 0) {
    return null;
  }

  return (
    <section className="mt-16 py-12 border-t">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold mb-8">{t("similar_products") || "Similar Products"}</h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {similarProducts.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
