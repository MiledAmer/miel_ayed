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
  selectedVariant: ProductVariant;
  image: SanityImageSource;
  category: {
    _id: string;
    name: {
      en: string;
      fr: string;
      ar: string;
    };
    slug: {
      current: string;
    };
  };
  subcategory?: {
    _id: string;
    name: {
      en: string;
      fr: string;
      ar: string;
    };
    slug: {
      current: string;
    };
  };
}

export type ProductVariant = {
  _key?: string;
  weight: string;
  price: number;
  availability: boolean;
}