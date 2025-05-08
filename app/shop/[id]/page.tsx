"use client"

import { useState, use } from "react"
import Image from "next/image"
import { Star, Minus, Plus, ShoppingCart, Heart, ArrowLeft } from "lucide-react"
import { plants } from "@/lib/data"
import { useCart } from "@/context/cart-context"
import Link from "next/link"
import PlantCard from "@/components/plant-card"
import { convertNumberToPersian } from "@/utils/convertNumberToPersian"

// Update all numbers to Persian digits
const toPersianDigits = (num: number) => num.toString().replace(/[0-9]/g, (d) => '۰۱۲۳۴۵۶۷۸۹'[parseInt(d)]);

export default function PlantDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [quantity, setQuantity] = useState(1)
  const { addToCart } = useCart()

  const plantId = Number.parseInt(id)
  const plant = plants.find((p) => p.id === plantId)

  // Get similar plants (same category)
  const similarPlants = plant
    ? plants
        .filter((p) => p.category === plant.category && p.id !== plant.id)
        .map((p) => ({ ...p, price: Number(p.price) }))
        .slice(0, 3)
    : []

  if (!plant) {
    return (
      <div className="container py-12 text-center">
        <h1 className="text-2xl font-bold mb-4">گیاه یافت نشد</h1>
        <p className="mb-6">متأسفانه گیاه مورد نظر شما یافت نشد.</p>
        <Link
          href="/shop"
          className="inline-block bg-[#48da4b] text-[#1b2316] px-4 py-2 rounded-full font-medium hover:opacity-90 transition-opacity"
        >
          بازگشت به فروشگاه
        </Link>
      </div>
    )
  }

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1)
    }
  }

  const increaseQuantity = () => {
    setQuantity(quantity + 1)
  }

  const handleAddToCart = () => {
    // Add the plant to cart with the selected quantity
    for (let i = 0; i < quantity; i++) {
      addToCart({ ...plant, price: Number(plant.price) })
    }
  }

  return (
    <div className="container py-8">
      <Link href="/shop" className="inline-flex items-center text-gray-400 hover:text-white mb-6">
        <ArrowLeft className="w-4 h-4 mr-2" />
        بازگشت به فروشگاه
      </Link>

      <div className="grid md:grid-cols-2 gap-8 mb-12">
        <div className="bg-[#222c1d] rounded-xl p-6">
          <div className="relative h-[400px] w-full">
            <Image src={plant.image || "/placeholder.svg"} alt={plant.name} fill className="object-contain" />
          </div>
        </div>

        <div className="space-y-6">
          <h1 className="text-3xl font-bold">{plant.name}</h1>

          <div className="flex items-center gap-2">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-5 h-5 ${
                    i < Math.floor(plant.rating) ? "fill-[#48da4b] text-[#48da4b]" : "text-gray-400"
                  }`}
                />
              ))}
            </div>
            <span className="text-gray-400">({toPersianDigits(plant.rating)} امتیاز)</span>
          </div>

          <p className="text-2xl font-bold">ریال {convertNumberToPersian(Number(plant.price))}</p>

          <div className="border-t border-[#222c1d] pt-4"></div>
            <p className="text-gray-500">{plant.description}</p>
          </div>

          <div className="border-t border-[#222c1d] pt-4">
            <h3 className="font-medium mb-2">تعداد</h3>
            <div className="flex items-center gap-4">
              <div className="flex items-center">
                <button
                  onClick={decreaseQuantity}
                  className="w-8 h-8 rounded-l-lg bg-[#48da4b] flex items-center justify-center"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-12 h-8 flex items-center justify-center bg-[#247a24]">{toPersianDigits(quantity)}</span>
                <button
                  onClick={increaseQuantity}
                  className="w-8 h-8 rounded-r-lg bg-[#48da4b] flex items-center justify-center"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
              <span className="text-gray-400">موجود در انبار</span>
            </div>
          </div>

          <div className="flex gap-4 pt-4">
            <button
              onClick={handleAddToCart}
              className="flex-1 bg-[#48da4b] text-[#1b2316] px-4 py-3 rounded-full font-medium hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
            >
              <ShoppingCart className="w-5 h-5" />
              افزودن به سبد خرید
            </button>
            <button className="w-12 h-12 rounded-full bg-[#48da4b] flex items-center justify-center">
              <Heart className="w-5 h-5" />
            </button>
          </div>

          <div className="border-t border-[#222c1d] pt-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="font-medium mb-1">نوع گیاه</h3>
                <p className="text-gray-400 capitalize">{plant.category}</p>
              </div>
              <div>
                <h3 className="font-medium mb-1">اندازه</h3>
                <p className="text-gray-400">متوسط</p>
              </div>
              <div>
                <h3 className="font-medium mb-1">نور</h3>
                <p className="text-gray-400">نور غیرمستقیم روشن</p>
              </div>
              <div>
                <h3 className="font-medium mb-1">آبیاری</h3>
                <p className="text-gray-400">هفتگی</p>
            </div>
          </div>
        </div>
      </div>

      {similarPlants.length > 0 && (
        <section className="py-8">
          <h2 className="text-2xl font-bold mb-6">گیاهان مشابه</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {similarPlants.map((plant) => (
              <PlantCard key={plant.id} plant={plant} />
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
