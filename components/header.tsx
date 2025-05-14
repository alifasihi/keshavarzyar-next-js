"use client"

import React from "react"

import { ShoppingCart, Search, Menu, X, User, LogOut, Package, Heart, Settings } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { useState, useEffect, useRef } from "react"
import { useCart } from "@/context/cart-context"
import { useSearch } from "@/context/search-context"
import { useProfile } from "@/context/profile-context"
import CartSidebar from "./cart-sidebar"
import ThemeToggle from "./theme-toggle"
import logo from "/public/logo.png"
import RandomUser from "./ui/random-user";


export default function Header() {
  const pathname = usePathname()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const { cart } = useCart()
  const { searchQuery, setSearchQuery, isSearchOpen, setIsSearchOpen } = useSearch()
  const { user, isLoggedIn } = useProfile()
  const [isMounted, setIsMounted] = useState(false)
  const profileDropdownRef = useRef<HTMLDivElement>(null)
  const [apiUser, setApiUser] = useState<{ name: string; email: string; avatar: string } | null>(null);

  useEffect(() => {
    setIsMounted(true)

    // Close profile dropdown when clicking outside
    const handleClickOutside = (event: MouseEvent) => {
      if (profileDropdownRef.current && !profileDropdownRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  useEffect(() => {
    const fetchUserFromApi = async () => {
      try {
        const response = await fetch('https://randomuser.me/api/');
        const data = await response.json();
        const user = data.results[0];
        setApiUser({
          name: `${user.name.first} ${user.name.last}`,
          email: user.email,
          avatar: user.picture.medium,
        });
      } catch (error) {
        console.error('Failed to fetch user from API:', error);
      }
    };

    fetchUserFromApi();
  }, []);

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

  const toggleProfile = () => {
    setIsProfileOpen(!isProfileOpen)
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
              <Image src={logo} alt="پستاک" className="w-[32px] " />
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
              href="/pistachio-care"
              className={`transition-colors ${
                isActive("/pistachio-care") ? "text-[var(--accent)]" : "text-[var(--foreground)] hover:text-[var(--accent)]"
              }`}
            >
              مراقبت از مزارع پسته
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

            {/* Profile Button and Dropdown */}
            <div className="relative" ref={profileDropdownRef}>
              <button
                onClick={toggleProfile}
                className="w-10 h-10 rounded-full overflow-hidden border-2 border-[var(--accent)] flex items-center justify-center relative theme-transition"
                aria-label="Profile menu"
                aria-expanded={isProfileOpen}
              >
                {isLoggedIn && user ? (
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full] overflow-hidden">
                      {/* استفاده از کامپوننت RandomUser */}
                      <RandomUser />
                    </div>
                  </div>
                ) : (
                  <User className="w-5 h-5" />
                )}
              </button>

              {isProfileOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-[var(--card)] rounded-lg shadow-lg py-2 z-50 theme-transition">
                  {isLoggedIn ? (
                    <>
                      <div className="px-4 py-2 border-b border-[var(--border)]">
                        <p className="font-medium">{user.name}</p>
                        <p className="text-sm text-[var(--muted-foreground)]">{user.email}</p>
                      </div>
                      <div className="py-1">
                        <Link
                          href="/profile"
                          className="flex items-center gap-2 px-4 py-2 hover:bg-[var(--card-darker)] theme-transition"
                          onClick={() => setIsProfileOpen(false)}
                        >
                          <User className="w-4 h-4" />
                          <span>My Profile</span>
                        </Link>
                        <Link
                          href="/profile?section=orders"
                          className="flex items-center gap-2 px-4 py-2 hover:bg-[var(--card-darker)] theme-transition"
                          onClick={() => setIsProfileOpen(false)}
                        >
                          <Package className="w-4 h-4" />
                          <span>My Orders</span>
                        </Link>
                        <Link
                          href="/profile?section=lists"
                          className="flex items-center gap-2 px-4 py-2 hover:bg-[var(--card-darker)] theme-transition"
                          onClick={() => setIsProfileOpen(false)}
                        >
                          <Heart className="w-4 h-4" />
                          <span>My Lists</span>
                        </Link>
                        <Link
                          href="/profile?section=account"
                          className="flex items-center gap-2 px-4 py-2 hover:bg-[var(--card-darker)] theme-transition"
                          onClick={() => setIsProfileOpen(false)}
                        >
                          <Settings className="w-4 h-4" />
                          <span>Account Settings</span>
                        </Link>
                      </div>
                      <div className="border-t border-[var(--border)] py-1">
                        <button className="w-full flex items-center gap-2 px-4 py-2 hover:bg-[var(--card-darker)] text-left theme-transition">
                          <LogOut className="w-4 h-4" />
                          <span>Logout</span>
                        </button>
                      </div>
                    </>
                  ) : (
                    <div className="py-1">
                      <Link
                        href="/login"
                        className="flex items-center gap-2 px-4 py-2 hover:bg-[var(--card-darker)] theme-transition"
                        onClick={() => setIsProfileOpen(false)}
                      >
                        <LogOut className="w-4 h-4 transform rotate-180" />
                        <span>Login</span>
                      </Link>
                      <Link
                        href="/register"
                        className="flex items-center gap-2 px-4 py-2 hover:bg-[var(--card-darker)] theme-transition"
                        onClick={() => setIsProfileOpen(false)}
                      >
                        <User className="w-4 h-4" />
                        <span>Register</span>
                      </Link>
                    </div>
                  )}
                </div>
              )}
            </div>

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
                Home
              </Link>
              <Link
                href="/shop"
                className={`transition-colors ${
                  isActive("/shop") ? "text-[var(--accent)]" : "text-[var(--foreground)] hover:text-[var(--accent)]"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Shop
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
                Plant Care
              </Link>
              <Link
                href="/blogs"
                className={`transition-colors ${
                  isActive("/blogs") ? "text-[var(--accent)]" : "text-[var(--foreground)] hover:text-[var(--accent)]"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Blogs
              </Link>
              <Link
                href="/profile"
                className={`transition-colors ${
                  isActive("/profile") ? "text-[var(--accent)]" : "text-[var(--foreground)] hover:text-[var(--accent)]"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                My Profile
              </Link>
            </div>
          </div>
        )}

        {/* Search Bar */}
        {isSearchOpen && (
          <div className="absolute top-[72px] left-0 right-0 bg-[var(--background)] border-b border-[var(--border)] p-4 z-50 theme-transition">
            <form onSubmit={handleSearchSubmit} className="container">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search for plants..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-[var(--card)] text-[var(--foreground)] px-4 py-3 pr-10 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
                />
                <button type="submit" className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  <Search className="w-5 h-5 text-[var(--muted-foreground)]" />
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
