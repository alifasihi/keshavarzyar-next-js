"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

export type Plant = {
  id: number
  name: string
  description: string
  price: number
  image: string
  rating: number
  category: string
}

export type CartItem = Plant & {
  quantity: number
}

type CartContextType = {
  cart: CartItem[]
  addToCart: (plant: Plant) => void
  removeFromCart: (plantId: number) => void
  updateQuantity: (plantId: number, quantity: number) => void
  clearCart: () => void
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([])

  // Load cart from localStorage on initial render
  useEffect(() => {
    const savedCart = localStorage.getItem("cart")
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart))
      } catch (error) {
        console.error("Failed to parse cart from localStorage:", error)
      }
    }
  }, [])

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart))
  }, [cart])

  const addToCart = (plant: Plant) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === plant.id)

      if (existingItem) {
        return prevCart.map((item) => (item.id === plant.id ? { ...item, quantity: item.quantity + 1 } : item))
      } else {
        return [...prevCart, { ...plant, quantity: 1 }]
      }
    })
  }

  const removeFromCart = (plantId: number) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== plantId))
  }

  const updateQuantity = (plantId: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(plantId)
      return
    }

    setCart((prevCart) => prevCart.map((item) => (item.id === plantId ? { ...item, quantity } : item)))
  }

  const clearCart = () => {
    setCart([])
  }

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart }}>
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
