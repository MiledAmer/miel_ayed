import { HeroSection } from "@/components/hero-section";
import { HighlightedProducts } from "@/components/highlighted-products";

export default async function RootPage() {
  return (
    <main className="bg-background">
      <HeroSection />
      <HighlightedProducts />
    </main>
  );
}
