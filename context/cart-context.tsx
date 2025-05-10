"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import dynamic from 'next/dynamic'

export type Pistachio = {
  id: number
  name: string
  description: string
  price: number
  image: string
  rating: number
  category: string
}

export type CartItem = Pistachio & {
  quantity: number
}

type CartContextType = {
  cart: CartItem[]
  addToCart: (pistachio: Pistachio) => void
  removeFromCart: (pistachioId: number) => void
  updateQuantity: (pistachioId: number, quantity: number) => void
  clearCart: () => void
  totalItems: number
  totalPrice: number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

const CART_STORAGE_KEY = "pistachio-shop-cart"

function CartProviderComponent({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([])
  const [mounted, setMounted] = useState(false)

  // Load cart from localStorage on initial render
  useEffect(() => {
    setMounted(true)
    try {
      const savedCart = localStorage.getItem(CART_STORAGE_KEY)
      if (savedCart) {
        const parsedCart = JSON.parse(savedCart)
        if (Array.isArray(parsedCart)) {
          setCart(parsedCart)
        }
      }
    } catch (error) {
      console.error("Failed to load cart from localStorage:", error)
      localStorage.removeItem(CART_STORAGE_KEY)
    }
  }, [])

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    if (!mounted) return
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart))
    } catch (error) {
      console.error("Failed to save cart to localStorage:", error)
    }
  }, [cart, mounted])

  const addToCart = (pistachio: Pistachio) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === pistachio.id)

      if (existingItem) {
        return prevCart.map((item) =>
          item.id === pistachio.id ? { ...item, quantity: Math.min(item.quantity + 1, 99) } : item
        )
      } else {
        return [...prevCart, { ...pistachio, quantity: 1 }]
      }
    })
  }

  const removeFromCart = (pistachioId: number) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== pistachioId))
  }

  const updateQuantity = (pistachioId: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(pistachioId)
      return
    }

    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === pistachioId ? { ...item, quantity: Math.min(quantity, 99) } : item
      )
    )
  }

  const clearCart = () => {
    setCart([])
  }

  const totalItems = cart.reduce((total, item) => total + item.quantity, 0)
  const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0)

  const value = {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    totalItems,
    totalPrice
  }

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  )
}

// Export a dynamically imported version of the CartProvider
export const CartProvider = dynamic(() => Promise.resolve(CartProviderComponent), {
  ssr: false
})

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}
