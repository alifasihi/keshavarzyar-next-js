"use client"

import React, { useState } from "react"
import Image from "next/image"
import { Star, ShoppingCart } from "lucide-react"
import Link from "next/link"
import { type Pistachio, useCart } from "@/context/cart-context"
import AkbariPistachio from "/public/image/Akbari-Pistachio.png"
import AhmadAghaeiRoastedPistachio from "/public/image/Ahmad-Aghaei-Roasted-Pistachio.png"
import BadamiPistachio from "/public/image/Badami-Pistachio.png"
import Fandoghi from "/public/image/Fandoghi.webp"
import { convertNumberToPersian } from "@/utils/convertNumberToPersian"
import Loader from '../components/ui/loader'

type PistachioCardProps = {
  pistachio: Pistachio
  size?: "small" | "medium" | "large"
  index?: number
}

const images = [AkbariPistachio,Fandoghi,AhmadAghaeiRoastedPistachio,BadamiPistachio]

export default function PistachioCard({ pistachio, size = "medium", index = 0 }: PistachioCardProps) {
  const { addToCart } = useCart()
  const [imageError, setImageError] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    addToCart(pistachio)
  }

  const handleImageError = () => {
    setImageError(true)
    setIsLoading(false)
  }

  const handleImageLoad = () => {
    setIsLoading(false)
  }

  const fallbackImage = images[index % images.length]
  const imageSrc = imageError ? "/image/main-pic.svg" : (pistachio.image || fallbackImage)

    // const isLoading = true; // یا هر شرطی که نشان‌دهنده وضعیت لودینگ باشد


  // --- SMALL ---
  if (size === "small") {
    return (
      <div className="bg-[var(--card)] rounded-2xl overflow-hidden p-4 space-y-2 transition-transform hover:scale-105 theme-transition pistachio-card-shadow">
        <Link href={`/shop/${pistachio.id}`} className="block">
          <div className="relative h-[120px] w-full rounded-lg overflow-hidden bg-[var(--muted)]">
            {isLoading && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-6 h-6 border-2 border-[var(--accent)] border-t-transparent rounded-full animate-spin" />
              </div>
            )}
            {isLoading?(
              <Loader/>
            ):(
              <Image
              src={imageSrc}
              alt={pistachio.name}
              fill
              className={`object-contain ${isLoading ? 'opacity-0' : 'opacity-100'} transition-opacity`}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              onError={handleImageError}
              onLoad={handleImageLoad}
              priority={false}
            />
            )}
          </div>
          <div className="mt-2">
            <h3 className="font-medium text-sm line-clamp-1">{pistachio.name}</h3>
            <p className="text-xs text-[var(--muted-foreground)] line-clamp-2 mt-1">{pistachio.description}</p>
          </div>
          <div className="flex justify-between items-center mt-2">
            <p className="font-bold text-sm">ریال {convertNumberToPersian(pistachio.price).toLocaleString()}</p>
            <div className="flex items-center gap-1">
              <Star className="w-3 h-3 fill-[var(--accent)] text-[var(--accent)]" />
              <span className="text-xs">{pistachio.rating.toFixed(1)}</span>
            </div>
          </div>
        </Link>
      </div>
    )
  }

  // --- LARGE ---
  if (size === "large") {
    return (
      <div className="bg-[var(--card)] rounded-2xl overflow-hidden p-6 transition-transform hover:scale-105 theme-transition pistachio-card-shadow">
        <Link href={`/shop/${pistachio.id}`} className="block">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="relative h-[200px] w-full md:w-[200px] rounded-lg overflow-hidden bg-[var(--muted)]">
              {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-8 h-8 border-2 border-[var(--accent)] border-t-transparent rounded-full animate-spin" />
                </div>
              )}
              <Image
                src={imageSrc}
                alt={pistachio.name}
                fill
                className={`object-contain ${isLoading ? 'opacity-0' : 'opacity-100'} transition-opacity`}
                sizes="(max-width: 768px) 100vw, 200px"
                onError={handleImageError}
                onLoad={handleImageLoad}
                priority={false}
              />
            </div>
            <div className="flex-1 space-y-3">
              <h3 className="font-medium text-lg">{pistachio.name}</h3>
              <p className="text-sm text-[var(--muted-foreground)] line-clamp-3">{pistachio.description}</p>
              <div className="flex justify-between items-center">
                <p className="font-bold text-lg">ریال {pistachio.price.toLocaleString()}</p>
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-[var(--accent)] text-[var(--accent)]" />
                  <span className="text-sm">{pistachio.rating.toFixed(1)}</span>
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
    <div className="bg-[var(--card)] rounded-2xl overflow-hidden p-4 space-y-3 transition-transform hover:scale-105 theme-transition pistachio-card-shadow">
      <Link href={`/shop/${pistachio.id}`} className="block">
        <div className="relative h-[200px] w-full rounded-lg overflow-hidden bg-[var(--muted)]">
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-8 h-8 border-2 border-[var(--accent)] border-t-transparent rounded-full animate-spin" />
            </div>
          )}
          <Image
            src={imageSrc}
            alt={pistachio.name}
            fill
            className={`object-contain ${isLoading ? 'opacity-0' : 'opacity-100'} transition-opacity`}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            onError={handleImageError}
            onLoad={handleImageLoad}
            priority={false}
          />
        </div>
        <div className="mt-2">
          <h3 className="font-medium text-base line-clamp-1">{pistachio.name}</h3>
          <p className="text-sm text-[var(--muted-foreground)] line-clamp-2 mt-1">{pistachio.description}</p>
        </div>
        <div className="flex justify-between items-center mt-2">
          <p className="font-bold text-base">ریال {pistachio.price.toLocaleString()}</p>
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 fill-[var(--accent)] text-[var(--accent)]" />
            <span className="text-sm">{pistachio.rating.toFixed(1)}</span>
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
