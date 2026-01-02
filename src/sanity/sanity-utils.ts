import { groq } from "next-sanity";
import { client } from "@/sanity/lib/client";
import type { Product } from "./types/products";
import type { Category, Subcategory } from "./types/categories";
import imageUrlBuilder from "@sanity/image-url";
import type { ImageUrlBuilder } from "sanity";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";

interface ProductFilters {
  isTopSale?: boolean;
  categorySlug?: string;
  subcategorySlug?: string;
  page?: number;
  pageSize?: number;
}

interface PaginatedProducts {
  products: Product[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export async function getFilteredProducts(
  filters: ProductFilters = {},
): Promise<PaginatedProducts> {
  const { categorySlug, subcategorySlug, page = 1, pageSize = 12 } = filters;

  // Calculate pagination
  const start = (page - 1) * pageSize;
  const end = start + pageSize;

  // Build filter conditions
  let filterConditions = "";

  if (filters.isTopSale) {
    filterConditions += ` && isTopSale == true`;
  }

  if (categorySlug) {
    filterConditions += ` && category->slug.current == "${categorySlug}"`;
  }

  if (subcategorySlug) {
    filterConditions += ` && subcategory->slug.current == "${subcategorySlug}"`;
  }

  // Query for products with filters
  const productsQuery = groq`
    *[_type == "product"${filterConditions}] | order(_createdAt desc) [${start}...${end}] {
      _id,
      title,
      description,
      variants,
      image,
      selectedVariant,
      category-> {
        _id,
        name,
        slug
      },
      subcategory-> {
        _id,
        name,
        slug
      }
    }
  `;

  // Query for total count
  const countQuery = groq`
    count(*[_type == "product"${filterConditions}])
  `;

  // Execute queries in parallel
  const [products, total] = await Promise.all([
    client.fetch<Product[]>(productsQuery),
    client.fetch<number>(countQuery),
  ]);

  return {
    products,
    total,
    page,
    pageSize,
    totalPages: Math.ceil(total / pageSize),
  };
}

export async function getCategoriesWithSubcategories(): Promise<Category[]> {
  const query = groq`
    *[_type == "category"] | order(name.en asc) {
      _id,
      name,
      slug,
      subcategories[]-> {
        _id,
        name,
        slug
      }
    }
  `;

  const categories = await client.fetch<Category[]>(query);
  return categories;
}
export async function getProductByID(id: string): Promise<Product | null> {
  const query = groq`
    *[_type == "product" && _id == $id][0] {
      _id,
      title,
      description,
      variants,
      image,
      selectedVariant,
      category-> {
        _id,
        name,
        slug
      },
      subcategory-> {
        _id,
        name,
        slug
      }
    }
  `;

  const product = await client.fetch<Product | null>(query, { id });
  return product;
}

export function getTranslatedCategoryName(
  category: Category,
  locale: string,
): string {
  switch (locale) {
    case "fr":
      return category.name.fr;
    case "ar":
      return category.name.ar;
    case "en":
    default:
      return category.name.en;
  }
}

export function getTranslatedSubcategoryName(
  subcategory: Subcategory,
  locale: string,
): string {
  switch (locale) {
    case "fr":
      return subcategory.name.fr;
    case "ar":
      return subcategory.name.ar;
    case "en":
    default:
      return subcategory.name.en;
  }
}

export function urlFor(source: SanityImageSource): ImageUrlBuilder | null {
  try {
    return imageUrlBuilder(client).image(source);
  } catch {
    return null;
  }
}

export interface CategoryWithProducts extends Category {
  products: Product[];
}

export async function getLandingPageTopSales(): Promise<CategoryWithProducts[]> {
  const query = groq`
    *[_type == "category" && LandingPageTopSales == true] {
      _id,
      name,
      slug,
      LandingPageTopSales,
      "products": *[_type == "product" && category._ref == ^._id && isTopSale == true] {
        _id,
        title,
        description,
        variants,
        image,
        images,
        selectedVariant,
        category-> {
          _id,
          name,
          slug
        },
        subcategory-> {
          _id,
          name,
          slug
        }
      }
    }
  `;

  return client.fetch(query);
}