import type { MetadataRoute } from 'next'
import { client } from '../sanity/lib/client'

// GROQ query for all indexable products
const query = `
  {
    "products": *[_type == "product"]._id
  }
`

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const data = await client.fetch<{ products: string[] }>(query)

  const baseUrl = 'https://mielayed.com'

  const productURLs = (data.products || []).map((id: string) => ({
    url: `${baseUrl}/product/${id}`,
    lastModified: new Date().toISOString(),
  }))

  // Static pages
  const staticPages = [
    '/about',
    '/contact',
    '/products',
    '/cart',
    '/checkout',
  ].map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date().toISOString(),
  }))

  return [
    {
      url: baseUrl,
      lastModified: new Date().toISOString(),
    },
    ...staticPages,
    ...productURLs,
  ]
}
