"use client"

import { createContext, useContext, useState, ReactNode } from "react"

interface CartItem {
  id: string
  quantity: number
}

interface CartContextType {
  items: CartItem[]
  addItem: (id: string) => void
  removeItem: (id: string) => void
  clearCart: () => void
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])

  const addItem = (id: string) => {
    setItems(currentItems => {
      const existingItem = currentItems.find(item => item.id === id)
      if (existingItem) {
        return currentItems.map(item =>
          item.id === id ? { ...item, quantity: item.quantity + 1 } : item
        )
      }
      return [...currentItems, { id, quantity: 1 }]
    })
  }

  const removeItem = (id: string) => {
    setItems(currentItems => currentItems.filter(item => item.id !== id))
  }

  const clearCart = () => {
    setItems([])
  }

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, clearCart }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}
