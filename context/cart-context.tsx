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
  totalItems: number
  totalPrice: number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

const CART_STORAGE_KEY = "plant-shop-cart"

export function CartProvider({ children }: { children: ReactNode }) {
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

  const addToCart = (plant: Plant) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === plant.id)

      if (existingItem) {
        return prevCart.map((item) =>
          item.id === plant.id ? { ...item, quantity: Math.min(item.quantity + 1, 99) } : item
        )
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

    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === plantId ? { ...item, quantity: Math.min(quantity, 99) } : item
      )
    )
  }

  const clearCart = () => {
    setCart([])
  }

  const totalItems = cart.reduce((total, item) => total + item.quantity, 0)
  const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0)

  // Prevent flash of wrong cart state
  if (!mounted) {
    return <>{children}</>
  }

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart, totalItems, totalPrice }}
    >
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
