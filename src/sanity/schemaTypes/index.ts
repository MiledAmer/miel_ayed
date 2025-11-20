import { type SchemaTypeDefinition } from 'sanity'
import productType from './product-type'
import categoryType from './category-type'
import subcategoryType from './subcategory-type'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [productType, categoryType, subcategoryType],
}
