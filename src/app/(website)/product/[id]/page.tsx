import { notFound } from "next/navigation";
import { ProductDetail } from "@/components/product-detail";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { Suspense } from "react";
import { getProductByID } from "@/sanity/sanity-utils";
import { SimilarProducts } from "@/components/similar-products";
import type { Metadata } from 'next'
import { client } from "@/sanity/lib/client";

interface ProductPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { id } = await params;

  const product = await client.fetch<{ name: string; description: string; imageUrl: string | null } | null>(
    `*[_type == "product" && _id == $id][0]{
      name,
      description,
      "imageUrl": image.asset->url
    }`,
    { id }
  );

  if (!product) {
    return { title: 'Produit non trouvé' };
  }

  return {
    title: product.name,
    description: product.description,
    openGraph: {
      title: product.name,
      description: product.description,
      images: product.imageUrl ? [product.imageUrl] : undefined,
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
        <SimilarProducts productId={product._id} categoryId={product.category._id} />
      </main>
    </Suspense>
  );
}
