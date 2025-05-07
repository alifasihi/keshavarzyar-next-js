"use client"

import type React from "react"
import logo from "/public/logo.png"
import { ShoppingCart, Search, Menu, X } from "lucide-react"
import Image from "next/image"
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
    if (isSearchOpen) setIsSearchOpen(false)
  }

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen)
  }

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen)
    if (isMenuOpen) setIsMenuOpen(false)
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
    <header className="sticky top-0 z-50 bg-[var(--background)] py-4 border-b border-[var(--border)] theme-transition">
      <div className="container px-4 sm:px-6">
        <nav className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Link href="/" className="flex items-center gap-2">
                <Image src={logo} alt="نفس طبیعی" className="w-[32px] " />
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

          <div className="flex items-center gap-2 sm:gap-4">
            <ThemeToggle />
            <button
              onClick={toggleSearch}
              className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-[var(--card)] flex items-center justify-center theme-transition"
            >
              <Search className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
            <button
              onClick={toggleCart}
              className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-[var(--card)] flex items-center justify-center relative theme-transition"
            >
              <ShoppingCart className="w-4 h-4 sm:w-5 sm:h-5" />
              {isMounted && totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-[var(--accent)] text-[var(--background)] text-xs font-bold rounded-full w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </button>
            <button
              onClick={toggleMenu}
              className="md:hidden w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-[var(--card)] flex items-center justify-center theme-transition"
            >
              {isMenuOpen ? <X className="w-4 h-4 sm:w-5 sm:h-5" /> : <Menu className="w-4 h-4 sm:w-5 sm:h-5" />}
            </button>
          </div>
        </nav>

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <div className="md:hidden fixed inset-0 top-[72px] bg-[var(--background)] z-40">
            <div className="container px-4 py-4">
              <div className="flex flex-col space-y-4">
                <Link
                  href="/"
                  className={`text-lg transition-colors ${
                    isActive("/") ? "text-[var(--accent)]" : "text-[var(--foreground)] hover:text-[var(--accent)]"
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  خانه
                </Link>
                <Link
                  href="/shop"
                  className={`text-lg transition-colors ${
                    isActive("/shop") ? "text-[var(--accent)]" : "text-[var(--foreground)] hover:text-[var(--accent)]"
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  فروشگاه
                </Link>
                <Link
                  href="/plant-care"
                  className={`text-lg transition-colors ${
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
                  className={`text-lg transition-colors ${
                    isActive("/blogs") ? "text-[var(--accent)]" : "text-[var(--foreground)] hover:text-[var(--accent)]"
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  وبلاگ
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Search Bar */}
        {isSearchOpen && (
          <div className="fixed inset-0 top-[72px] bg-[var(--background)] z-40">
            <div className="container px-4 py-4">
              <form onSubmit={handleSearchSubmit}>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="جستجوی گیاهان..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-[var(--card)] text-[var(--foreground)] px-4 py-3 pr-10 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--accent)] text-base sm:text-lg"
                  />
                  <button type="submit" className="absolute right-3 top-1/2 transform -translate-y-1/2">
                    <Search className="w-5 h-5 text-[var(--muted-foreground)]" />
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Cart Sidebar */}
        <CartSidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      </div>
    </header>
  )
}
