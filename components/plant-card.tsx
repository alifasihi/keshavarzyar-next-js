"use client"

import type React from "react"

import Image from "next/image"
import { Star, ShoppingCart } from "lucide-react"
import Link from "next/link"
import { type Plant, useCart } from "@/context/cart-context"

type PlantCardProps = {
  plant: Plant
  size?: "small" | "medium" | "large"
}

export default function PlantCard({ plant, size = "medium" }: PlantCardProps) {
  const { addToCart } = useCart()

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    addToCart(plant)
  }

  if (size === "small") {
    return (
      <div className="bg-[var(--card)] rounded-2xl overflow-hidden p-4 space-y-3 transition-transform hover:scale-105 theme-transition plant-card-shadow">
        <Link href={`/shop/${plant.id}`} className="block">
          <div className="relative h-[120px] w-full">
            <Image src={plant.image || "/placeholder.svg"} alt={plant.name} fill className="object-cover" />
          </div>
          <div>
            <h3 className="font-medium text-sm">{plant.name}</h3>
            <p className="text-xs text-[var(--muted-foreground)]">{plant.description.substring(0, 20)}...</p>
          </div>
          <div className="flex justify-between items-center">
            <p className="font-bold text-sm">Rs. {plant.price}</p>
            <div className="flex items-center gap-1">
              <Star className="w-3 h-3 fill-[var(--accent)] text-[var(--accent)]" />
              <span className="text-xs">{plant.rating}</span>
            </div>
          </div>
        </Link>
      </div>
    )
  }

  if (size === "large") {
    return (
      <div className="bg-[var(--card)] rounded-2xl overflow-hidden p-6 transition-transform hover:scale-105 theme-transition plant-card-shadow">
        <Link href={`/shop/${plant.id}`} className="block">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="relative h-[200px] w-full md:w-[200px]">
              <Image src={plant.image || "/placeholder.svg"} alt={plant.name} fill className="object-cover" />
            </div>
            <div className="flex-1 space-y-4">
              <h3 className="font-medium">{plant.name}</h3>
              <p className="text-sm text-[var(--muted-foreground)]">{plant.description}</p>
              <div className="flex justify-between items-center">
                <p className="font-bold">Rs. {plant.price}</p>
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-[var(--accent)] text-[var(--accent)]" />
                  <span className="text-sm">{plant.rating}</span>
                </div>
              </div>
              <button
                onClick={handleAddToCart}
                className="border border-[var(--accent)] text-[var(--accent)] px-4 py-2 rounded-full font-medium hover:bg-[var(--accent)]/10 transition-colors text-sm flex items-center gap-2"
              >
                <ShoppingCart className="w-4 h-4" />
                افزودن به سبد خرید
              </button>
            </div>
          </div>
        </Link>
      </div>
    )
  }

  // Default medium size
  return (
    <div className="bg-[var(--card)] rounded-2xl overflow-hidden p-6 space-y-4 transition-transform hover:scale-105 theme-transition plant-card-shadow">
      <Link href={`/shop/${plant.id}`} className="block">
        <div className="relative h-[200px] w-full">
          <Image src={plant.image || "/placeholder.svg"} alt={plant.name} fill className="object-cover" />
        </div>
        <div>
          <h3 className="font-medium">{plant.name}</h3>
          <p className="text-sm text-[var(--muted-foreground)]">{plant.description.substring(0, 40)}...</p>
        </div>
        <div className="flex justify-between items-center">
          <p className="font-bold">Rs. {plant.price}</p>
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 fill-[var(--accent)] text-[var(--accent)]" />
            <span className="text-sm">{plant.rating}</span>
          </div>
        </div>
        <button
          onClick={handleAddToCart}
          className="w-full border border-[var(--accent)] text-[var(--accent)] px-4 py-2 rounded-full font-medium accent-hover transition-colors text-sm flex items-center justify-center gap-2"
        >
          <ShoppingCart className="w-4 h-4" />
          افزودن به سبد خرید
        </button>
      </Link>
    </div>
  )
}
