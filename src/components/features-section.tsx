import { getTranslations } from "next-intl/server";

export default async function FeaturesSection() {
  const t = await getTranslations("HomePage.FeaturesSection");

  return (
    <section className="bg-secondary py-12 text-white sm:py-16 md:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid grid-cols-1 gap-8 sm:gap-12 md:grid-cols-3">
          <div className="text-center">
            <div className="mb-3 font-serif text-3xl sm:mb-4 sm:text-4xl">
              🍯
            </div>
            <h3 className="mb-2 text-lg font-semibold sm:text-xl">
              {t("pure_honey_title")}
            </h3>
            <p className="text-sm text-amber-100 sm:text-base">
              {t("pure_honey_desc")}
            </p>
          </div>
          <div className="text-center">
            <div className="mb-3 font-serif text-3xl sm:mb-4 sm:text-4xl">
              🌿
            </div>
            <h3 className="mb-2 text-lg font-semibold sm:text-xl">
              {t("natural_title")}
            </h3>
            <p className="text-sm text-amber-100 sm:text-base">
              {t("natural_desc")}
            </p>
          </div>
          <div className="text-center">
            <div className="mb-3 font-serif text-3xl sm:mb-4 sm:text-4xl">
              🚚
            </div>
            <h3 className="mb-2 text-lg font-semibold sm:text-xl">
              {t("fast_delivery_title")}
            </h3>
            <p className="text-sm text-amber-100 sm:text-base">
              {t("fast_delivery_desc")}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
