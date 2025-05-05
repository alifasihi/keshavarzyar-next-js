"use client"

import { useState } from "react"
import PlantCard from "@/components/plant-card"
import { plants } from "@/lib/data"
import { Filter, Search } from "lucide-react"

export default function ShopPage() {
  const [category, setCategory] = useState<string>("all")
  const [priceRange, setPriceRange] = useState<string>("all")
  const [searchTerm, setSearchTerm] = useState<string>("")
  const [showFilters, setShowFilters] = useState<boolean>(false)

  const categories = ["all", "indoor", "tropical", "succulent", "flowering", "hanging"]
  const priceRanges = [
    { label: "همه قیمت‌ها", value: "all" },
    { label: "زیر ۸۰۰ ریال", value: "under-800" },
    { label: "۸۰۰ تا ۱۲۰۰ ریال", value: "800-1200" },
    { label: "۱۲۰۰ تا ۱۶۰۰ ریال", value: "1200-1600" },
    { label: "بالای ۱۶۰۰ ریال", value: "over-1600" },
  ]

  const filteredPlants = plants.filter((plant) => {
    // Filter by category
    if (category !== "all" && plant.category !== category) {
      return false
    }

    // Filter by price range
    if (priceRange !== "all") {
      if (priceRange === "under-800" && plant.price >= 800) {
        return false
      } else if (priceRange === "800-1200" && (plant.price < 800 || plant.price > 1200)) {
        return false
      } else if (priceRange === "1200-1600" && (plant.price < 1200 || plant.price > 1600)) {
        return false
      } else if (priceRange === "over-1600" && plant.price <= 1600) {
        return false
      }
    }

    // Filter by search term
    if (
      searchTerm &&
      !plant.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !plant.description.toLowerCase().includes(searchTerm.toLowerCase())
    ) {
      return false
    }

    return true
  })

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-8">فروشگاه گیاهان</h1>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Filters - Mobile Toggle */}
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="md:hidden flex items-center gap-2 bg-[#222c1d] px-4 py-2 rounded-lg mb-4"
        >
          <Filter className="w-4 h-4" />
          {showFilters ? "مخفی کردن فیلترها" : "نمایش فیلترها"}
        </button>

        {/* Filters - Sidebar */}
        <div
          className={`${
            showFilters ? "block" : "hidden"
          } md:block w-full md:w-64 bg-[var(--card)] rounded-xl p-6 h-fit sticky top-4 theme-transition plant-card-shadow`}
        >
          <div className="mb-6">
            <h3 className="font-medium mb-3">جستجو</h3>
            <div className="relative">
              <input
                type="text"
                placeholder="جستجوی گیاهان..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-[var(--card-darker)] text-[var(--foreground)] px-4 py-2 pr-10 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
              />
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            </div>
          </div>

          <div className="mb-6">
            <h3 className="font-medium mb-3">دسته‌بندی‌ها</h3>
            <div className="space-y-2">
              {categories.map((cat) => (
                <label key={cat} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="category"
                    checked={category === cat}
                    onChange={() => setCategory(cat)}
                    className="accent-[var(--accent)]"
                  />
                  <span className="capitalize">{cat}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-medium mb-3">محدوده قیمت</h3>
            <div className="space-y-2">
              {priceRanges.map((range) => (
                <label key={range.value} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="priceRange"
                    checked={priceRange === range.value}
                    onChange={() => setPriceRange(range.value)}
                    className="accent-[var(--accent)]"
                  />
                  <span>{range.label}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="flex-1">
          {filteredPlants.length === 0 ? (
            <div className="bg-[#222c1d] rounded-xl p-8 text-center">
              <h3 className="text-xl font-medium mb-2">گیاهی یافت نشد</h3>
              <p className="text-gray-400">لطفاً فیلترها یا عبارت جستجو را تغییر دهید.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPlants.map((plant) => (
                <PlantCard key={plant.id} plant={plant} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
