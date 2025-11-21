import { notFound } from "next/navigation";
import { ProductDetail } from "@/components/product-detail";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { Suspense } from "react";
import { getProductByID } from "@/sanity/sanity-utils";

interface ProductPageProps {
  params: Promise<{ id: string }>;
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
      </main>
    </Suspense>
  );
}
