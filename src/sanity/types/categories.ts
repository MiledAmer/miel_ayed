export type Subcategory = {
  _id: string;
  name: {
    en: string;
    fr: string;
    ar: string;
  };
  slug: {
    current: string;
  };
}

export type Category = {
  _id: string;
  LandingPageTopSales: boolean;
  name: {
    en: string;
    fr: string;
    ar: string;
  };
  slug: {
    current: string;
  };
  subcategories: Subcategory[] | null;
}