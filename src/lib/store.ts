import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Product, ProductVariant } from '@/sanity/types/products'

export interface CartItem {
  id: string
  product: Product
  variant: ProductVariant
  quantity: number
}

interface CartStore {
  items: CartItem[]
  addItem: (product: Product, variant: ProductVariant, quantity: number) => void
  removeItem: (itemId: string) => void
  updateQuantity: (itemId: string, quantity: number) => void
  clearCart: () => void
  getTotal: () => number
}

export const useCart = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (product: Product, variant: ProductVariant, quantity: number) => {
        set((state) => {
          const itemId = `${product._id}-${variant._key}`
          const existingItem = state.items.find((item) => item.id === itemId)
          
          if (existingItem) {
            return {
              items: state.items.map((item) =>
                item.id === itemId
                  ? { ...item, quantity: item.quantity + quantity }
                  : item
              ),
            }
          }
          return {
            items: [...state.items, { id: itemId, product, variant, quantity }],
          }
        })
      },
      removeItem: (itemId: string) => {
        set((state) => ({
          items: state.items.filter((item) => item.id !== itemId),
        }))
      },
      updateQuantity: (itemId: string, quantity: number) => {
        if (quantity <= 0) {
          get().removeItem(itemId)
          return
        }
        set((state) => ({
          items: state.items.map((item) =>
            item.id === itemId ? { ...item, quantity } : item
          ),
        }))
      },
      clearCart: () => set({ items: [] }),
      getTotal: () => {
        return get().items.reduce((total, item) => total + (item.variant.price * item.quantity), 0)
      },
    }),
    {
      name: 'cart-storage',
    }
  )
)
