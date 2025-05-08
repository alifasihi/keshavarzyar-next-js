"use client"

import type React from "react"

import { useSearchParams } from "next/navigation"
import { plants } from "@/lib/data"
import PlantCard from "@/components/plant-card"
import Link from "next/link"
import { Search } from "lucide-react"
import { useState } from "react"

export default function SearchPage() {
  const searchParams = useSearchParams()
  const initialQuery = searchParams.get("q") || ""
  const [searchQuery, setSearchQuery] = useState(initialQuery)

  // Filter plants based on search query
  const filteredPlants = plants.filter((plant) => {
    return (
      plant.name.toLowerCase().includes(initialQuery.toLowerCase()) ||
      plant.description.toLowerCase().includes(initialQuery.toLowerCase()) ||
      plant.category.toLowerCase().includes(initialQuery.toLowerCase())
    )
  })

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // Update URL with search query
    window.location.href = `/search?q=${encodeURIComponent(searchQuery)}`
  }

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-8">نتایج جستجو</h1>

      <form onSubmit={handleSearch} className="mb-8">
        <div className="relative max-w-xl">
          <input
            type="text"
            placeholder="جستجوی گیاهان..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#222c1d] text-white px-4 py-3 pr-10 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#48da4b]"
          />
          <button type="submit" className="absolute right-3 top-1/2 transform -translate-y-1/2">
            <Search className="w-5 h-5 text-gray-400" />
          </button>
        </div>
      </form>

      <div className="text-center">
        {initialQuery ? (
          <>
            <p className="mb-6 text-gray-400">
              {filteredPlants.length} نتیجه برای "{initialQuery}"
            </p>

            {filteredPlants.length === 0 ? (
              <div className="bg-[#222c1d] rounded-xl p-8 text-center">
                <h3 className="text-xl font-medium mb-2">گیاهی یافت نشد</h3>
                <p className="text-gray-400 mb-4">لطفاً با کلمات کلیدی دیگر جستجو کنید.</p>
                <Link
                  href="/shop"
                  className="inline-block bg-[#48da4b] text-[#1b2316] px-4 py-2 rounded-full font-medium hover:opacity-90 transition-opacity"
                >
                  مشاهده همه گیاهان
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredPlants.map((plant) => (
                  <PlantCard key={plant.id} plant={plant} />
                ))}
              </div>
            )}
          </>
        ) : (
          <div className="bg-[#222c1d] rounded-xl p-8 text-center">
            <h3 className="text-xl font-medium mb-2">عبارت جستجو را وارد کنید</h3>
            <p className="text-gray-400 mb-4">جستجو بر اساس نام، توضیحات یا دسته‌بندی گیاهان.</p>
            <Link
              href="/shop"
              className="inline-block bg-[#48da4b] text-[#1b2316] px-4 py-2 rounded-full font-medium hover:opacity-90 transition-opacity"
            >
              مشاهده همه گیاهان
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
