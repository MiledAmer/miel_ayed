import { groq } from "next-sanity";
import { client } from "@/sanity/lib/client";
import type { Product } from "./types/products";
import type { Category, Subcategory } from "./types/categories";
import imageUrlBuilder from "@sanity/image-url";
import type { ImageUrlBuilder } from "sanity";

interface ProductFilters {
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

  if (categorySlug) {
    // Filter by category (products that have subcategories belonging to this category)
    filterConditions += ` && count((subcategories[]->_id)[@ in *[_type == "category" && slug.current == "${categorySlug}"].subcategories[]->_id]) > 0`;
  }

  if (subcategorySlug) {
    // Filter by specific subcategories
    filterConditions += ` && count((subcategories[]->_id)[@ in *[_type == "subcategory" && slug.current == "${subcategorySlug}"]._id]) > 0`;
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

// eslint-disable-next-line
export function urlFor(source: any): ImageUrlBuilder {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return imageUrlBuilder(client).image(source);
}