export default function FeaturesSection() {
  return (
    <section className="bg-secondary py-12 text-white sm:py-16 md:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid grid-cols-1 gap-8 sm:gap-12 md:grid-cols-3">
          <div className="text-center">
            <div className="mb-3 font-serif text-3xl sm:mb-4 sm:text-4xl">
              🍯
            </div>
            <h3 className="mb-2 text-lg font-semibold sm:text-xl">Miel Pur</h3>
            <p className="text-sm text-amber-100 sm:text-base">
              Sans additifs, sans transformation, directement de la ruche
            </p>
          </div>
          <div className="text-center">
            <div className="mb-3 font-serif text-3xl sm:mb-4 sm:text-4xl">
              🌿
            </div>
            <h3 className="mb-2 text-lg font-semibold sm:text-xl">
              Biologique
            </h3>
            <p className="text-sm text-amber-100 sm:text-base">
              Certifié biologique, respectant l&apos;environnement
            </p>
          </div>
          <div className="text-center">
            <div className="mb-3 font-serif text-3xl sm:mb-4 sm:text-4xl">
              🚚
            </div>
            <h3 className="mb-2 text-lg font-semibold sm:text-xl">
              Livraison Rapide
            </h3>
            <p className="text-sm text-amber-100 sm:text-base">
              Livré frais chez vous dans les meilleurs délais
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
