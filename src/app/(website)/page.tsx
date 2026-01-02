import FeaturedCollection from "@/components/featured-collection";
import FeaturesSection from "@/components/features-section";
import { HeroSection } from "@/components/hero-section";

export default async function RootPage() {
  return (
    <main className="bg-background">
      <HeroSection />
      {/* <TopSales products={topSalesData.products} /> */}
      <FeaturesSection />
      <FeaturedCollection />
    </main>
  );
}
