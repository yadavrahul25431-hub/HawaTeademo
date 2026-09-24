import { create } from 'zustand'

export type OrderItem = {
  menu_item_id: string
  name: string
  quantity: number
  unit_price: number
  notes?: string
}

interface CartState {
  items: OrderItem[]
  addItem: (item: OrderItem) => void
  removeItem: (menu_item_id: string) => void
  updateQuantity: (menu_item_id: string, quantity: number) => void
  clearCart: () => void
  getTotal: () => number
}

export const useCartStore = create<CartState>((set, get) => ({
  items: [],
  addItem: (newItem) => set((state) => {
    const existing = state.items.find(i => i.menu_item_id === newItem.menu_item_id)
    if (existing) {
      return {
        items: state.items.map(i => 
          i.menu_item_id === newItem.menu_item_id 
            ? { ...i, quantity: i.quantity + newItem.quantity }
            : i
        )
      }
    }
    return { items: [...state.items, newItem] }
  }),
  removeItem: (id) => set((state) => ({
    items: state.items.filter(i => i.menu_item_id !== id)
  })),
  updateQuantity: (id, quantity) => set((state) => ({
    items: state.items.map(i => 
      i.menu_item_id === id 
        ? { ...i, quantity }
        : i
    )
  })),
  clearCart: () => set({ items: [] }),
  getTotal: () => {
    return get().items.reduce((total, item) => total + (item.unit_price * item.quantity), 0)
  }
}))
