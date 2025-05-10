"use client"

import { useState } from "react"
import PistachioCard from "../../components/pistachio-card"
import { pistachios } from "@/lib/data"
import { Filter, Search } from "lucide-react"
import { convertNumberToPersian } from '@/utils/convertNumberToPersian';

export default function ShopPage() {
  const [category, setCategory] = useState<string>("all")
  const [priceRange, setPriceRange] = useState<string>("all")
  const [searchTerm, setSearchTerm] = useState<string>("")
  const [showFilters, setShowFilters] = useState<boolean>(false)

  const categories = ["all", "پسته", "tropical", "succulent", "flowering", "hanging"]

  // Update the category labels to Persian
  const categoriesWithLabels = categories.map((cat) => {
    switch (cat) {
      case "all":
        return { value: cat, label: "همه" }
      case "pistachio":
        return { value: cat, label: "پسته" }
      case "tropical":
        return { value: cat, label: "گرمسیری" }
      case "succulent":
        return { value: cat, label: "آبدار" }
      case "flowering":
        return { value: cat, label: "گلدار" }
      case "hanging":
        return { value: cat, label: "آویز" }
      default:
        return { value: cat, label: cat }
    }
  })

  const priceRanges = [
    { label: "همه قیمت‌ها", value: "all" },
    { label: "زیر ۸,۰۰۰,۰۰۰ ریال", value: "under-8,000,000" },
    { label: "۸,۰۰۰,۰۰۰ تا ۱۲,۰۰۰,۰۰۰ ریال", value: "8,000,000-12,000,000" },
    { label: "۱۲,۰۰۰,۰۰۰ تا ۱۶,۰۰۰,۰۰۰ ریال", value: "12,000,000-16,000,000" },
    { label: "بالای ۱۶,۰۰۰,۰۰۰ ریال", value: "over-16,000,000" },
  ]

  const filteredpistachios = pistachios.map((pistachio) => ({
    ...pistachio,
    price: Number(pistachio.price),
  })).filter((pistachio) => {
    // Filter by category
    if (category !== "all" && pistachio.category !== category) {
      return false
    }

    // Filter by price range
    if (priceRange !== "all") {
      const price = Number(convertNumberToPersian(pistachio.price))
      if (priceRange === "under-8,000,000" && price >= 8000000) {
        return false
      } else if (priceRange === "8,000,000-12,000,000" && (price < 8000000 || price > 12000000)) {
        return false
      } else if (priceRange === "12,000,000-16,000,000" && (price < 12000000 || price > 16000000)) {
        return false
      } else if (priceRange === "over-16,000,000" && price <= 16000000) {
        return false
      }
    }

    // Filter by search term
    if (
      searchTerm &&
      !pistachio.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !pistachio.description.toLowerCase().includes(searchTerm.toLowerCase())
    ) {
      return false
    }

    return true
  })

  return (
    <div className="container py-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-8">فروشگاه آنلاین پسته‌ی تازه و خوش‌طعم</h1>

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
            } md:block w-full md:w-64 bg-[var(--card)] rounded-xl p-6 h-fit sticky top-4 theme-transition pistachio-card-shadow`}
          >
            <div className="mb-6">
              <h3 className="font-medium mb-3">جستجو</h3>
              <div className="relative">
                <input
                  type="text"
                  placeholder="جستجوی محصولات..."
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
                {categoriesWithLabels.map((cat) => (
                  <label key={cat.value} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="category"
                      checked={category === cat.value}
                      onChange={() => setCategory(cat.value)}
                      className="accent-[var(--accent)]"
                    />
                    <span className="capitalize">{cat.label}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-medium mb-3">محدوده قیمت</h3>
              <div className="space-y-2">
                {priceRanges.map((range) => (
                  <label key={range.value} className="flex items-center gap-2 cursor-poYekanBakh">
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
            {filteredpistachios.length === 0 ? (
              <div className="bg-[#222c1d] rounded-xl p-8 text-center">
                <h3 className="text-xl font-medium mb-2">محصولی یافت نشد</h3>
                <p className="text-gray-400">لطفاً فیلترها یا عبارت جستجو را تغییر دهید.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredpistachios.map((pistachio) => (
                  <PistachioCard key={pistachio.id} pistachio={pistachio} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
