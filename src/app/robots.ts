export default function robots() {
  const host = 'https://mielayed.com'

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/studio',          // Sanity CMS studio
          '/ruche-doree',     // Easter egg / secret page
          '/checkout',        // si tu veux pas indexer panier/checkout
        ],
      },
    ],
    sitemap: `${host}/sitemap.xml`,
    host,
  }
}
