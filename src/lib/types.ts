export interface Product {
  id: string
  nameEn: string
  nameFr: string
  nameAr: string
  descriptionEn: string
  descriptionFr: string
  descriptionAr: string
  price: number
  image: string
  category: string
  subcategory?: string
}

export interface CartItem {
  id: string
  product: Product
  quantity: number
}

export interface Cart {
  items: CartItem[]
  total: number
}

export type Language = 'en' | 'fr' | 'ar'

export const CATEGORIES = [
  {
    name: 'Miel organique',
    slug: 'organic-honey',
    subcategories: ['Acacia', 'Eucalyptus', 'Multi-fleur']
  },
  {
    name: 'Mélanges',
    slug: 'mixes',
    subcategories: ['Miel & Gingembre', 'Miel & Citron']
  },
  {
    name: 'Bsisa',
    slug: 'bsisa',
    subcategories: []
  },
  {
    name: 'Produits divers de miel',
    slug: 'diverse',
    subcategories: ['Pollen', 'Propolis']
  }
]
