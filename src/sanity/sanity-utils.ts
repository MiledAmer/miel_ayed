import { groq } from "next-sanity";
import { client } from "@/sanity/lib/client";
import type { Product } from "./types/products";
import type { Category } from "./types/categories";
// import imageUrlBuilder from "@sanity/image-url";


interface ProductFilters {
  categoryId?: string;
  subcategoryIds?: string[];
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
  filters: ProductFilters = {}
): Promise<PaginatedProducts> {
  const { categoryId, subcategoryIds, page = 1, pageSize = 12 } = filters;

  // Calculate pagination
  const start = (page - 1) * pageSize;
  const end = start + pageSize;

  // Build filter conditions
  let filterConditions = "";

  if (categoryId) {
    // Filter by category (products that have subcategories belonging to this category)
    filterConditions += ` && count((subcategories[]->_id)[@ in *[_type == "category" && _id == "${categoryId}"].subcategories[]->_id]) > 0`;
  }

  if (subcategoryIds && subcategoryIds.length > 0) {
    // Filter by specific subcategories
    const subcategoryFilter = subcategoryIds.map((id) => `"${id}"`).join(", ");
    filterConditions += ` && count((subcategories[]->_id)[@ in [${subcategoryFilter}]]) > 0`;
  }

  // Query for products with filters
  const productsQuery = groq`
    *[_type == "product"${filterConditions}] | order(_createdAt desc) [${start}...${end}] {
      _id,
      title,
      description,
      variants,
      image,
      subcategories[]-> {
        _id,
        name
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