import { notFound } from "next/navigation";
import { ProductDetail } from "@/components/product-detail";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { Suspense } from "react";
import { getProductByID, urlFor } from "@/sanity/sanity-utils";
import { SimilarProducts } from "@/components/similar-products";
import type { Metadata } from "next";
import { client } from "@/sanity/lib/client";
import type { Product } from "@/sanity/types/products";

interface ProductPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { id } = await params;

  const product = await client.fetch<Product | null>(
    `*[_type == "product" && _id == $id][0]{
      name,
      description,
      image
    }`,
    { id },
  );

  if (!product) {
    return { title: "Produit non trouvé" };
  }

  const imageUrl = product.image ? urlFor(product.image)?.url() : null;

  return {
    title: product.title.fr,
    description: product.description.fr,
    openGraph: {
      title: product.title.fr,
      description: product.description.fr,
      images: imageUrl ? [imageUrl] : undefined,
    },
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params;
  const product = await getProductByID(id);

  if (!product) {
    notFound();
  }

  return (
    <Suspense>
      <main>
        <div className="container mx-auto px-4 py-12">
          {/* Back Button */}
          <Link href="/products">
            <Button variant="ghost" className="mb-8">
              <ChevronLeft className="mr-2 h-4 w-4" />
              Back to Products
            </Button>
          </Link>

          {/* Product Detail */}
          <ProductDetail product={product} />
        </div>

        {/* Similar Products Section */}
        <SimilarProducts
          productId={product._id}
          categoryId={product.category._id}
        />
      </main>
    </Suspense>
  );
}
