import { Header } from '@/components/header'
import { HeroSection } from '@/components/hero-section'
import { HighlightedProducts } from '@/components/highlighted-products'
import { Footer } from '@/components/footer'

export default function RootPage() {
  return (
    <main>
      <Header />
      <HeroSection />
      <HighlightedProducts />
      <Footer />
    </main>
  )
}
