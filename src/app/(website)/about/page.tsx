"use client";

import { useEffect, useState } from "react";
import CircularGallery from "@/components/CircularGallery";
import { useIsMobile } from "@/hooks/use-mobile";
import Image from "next/image";
import { galleryImages } from "@/data/gallery-images";
import Stack from "@/components/Stack";

export default function AboutPage() {
  const isMobile = useIsMobile();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const bendValue = isMobile ? 0.3 : 1;

  const abdouImages = [
    <Image
      key="img1"
      src="/about/abdou/el-moudir-1.jpg"
      alt="Abd El Hedi Ayed - Founder"
      width={600}
      height={600}
      className="h-full w-full object-cover pointer-events-none rounded-xl"
    />,
    <Image
      key="img2"
      src="/about/abdou/el-moudir-2.jpg"
      alt="Abd El Hedi Ayed - Beekeeping"
      width={600}
      height={600}
      className="h-full w-full object-cover pointer-events-none rounded-xl"
    />,
    <Image
      key="img3"
      src="/about/abdou/el-moudir-3.jpg"
      alt="Abd El Hedi Ayed - Nature"
      width={600}
      height={600}
      className="h-full w-full object-cover pointer-events-none rounded-xl"
    />,
    <Image
      key="img4"
      src="/about/abdou/el-moudir-4.jpg"
      alt="Abd El Hedi Ayed - Production"
      width={600}
      height={600}
      className="h-full w-full object-cover pointer-events-none rounded-xl"
    />,
  ];

  return (
    <div className="bg-background min-h-screen">
      {/* Hero Section */}
      <section className="relative px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="text-foreground mb-6 text-5xl font-bold text-balance sm:text-6xl">
            Miel Ayed : L'Authenticité avant tout
          </h1>
          <p className="text-muted-foreground text-xl">
            {"Idéale pour un design moderne et épuré"}
          </p>
        </div>
      </section>

      {/* Founder Section */}
      <section className="bg-card px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <div className="grid items-center gap-12 md:grid-cols-2">
            <div>
              <h2 className="text-card-foreground mb-6 text-3xl font-bold">
                Notre Histoire
              </h2>
              <p className="text-muted-foreground mb-4 text-lg leading-relaxed">
                Chez Miel Ayed, nous sommes fiers d'être plus que de simples
                vendeurs : nous sommes éleveurs et producteurs. Fondée par Abd
                El Hedi Ayed, notre marque est née d'une volonté simple : offrir
                un miel d'une pureté exceptionnelle, tel qu'il sort de la ruche.
              </p>
            </div>
            <div className="bg-muted relative h-80 overflow-hidden rounded-lg">
              {/* <Image
                src="/about/le_moudir.jpg"
                alt="Abd El Hedi Ayed"
                className="h-full w-full object-cover"
                fill
              /> */}

              <div className="h-full w-full p-10">
                <Stack autoplay autoplayDelay={2500} pauseOnHover={true} cards={abdouImages} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Circular Gallery Section */}
      <section className="bg-muted/30 px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-foreground mb-3 text-center text-2xl font-bold sm:mb-4 sm:text-3xl lg:text-4xl">
            Miel Ayed Around the World
          </h2>
          <p className="text-muted-foreground mb-12 text-center text-base sm:mb-16 sm:text-lg">
            {"Découvrez notre voyage à travers différents paysages et cultures"}
          </p>
          <div className="relative h-80 sm:h-96 md:h-[500px] lg:h-[600px]">
            <CircularGallery
              items={galleryImages}
              bend={bendValue}
              textColor="#000000"
              borderRadius={0.05}
              scrollEase={0.02}
              scrollSpeed={0.7}
            />
          </div>
        </div>
      </section>

      {/* Products/Why Choose Us Section */}
      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            {/* Image Side */}
            <div className="bg-muted relative order-2 h-[500px] overflow-hidden rounded-2xl lg:order-1">
              <Image
                src="/product.webp"
                alt="Miel Ayed Products"
                className="h-full w-full object-cover"
                fill
              />
            </div>

            {/* Content Side */}
            <div className="order-1 lg:order-2">
              <h2 className="text-foreground mb-8 text-4xl font-bold">
                Pourquoi choisir Miel Ayed ?
              </h2>

              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="bg-primary/10 flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full">
                    <svg
                      className="text-primary h-6 w-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-foreground mb-2 text-xl font-bold">
                      Production Artisanale
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      Tout notre miel est récolté au sein de notre propre
                      élevage d'abeilles. Nous connaissons nos ruches et nous
                      respectons leur cycle naturel.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="bg-primary/10 flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full">
                    <svg
                      className="text-primary h-6 w-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-foreground mb-2 text-xl font-bold">
                      Garantie Sans Additifs
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      Nous luttons contre les miels frelatés. Nos produits sont
                      garantis sans aucun ajout de sucre, sirop ou colorant.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="bg-primary/10 flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full">
                    <svg
                      className="text-primary h-6 w-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-foreground mb-2 text-xl font-bold">
                      Un Savoir-Faire Passionné
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      Guidés par l'expertise d'Abd El Hedi Ayed, grand
                      admirateur du monde apicole, nous privilégions la qualité
                      à la quantité.
                    </p>
                  </div>
                </div>
              </div>

              <div className="border-border mt-8 border-t pt-8">
                <p className="text-primary text-2xl font-semibold">
                  Goûtez la différence d'un miel 100% naturel
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
