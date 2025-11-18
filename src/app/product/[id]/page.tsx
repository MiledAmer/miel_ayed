import { notFound } from "next/navigation";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { ProductDetail } from "@/components/product-detail";
import { Button } from "@/components/ui/button";
import { mockProducts } from "@/lib/mock-data";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { Suspense } from "react";

interface ProductPageProps {
  params: Promise<{ id: string }>;
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params;
  const product = mockProducts.find((p) => p.id === id);

  if (!product) {
    notFound();
  }

  return (
    <Suspense>
      <main>
        <Header />

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

        <Footer />
      </main>
    </Suspense>
  );
}
