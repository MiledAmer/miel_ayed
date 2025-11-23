import { HeroSection } from "@/components/hero-section";
import { HighlightedProducts } from "@/components/highlighted-products";
import { getFilteredProducts } from "@/sanity/sanity-utils";

export default async function RootPage() {
  const data = await getFilteredProducts({
    page: 1,
    pageSize: 4,
  })
  console.log("Highlighted products data:", data);
  return (
    <main className="bg-background">
      <HeroSection />
      <HighlightedProducts products={data.products} />
    </main>
  );
}
