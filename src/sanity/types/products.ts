import type { SanityImageSource } from "@sanity/image-url/lib/types/types";

export type Product = {
  _id: string;
  title: {
    en: string;
    fr: string;
    ar: string;
  };
  description: {
    en: string;
    fr: string;
    ar: string;
  };
  variants: ProductVariant[];
  image: SanityImageSource;
  subcategories: Array<{
    _id: string;
    name: {
      en: string;
      fr: string;
      ar: string;
    };
  }>;
}

export type ProductVariant = {
  weight: string;
  price: number;
  availability: boolean;
}