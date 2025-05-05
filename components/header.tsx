"use client"

import type React from "react"

import { ShoppingCart, Search, Menu, X } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState, useEffect } from "react"
import { useCart } from "@/context/cart-context"
import { useSearch } from "@/context/search-context"
import CartSidebar from "./cart-sidebar"
import ThemeToggle from "./theme-toggle"

export default function Header() {
  const pathname = usePathname()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isCartOpen, setIsCartOpen] = useState(false)
  const { cart } = useCart()
  const { searchQuery, setSearchQuery, isSearchOpen, setIsSearchOpen } = useSearch()
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const totalItems = cart.reduce((total, item) => total + item.quantity, 0)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen)
  }

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen)
  }

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Navigate to search results page
    window.location.href = `/search?q=${encodeURIComponent(searchQuery)}`
  }

  const isActive = (path: string) => {
    return pathname === path
  }

  return (
    <header className="py-4 border-b border-[var(--border)] theme-transition">
      <div className="container">
        <nav className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-[#fff84e] rounded-full flex items-center justify-center">
                <span className="text-[#1b2316] font-bold">P</span>
              </div>
              <span className="font-bold text-lg">Plantio.</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <Link
              href="/"
              className={`transition-colors ${
                isActive("/") ? "text-[var(--accent)]" : "text-[var(--foreground)] hover:text-[var(--accent)]"
              }`}
            >
              خانه
            </Link>
            <Link
              href="/shop"
              className={`transition-colors ${
                isActive("/shop") ? "text-[var(--accent)]" : "text-[var(--foreground)] hover:text-[var(--accent)]"
              }`}
            >
              فروشگاه
            </Link>
            <Link
              href="/plant-care"
              className={`transition-colors ${
                isActive("/plant-care") ? "text-[var(--accent)]" : "text-[var(--foreground)] hover:text-[var(--accent)]"
              }`}
            >
              مراقبت از گیاهان
            </Link>
            <Link
              href="/blogs"
              className={`transition-colors ${
                isActive("/blogs") ? "text-[var(--accent)]" : "text-[var(--foreground)] hover:text-[var(--accent)]"
              }`}
            >
              وبلاگ
            </Link>
          </div>

          <div className="flex items-center gap-4">
            <ThemeToggle />
            <button
              onClick={toggleSearch}
              className="w-10 h-10 rounded-full bg-[var(--card)] flex items-center justify-center theme-transition"
            >
              <Search className="w-5 h-5" />
            </button>
            <button
              onClick={toggleCart}
              className="w-10 h-10 rounded-full bg-[var(--card)] flex items-center justify-center relative theme-transition"
            >
              <ShoppingCart className="w-5 h-5" />
              {isMounted && totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-[var(--accent)] text-[var(--background)] text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </button>
            <button
              onClick={toggleMenu}
              className="md:hidden w-10 h-10 rounded-full bg-[var(--card)] flex items-center justify-center theme-transition"
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </nav>

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 py-4 border-t border-[#222c1d]">
            <div className="flex flex-col space-y-4">
              <Link
                href="/"
                className={`transition-colors ${
                  isActive("/") ? "text-[var(--accent)]" : "text-[var(--foreground)] hover:text-[var(--accent)]"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                خانه
              </Link>
              <Link
                href="/shop"
                className={`transition-colors ${
                  isActive("/shop") ? "text-[var(--accent)]" : "text-[var(--foreground)] hover:text-[var(--accent)]"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                فروشگاه
              </Link>
              <Link
                href="/plant-care"
                className={`transition-colors ${
                  isActive("/plant-care")
                    ? "text-[var(--accent)]"
                    : "text-[var(--foreground)] hover:text-[var(--accent)]"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                مراقبت از گیاهان
              </Link>
              <Link
                href="/blogs"
                className={`transition-colors ${
                  isActive("/blogs") ? "text-[var(--accent)]" : "text-[var(--foreground)] hover:text-[var(--accent)]"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                وبلاگ
              </Link>
            </div>
          </div>
        )}

        {/* Search Bar */}
        {isSearchOpen && (
          <div className="absolute top-[72px] left-0 right-0 bg-[#1b2316] border-b border-[#222c1d] p-4 z-50">
            <form onSubmit={handleSearchSubmit} className="container">
              <div className="relative">
                <input
                  type="text"
                  placeholder="جستجوی گیاهان..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-[#222c1d] text-white px-4 py-3 pr-10 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#fff84e]"
                />
                <button type="submit" className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  <Search className="w-5 h-5 text-gray-400" />
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Cart Sidebar */}
        <CartSidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      </div>
    </header>
  )
}
