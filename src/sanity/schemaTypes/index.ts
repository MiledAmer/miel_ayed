import { type SchemaTypeDefinition } from 'sanity'
import productType from './product-type'
import categoryType from './category-type'
import subcategoryType from './subcategory-type'
import orderType from './order-type'
import messageType from './message-type'
import prizeType from './prize-type'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [productType, categoryType, subcategoryType, orderType, messageType, prizeType],
}
