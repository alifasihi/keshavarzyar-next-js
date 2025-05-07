"use client"

import React, { useState } from "react"
import Image from "next/image"
import { Star, ShoppingCart } from "lucide-react"
import Link from "next/link"
import { type Plant, useCart } from "@/context/cart-context"
import pic1 from "/public/image/pic1.svg"
import pic2 from "/public/image/pic2.svg"
import pic3 from "/public/image/pic3.svg"
import pic4 from "/public/image/pic4.svg"
import pic5 from "/public/image/pic5.svg"
import pic6 from "/public/image/pic6.svg"

type PlantCardProps = {
  plant: Plant
  size?: "small" | "medium" | "large"
  index?: number
}

const images = [pic1, pic2, pic3, pic4, pic5, pic6]

export default function PlantCard({ plant, size = "medium", index = 0 }: PlantCardProps) {
  const { addToCart } = useCart()
  const [imageError, setImageError] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    addToCart(plant)
  }

  const handleImageError = () => {
    setImageError(true)
    setIsLoading(false)
  }

  const handleImageLoad = () => {
    setIsLoading(false)
  }

  const fallbackImage = images[index % images.length]
  const imageSrc = imageError ? "/image/main-pic.svg" : (plant.image || fallbackImage)

  // --- SMALL ---
  if (size === "small") {
    return (
      <div className="bg-[var(--card)] rounded-2xl overflow-hidden p-4 space-y-2 transition-transform hover:scale-105 theme-transition plant-card-shadow">
        <Link href={`/shop/${plant.id}`} className="block">
          <div className="relative h-[120px] w-full rounded-lg overflow-hidden bg-[var(--muted)]">
            {isLoading && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-6 h-6 border-2 border-[var(--accent)] border-t-transparent rounded-full animate-spin" />
              </div>
            )}
            <Image
              src={imageSrc}
              alt={plant.name}
              fill
              className={`object-contain ${isLoading ? 'opacity-0' : 'opacity-100'} transition-opacity`}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              onError={handleImageError}
              onLoad={handleImageLoad}
              priority={false}
            />
          </div>
          <div className="mt-2">
            <h3 className="font-medium text-sm line-clamp-1">{plant.name}</h3>
            <p className="text-xs text-[var(--muted-foreground)] line-clamp-2 mt-1">{plant.description}</p>
          </div>
          <div className="flex justify-between items-center mt-2">
            <p className="font-bold text-sm">Rs. {plant.price.toLocaleString()}</p>
            <div className="flex items-center gap-1">
              <Star className="w-3 h-3 fill-[var(--accent)] text-[var(--accent)]" />
              <span className="text-xs">{plant.rating.toFixed(1)}</span>
            </div>
          </div>
        </Link>
      </div>
    )
  }

  // --- LARGE ---
  if (size === "large") {
    return (
      <div className="bg-[var(--card)] rounded-2xl overflow-hidden p-6 transition-transform hover:scale-105 theme-transition plant-card-shadow">
        <Link href={`/shop/${plant.id}`} className="block">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="relative h-[200px] w-full md:w-[200px] rounded-lg overflow-hidden bg-[var(--muted)]">
              {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-8 h-8 border-2 border-[var(--accent)] border-t-transparent rounded-full animate-spin" />
                </div>
              )}
              <Image
                src={imageSrc}
                alt={plant.name}
                fill
                className={`object-contain ${isLoading ? 'opacity-0' : 'opacity-100'} transition-opacity`}
                sizes="(max-width: 768px) 100vw, 200px"
                onError={handleImageError}
                onLoad={handleImageLoad}
                priority={false}
              />
            </div>
            <div className="flex-1 space-y-3">
              <h3 className="font-medium text-lg">{plant.name}</h3>
              <p className="text-sm text-[var(--muted-foreground)] line-clamp-3">{plant.description}</p>
              <div className="flex justify-between items-center">
                <p className="font-bold text-lg">Rs. {plant.price.toLocaleString()}</p>
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-[var(--accent)] text-[var(--accent)]" />
                  <span className="text-sm">{plant.rating.toFixed(1)}</span>
                </div>
              </div>
              <button
                onClick={handleAddToCart}
                className="border border-[var(--accent)] text-[var(--accent)] px-4 py-2 rounded-full font-medium hover:bg-[var(--accent)]/10 transition-colors text-sm flex items-center gap-2 w-fit"
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

  // --- DEFAULT (medium) ---
  return (
    <div className="bg-[var(--card)] rounded-2xl overflow-hidden p-4 space-y-3 transition-transform hover:scale-105 theme-transition plant-card-shadow">
      <Link href={`/shop/${plant.id}`} className="block">
        <div className="relative h-[200px] w-full rounded-lg overflow-hidden bg-[var(--muted)]">
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-8 h-8 border-2 border-[var(--accent)] border-t-transparent rounded-full animate-spin" />
            </div>
          )}
          <Image
            src={imageSrc}
            alt={plant.name}
            fill
            className={`object-contain ${isLoading ? 'opacity-0' : 'opacity-100'} transition-opacity`}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            onError={handleImageError}
            onLoad={handleImageLoad}
            priority={false}
          />
        </div>
        <div className="mt-2">
          <h3 className="font-medium text-base line-clamp-1">{plant.name}</h3>
          <p className="text-sm text-[var(--muted-foreground)] line-clamp-2 mt-1">{plant.description}</p>
        </div>
        <div className="flex justify-between items-center mt-2">
          <p className="font-bold text-base">Rs. {plant.price.toLocaleString()}</p>
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 fill-[var(--accent)] text-[var(--accent)]" />
            <span className="text-sm">{plant.rating.toFixed(1)}</span>
          </div>
        </div>
        <button
          onClick={handleAddToCart}
          className="w-full border border-[var(--accent)] text-[var(--accent)] px-4 py-2 rounded-full font-medium hover:bg-[var(--accent)]/10 transition-colors text-sm flex items-center justify-center gap-2 mt-2"
        >
          <ShoppingCart className="w-4 h-4" />
          افزودن به سبد خرید
        </button>
      </Link>
    </div>
  )
}
