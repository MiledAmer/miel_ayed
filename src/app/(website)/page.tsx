import FeaturesSection from "@/components/features-section";
import { HeroSection } from "@/components/hero-section";
import { HighlightedProducts } from "@/components/highlighted-products";
import TopSales from "@/components/top-sales";
import { getFilteredProducts } from "@/sanity/sanity-utils";

export default async function RootPage() {
  const data = await getFilteredProducts({
    page: 1,
    pageSize: 8,
  })
  return (
    <main className="bg-background">
      <HeroSection />
      <TopSales products={data.products} />
      <FeaturesSection />
      <HighlightedProducts products={data.products.slice(0, 4)} />
    </main>
  );
}
