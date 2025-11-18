'use client'

import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { useLanguage } from '@/hooks/use-language'
import { Heart, Leaf, Users } from 'lucide-react'

const translations = {
  en: {
    title: 'About Miel Ayed',
    intro: 'Welcome to Miel Ayed, where tradition meets quality in every drop of honey.',
    story_title: 'Our Story',
    story_desc: 'Founded with a passion for authentic Tunisian honey, Miel Ayed represents generations of beekeeping expertise. We believe in sustainable practices and the pure quality of natural products. Each jar of honey is a testament to our commitment to excellence.',
    mission_title: 'Our Mission',
    mission_desc: 'To provide the world with the finest honey and bee products from Tunisia, while supporting sustainable beekeeping practices and preserving traditional methods.',
    values_title: 'Our Values',
    quality: 'Quality',
    quality_desc: 'We use only the finest ingredients and maintain strict quality standards in every product.',
    sustainability: 'Sustainability',
    sustainability_desc: 'Our beekeeping practices support environmental conservation and bee population health.',
    community: 'Community',
    community_desc: 'We work closely with local beekeepers and support the communities we source from.',
  },
  fr: {
    title: 'À Propos de Miel Ayed',
    intro: 'Bienvenue chez Miel Ayed, où la tradition rencontre la qualité dans chaque goutte de miel.',
    story_title: 'Notre Histoire',
    story_desc: 'Fondée avec une passion pour le miel tunisien authentique, Miel Ayed représente des générations d\'expertise apicole. Nous croyons aux pratiques durables et à la pureté des produits naturels. Chaque pot de miel témoigne de notre engagement envers l\'excellence.',
    mission_title: 'Notre Mission',
    mission_desc: 'Fournir au monde les meilleurs miels et produits apicoles de Tunisie, tout en soutenant les pratiques apicoles durables et en préservant les méthodes traditionnelles.',
    values_title: 'Nos Valeurs',
    quality: 'Qualité',
    quality_desc: 'Nous n\'utilisons que les meilleurs ingrédients et maintenons des normes de qualité strictes dans chaque produit.',
    sustainability: 'Durabilité',
    sustainability_desc: 'Nos pratiques apicoles soutiennent la conservation de l\'environnement et la santé de la population des abeilles.',
    community: 'Communauté',
    community_desc: 'Nous travaillons en étroite collaboration avec les apiculteurs locaux et soutenons les communautés d\'où nous provenons.',
  },
  ar: {
    title: 'عن عسل عياد',
    intro: 'مرحبا بك في عسل عياد، حيث يلتقي التقليد بالجودة في كل قطرة عسل.',
    story_title: 'قصتنا',
    story_desc: 'تأسست برغبة في العسل التونسي الأصلي، تمثل عسل عياد أجيالاً من الخبرة في تربية النحل. نحن نؤمن بالممارسات المستدامة وطهارة المنتجات الطبيعية. كل جرة عسل هي شهادة على التزامنا بالتميز.',
    mission_title: 'مهمتنا',
    mission_desc: 'توفير أفضل العسل ومنتجات النحل من تونس للعالم، مع دعم ممارسات تربية النحل المستدامة والحفاظ على الأساليب التقليدية.',
    values_title: 'قيمنا',
    quality: 'الجودة',
    quality_desc: 'نستخدم فقط أفضل المكونات والحفاظ على معايير جودة صارمة في كل منتج.',
    sustainability: 'الاستدامة',
    sustainability_desc: 'تدعم ممارسات تربية النحل لدينا الحفاظ على البيئة وصحة تجمع النحل.',
    community: 'المجتمع',
    community_desc: 'نعمل بتعاون وثيق مع مربي النحل المحليين وندعم المجتمعات التي نحصل منها على المنتجات.',
  },
}

export default function AboutPage() {
  const { language, mounted } = useLanguage()

  if (!mounted) return null

  const t = translations[language as keyof typeof translations] || translations.fr
  const isRTL = language === 'ar'

  return (
    <main className={isRTL ? 'rtl' : 'ltr'} dir={isRTL ? 'rtl' : 'ltr'}>
      <Header />

      <div className="container mx-auto px-4 py-12">
        {/* Hero */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4 text-balance">
            {t.title}
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
            {t.intro}
          </p>
        </div>

        {/* Story Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-primary mb-6">{t.story_title}</h2>
          <p className="text-lg text-muted-foreground leading-relaxed max-w-3xl">
            {t.story_desc}
          </p>
        </section>

        {/* Mission Section */}
        <section className="mb-16 bg-cream rounded-lg p-8">
          <h2 className="text-3xl font-bold text-primary mb-6">{t.mission_title}</h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            {t.mission_desc}
          </p>
        </section>

        {/* Values Section */}
        <section>
          <h2 className="text-3xl font-bold text-primary mb-12 text-center">{t.values_title}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Quality */}
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <div className="p-4 bg-accent/10 rounded-full">
                  <Heart className="w-8 h-8 text-accent" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">{t.quality}</h3>
              <p className="text-muted-foreground">{t.quality_desc}</p>
            </div>

            {/* Sustainability */}
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <div className="p-4 bg-accent/10 rounded-full">
                  <Leaf className="w-8 h-8 text-accent" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">{t.sustainability}</h3>
              <p className="text-muted-foreground">{t.sustainability_desc}</p>
            </div>

            {/* Community */}
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <div className="p-4 bg-accent/10 rounded-full">
                  <Users className="w-8 h-8 text-accent" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">{t.community}</h3>
              <p className="text-muted-foreground">{t.community_desc}</p>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </main>
  )
}
