"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import {
  User,
  Package,
  Heart,
  MessageSquare,
  MapPin,
  Gift,
  Mail,
  Clock,
  Settings,
  LogOut,
  ChevronRight,
  ShoppingBag,
  Star,
  Menu,
  X,
} from "lucide-react"
import ProfileImageUpload from "../../components/profile-image-upload"
import { useProfile } from "@/context/profile-context"

// Keep the mock data for orders, wishlist, etc.
// But remove the mockUser data since we'll get it from context

const mockOrders = [
  { id: "ORD-2023-1234", date: "June 15, 2024", status: "Delivered", total: 2450, items: 3 },
  { id: "ORD-2023-1156", date: "May 28, 2024", status: "Processing", total: 1800, items: 2 },
  { id: "ORD-2023-0987", date: "April 10, 2024", status: "Delivered", total: 950, items: 1 },
]

const mockWishlist = [
  { id: 1, name: "Monstera Deliciosa", price: 1800 },
  { id: 5, name: "Fiddle Leaf Fig", price: 2000 },
  { id: 9, name: "Peace Lily", price: 1100 },
]

const mockMessages = [
  { id: 1, subject: "Order Confirmation", date: "June 15, 2024", read: true },
  { id: 2, subject: "Plant Care Tips", date: "June 10, 2024", read: false },
  { id: 3, subject: "Summer Sale Announcement", date: "May 28, 2024", read: true },
]

const mockAddresses = [
  {
    id: 1,
    type: "Home",
    default: true,
    address: "123 Green Street, Apt 4B, Plant City, PC 12345",
  },
  {
    id: 2,
    type: "Work",
    default: false,
    address: "456 Office Boulevard, Suite 200, Business District, BD 67890",
  },
]

const mockVisits = [
  { id: 5, name: "Monstera Deliciosa", date: "June 14, 2024" },
  { id: 9, name: "Fiddle Leaf Fig", date: "June 12, 2024" },
  { id: 3, name: "Snake Plant", date: "June 10, 2024" },
]

type ProfileSection =
  | "summary"
  | "orders"
  | "lists"
  | "feedback"
  | "addresses"
  | "giftcards"
  | "messages"
  | "visits"
  | "account"

export default function ProfilePage() {
  const searchParams = useSearchParams()
  const sectionParam = searchParams.get("section")
  const [activeSection, setActiveSection] = useState<ProfileSection>("summary")
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { user, updateProfileImage } = useProfile()

  // Set the active section based on URL parameter if present
  useEffect(() => {
    if (sectionParam) {
      const validSection = sectionParam as ProfileSection
      if (
        ["summary", "orders", "lists", "feedback", "addresses", "giftcards", "messages", "visits", "account"].includes(
          validSection,
        )
      ) {
        setActiveSection(validSection)
      }
    }
  }, [sectionParam])

  const menuItems = [
    { id: "summary", label: "Activity Summary", icon: <User className="w-5 h-5" /> },
    { id: "orders", label: "Orders", icon: <Package className="w-5 h-5" /> },
    { id: "lists", label: "My Lists", icon: <Heart className="w-5 h-5" /> },
    { id: "feedback", label: "Feedback & Questions", icon: <MessageSquare className="w-5 h-5" /> },
    { id: "addresses", label: "Addresses", icon: <MapPin className="w-5 h-5" /> },
    { id: "giftcards", label: "Gift Cards", icon: <Gift className="w-5 h-5" /> },
    { id: "messages", label: "Messages", icon: <Mail className="w-5 h-5" /> },
    { id: "visits", label: "Recent Visits", icon: <Clock className="w-5 h-5" /> },
    { id: "account", label: "Account Information", icon: <Settings className="w-5 h-5" /> },
  ]

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen)
  }

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-8">My Profile</h1>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Mobile Menu Toggle */}
        <button
          onClick={toggleMobileMenu}
          className="lg:hidden flex items-center justify-between w-full bg-[var(--card)] p-4 rounded-xl theme-transition plant-card-shadow"
        >
          <span className="font-medium">Menu</span>
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>

        {/* Sidebar Navigation */}
        <div className={`${mobileMenuOpen ? "block" : "hidden"} lg:block lg:w-64 space-y-2`}>
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setActiveSection(item.id as ProfileSection)
                setMobileMenuOpen(false)
              }}
              className={`w-full flex items-center gap-3 p-3 rounded-lg transition-colors ${
                activeSection === item.id
                  ? "bg-[var(--accent)] text-[var(--background)]"
                  : "bg-[var(--card)] hover:bg-[var(--card-darker)] text-[var(--foreground)]"
              } theme-transition`}
            >
              {item.icon}
              <span>{item.label}</span>
            </button>
          ))}

          <button className="w-full flex items-center gap-3 p-3 rounded-lg bg-[var(--card)] hover:bg-[var(--card-darker)] text-[var(--foreground)] transition-colors theme-transition">
            <LogOut className="w-5 h-5" />
            <span>Logout</span>
          </button>
        </div>

        {/* Main Content */}
        <div className="flex-1 bg-[var(--card)] rounded-xl p-6 theme-transition plant-card-shadow">
          {activeSection === "summary" && (
            <div>
              <h2 className="text-xl font-bold mb-6">Activity Summary</h2>

              <div className="flex flex-col md:flex-row items-center gap-6 mb-8">
                <ProfileImageUpload currentImage={user.avatar} onImageChange={updateProfileImage} />
                <div>
                  <h3 className="text-lg font-bold">{user.name}</h3>
                  <p className="text-[var(--muted-foreground)]">{user.email}</p>
                  <p className="text-[var(--muted-foreground)]">Member since {user.joinDate}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                <div className="bg-[var(--card-darker)] p-4 rounded-lg">
                  <div className="flex items-center gap-3 mb-2">
                    <Package className="w-5 h-5 text-[var(--accent)]" />
                    <h4 className="font-medium">Orders</h4>
                  </div>
                  <p className="text-2xl font-bold">{mockOrders.length}</p>
                  <p className="text-sm text-[var(--muted-foreground)]">Last order on {mockOrders[0].date}</p>
                </div>

                <div className="bg-[var(--card-darker)] p-4 rounded-lg">
                  <div className="flex items-center gap-3 mb-2">
                    <Heart className="w-5 h-5 text-[var(--accent)]" />
                    <h4 className="font-medium">Wishlist</h4>
                  </div>
                  <p className="text-2xl font-bold">{mockWishlist.length}</p>
                  <p className="text-sm text-[var(--muted-foreground)]">Plants saved for later</p>
                </div>

                <div className="bg-[var(--card-darker)] p-4 rounded-lg">
                  <div className="flex items-center gap-3 mb-2">
                    <Mail className="w-5 h-5 text-[var(--accent)]" />
                    <h4 className="font-medium">Messages</h4>
                  </div>
                  <p className="text-2xl font-bold">{mockMessages.filter((m) => !m.read).length}</p>
                  <p className="text-sm text-[var(--muted-foreground)]">Unread messages</p>
                </div>
              </div>

              <h3 className="text-lg font-bold mb-4">Recent Orders</h3>
              <div className="space-y-4">
                {mockOrders.slice(0, 2).map((order) => (
                  <div key={order.id} className="bg-[var(--card-darker)] p-4 rounded-lg">
                    <div className="flex flex-wrap justify-between items-center gap-2">
                      <div>
                        <p className="font-medium">{order.id}</p>
                        <p className="text-sm text-[var(--muted-foreground)]">{order.date}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold">Rs. {order.total}</p>
                        <span
                          className={`text-xs px-2 py-1 rounded-full ${
                            order.status === "Delivered"
                              ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100"
                              : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100"
                          }`}
                        >
                          {order.status}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
                <button
                  onClick={() => setActiveSection("orders")}
                  className="text-[var(--accent)] text-sm font-medium flex items-center gap-1 hover:underline"
                >
                  View all orders
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {activeSection === "orders" && (
            <div>
              <h2 className="text-xl font-bold mb-6">My Orders</h2>

              <div className="space-y-4">
                {mockOrders.map((order) => (
                  <div key={order.id} className="bg-[var(--card-darker)] p-4 rounded-lg">
                    <div className="flex flex-wrap justify-between items-start gap-2 mb-3">
                      <div>
                        <p className="font-medium">{order.id}</p>
                        <p className="text-sm text-[var(--muted-foreground)]">{order.date}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold">Rs. {order.total}</p>
                        <span
                          className={`text-xs px-2 py-1 rounded-full ${
                            order.status === "Delivered"
                              ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100"
                              : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100"
                          }`}
                        >
                          {order.status}
                        </span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <p className="text-sm text-[var(--muted-foreground)]">{order.items} items</p>
                      <div className="flex gap-2">
                        <button className="text-xs border border-[var(--accent)] text-[var(--accent)] px-3 py-1 rounded-full">
                          Track
                        </button>
                        <button className="text-xs bg-[var(--accent)] text-[var(--background)] px-3 py-1 rounded-full">
                          Details
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeSection === "lists" && (
            <div>
              <h2 className="text-xl font-bold mb-6">My Lists</h2>

              <div className="mb-6">
                <h3 className="text-lg font-medium mb-4">Wishlist</h3>
                <div className="space-y-4">
                  {mockWishlist.map((item) => (
                    <div key={item.id} className="bg-[var(--card-darker)] p-4 rounded-lg flex items-center gap-4">
                      <div className="relative w-16 h-16 rounded-md overflow-hidden bg-[var(--background)]">
                        <Image
                          src={`/placeholder.svg?height=64&width=64`}
                          alt={item.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">{item.name}</p>
                        <p className="font-bold">Rs. {item.price}</p>
                      </div>
                      <div className="flex gap-2">
                        <button className="w-8 h-8 rounded-full bg-[var(--background)] flex items-center justify-center">
                          <ShoppingBag className="w-4 h-4" />
                        </button>
                        <button className="w-8 h-8 rounded-full bg-[var(--background)] flex items-center justify-center text-red-500">
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-4">Create New List</h3>
                <div className="bg-[var(--card-darker)] p-4 rounded-lg">
                  <div className="flex gap-2 mb-4">
                    <input
                      type="text"
                      placeholder="List name"
                      className="flex-1 bg-[var(--background)] text-[var(--foreground)] px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
                    />
                    <button className="bg-[var(--accent)] text-[var(--background)] px-4 py-2 rounded-lg">Create</button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeSection === "feedback" && (
            <div>
              <h2 className="text-xl font-bold mb-6">Feedback & Questions</h2>

              <div className="mb-8">
                <h3 className="text-lg font-medium mb-4">Product Reviews</h3>
                <div className="bg-[var(--card-darker)] p-4 rounded-lg mb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} className="w-4 h-4 fill-[var(--accent)] text-[var(--accent)]" />
                      ))}
                    </div>
                    <p className="text-sm font-medium">Monstera Deliciosa</p>
                  </div>
                  <p className="text-sm text-[var(--muted-foreground)] mb-2">
                    "Beautiful plant, arrived in perfect condition. Very happy with my purchase!"
                  </p>
                  <p className="text-xs text-[var(--muted-foreground)]">Posted on May 15, 2024</p>
                </div>

                <div className="bg-[var(--card-darker)] p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex">
                      {[1, 2, 3, 4].map((star) => (
                        <Star key={star} className="w-4 h-4 fill-[var(--accent)] text-[var(--accent)]" />
                      ))}
                      <Star className="w-4 h-4 text-[var(--muted-foreground)]" />
                    </div>
                    <p className="text-sm font-medium">Snake Plant</p>
                  </div>
                  <p className="text-sm text-[var(--muted-foreground)] mb-2">
                    "Great plant for beginners. Shipping was a bit slow but the plant is thriving."
                  </p>
                  <p className="text-xs text-[var(--muted-foreground)]">Posted on April 10, 2024</p>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-4">Ask a Question</h3>
                <div className="bg-[var(--card-darker)] p-4 rounded-lg">
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium mb-1">
                        Subject
                      </label>
                      <input
                        type="text"
                        id="subject"
                        className="w-full bg-[var(--background)] text-[var(--foreground)] px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
                      />
                    </div>
                    <div>
                      <label htmlFor="question" className="block text-sm font-medium mb-1">
                        Your Question
                      </label>
                      <textarea
                        id="question"
                        rows={4}
                        className="w-full bg-[var(--background)] text-[var(--foreground)] px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
                      ></textarea>
                    </div>
                    <button className="bg-[var(--accent)] text-[var(--background)] px-4 py-2 rounded-lg">
                      Submit Question
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeSection === "addresses" && (
            <div>
              <h2 className="text-xl font-bold mb-6">My Addresses</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                {mockAddresses.map((address) => (
                  <div key={address.id} className="bg-[var(--card-darker)] p-4 rounded-lg relative">
                    {address.default && (
                      <span className="absolute top-2 right-2 text-xs bg-[var(--accent)] text-[var(--background)] px-2 py-1 rounded-full">
                        Default
                      </span>
                    )}
                    <p className="font-medium mb-1">{address.type}</p>
                    <p className="text-sm text-[var(--muted-foreground)] mb-4">{address.address}</p>
                    <div className="flex gap-2">
                      <button className="text-xs border border-[var(--accent)] text-[var(--accent)] px-3 py-1 rounded-full">
                        Edit
                      </button>
                      {!address.default && (
                        <button className="text-xs border border-[var(--accent)] text-[var(--accent)] px-3 py-1 rounded-full">
                          Set as Default
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div>
                <h3 className="text-lg font-medium mb-4">Add New Address</h3>
                <div className="bg-[var(--card-darker)] p-4 rounded-lg">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label htmlFor="addressType" className="block text-sm font-medium mb-1">
                        Address Type
                      </label>
                      <select
                        id="addressType"
                        className="w-full bg-[var(--background)] text-[var(--foreground)] px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
                      >
                        <option>Home</option>
                        <option>Work</option>
                        <option>Other</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="fullName" className="block text-sm font-medium mb-1">
                        Full Name
                      </label>
                      <input
                        type="text"
                        id="fullName"
                        className="w-full bg-[var(--background)] text-[var(--foreground)] px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label htmlFor="streetAddress" className="block text-sm font-medium mb-1">
                        Street Address
                      </label>
                      <input
                        type="text"
                        id="streetAddress"
                        className="w-full bg-[var(--background)] text-[var(--foreground)] px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
                      />
                    </div>
                    <div>
                      <label htmlFor="city" className="block text-sm font-medium mb-1">
                        City
                      </label>
                      <input
                        type="text"
                        id="city"
                        className="w-full bg-[var(--background)] text-[var(--foreground)] px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
                      />
                    </div>
                    <div>
                      <label htmlFor="postalCode" className="block text-sm font-medium mb-1">
                        Postal Code
                      </label>
                      <input
                        type="text"
                        id="postalCode"
                        className="w-full bg-[var(--background)] text-[var(--foreground)] px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
                      />
                    </div>
                  </div>
                  <div className="flex items-center gap-2 mb-4">
                    <input type="checkbox" id="defaultAddress" className="accent-[var(--accent)]" />
                    <label htmlFor="defaultAddress" className="text-sm">
                      Set as default address
                    </label>
                  </div>
                  <button className="bg-[var(--accent)] text-[var(--background)] px-4 py-2 rounded-lg">
                    Save Address
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeSection === "giftcards" && (
            <div>
              <h2 className="text-xl font-bold mb-6">Gift Cards</h2>

              <div className="mb-8">
                <h3 className="text-lg font-medium mb-4">Your Gift Cards</h3>
                <div className="bg-[var(--card-darker)] p-6 rounded-lg text-center">
                  <Gift className="w-12 h-12 mx-auto mb-2 text-[var(--accent)]" />
                  <p className="mb-2">You don't have any gift cards yet</p>
                  <p className="text-sm text-[var(--muted-foreground)] mb-4">
                    Gift cards will appear here once you receive or purchase them
                  </p>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-4">Redeem a Gift Card</h3>
                <div className="bg-[var(--card-darker)] p-4 rounded-lg">
                  <div className="flex gap-2 mb-4">
                    <input
                      type="text"
                      placeholder="Enter gift card code"
                      className="flex-1 bg-[var(--background)] text-[var(--foreground)] px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
                    />
                    <button className="bg-[var(--accent)] text-[var(--background)] px-4 py-2 rounded-lg">Redeem</button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeSection === "messages" && (
            <div>
              <h2 className="text-xl font-bold mb-6">Messages</h2>

              <div className="space-y-4">
                {mockMessages.map((message) => (
                  <div
                    key={message.id}
                    className={`bg-[var(--card-darker)] p-4 rounded-lg ${!message.read ? "border-l-4 border-[var(--accent)]" : ""}`}
                  >
                    <div className="flex flex-wrap justify-between items-center gap-2 mb-1">
                      <p className={`font-medium ${!message.read ? "font-bold" : ""}`}>{message.subject}</p>
                      <p className="text-xs text-[var(--muted-foreground)]">{message.date}</p>
                    </div>
                    <div className="flex justify-between items-center">
                      <p className="text-sm text-[var(--muted-foreground)]">
                        {!message.read && (
                          <span className="inline-block w-2 h-2 bg-[var(--accent)] rounded-full mr-2"></span>
                        )}
                        {message.read ? "Read" : "Unread"}
                      </p>
                      <button className="text-xs border border-[var(--accent)] text-[var(--accent)] px-3 py-1 rounded-full">
                        View
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeSection === "visits" && (
            <div>
              <h2 className="text-xl font-bold mb-6">Recent Visits</h2>

              <div className="space-y-4">
                {mockVisits.map((visit) => (
                  <div key={visit.id} className="bg-[var(--card-darker)] p-4 rounded-lg flex items-center gap-4">
                    <div className="relative w-16 h-16 rounded-md overflow-hidden bg-[var(--background)]">
                      <Image
                        src={`/placeholder.svg?height=64&width=64`}
                        alt={visit.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">{visit.name}</p>
                      <p className="text-sm text-[var(--muted-foreground)]">Viewed on {visit.date}</p>
                    </div>
                    <Link
                      href={`/shop/${visit.id}`}
                      className="text-xs bg-[var(--accent)] text-[var(--background)] px-3 py-1 rounded-full"
                    >
                      View Again
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeSection === "account" && (
            <div>
              <h2 className="text-xl font-bold mb-6">Account Information</h2>

              <div className="mb-8">
                <h3 className="text-lg font-medium mb-4">Profile Picture</h3>
                <div className="bg-[var(--card-darker)] p-4 rounded-lg flex flex-col items-center sm:items-start">
                  <ProfileImageUpload currentImage={user.avatar} onImageChange={updateProfileImage} />
                  <p className="text-sm text-[var(--muted-foreground)] mt-4">
                    Recommended: Square image, at least 200x200 pixels. Maximum file size: 5MB.
                  </p>
                </div>
              </div>

              <div className="mb-8">
                <h3 className="text-lg font-medium mb-4">Personal Information</h3>
                <div className="bg-[var(--card-darker)] p-4 rounded-lg">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label htmlFor="fullName" className="block text-sm font-medium mb-1">
                        Full Name
                      </label>
                      <input
                        type="text"
                        id="fullName"
                        defaultValue={user.name}
                        className="w-full bg-[var(--background)] text-[var(--foreground)] px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium mb-1">
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="email"
                        defaultValue={user.email}
                        className="w-full bg-[var(--background)] text-[var(--foreground)] px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
                      />
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium mb-1">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        defaultValue="+1 (555) 123-4567"
                        className="w-full bg-[var(--background)] text-[var(--foreground)] px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
                      />
                    </div>
                    <div>
                      <label htmlFor="birthdate" className="block text-sm font-medium mb-1">
                        Date of Birth
                      </label>
                      <input
                        type="date"
                        id="birthdate"
                        className="w-full bg-[var(--background)] text-[var(--foreground)] px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
                      />
                    </div>
                  </div>
                  <button className="bg-[var(--accent)] text-[var(--background)] px-4 py-2 rounded-lg">
                    Save Changes
                  </button>
                </div>
              </div>

              <div className="mb-8">
                <h3 className="text-lg font-medium mb-4">Change Password</h3>
                <div className="bg-[var(--card-darker)] p-4 rounded-lg">
                  <div className="space-y-4 mb-4">
                    <div>
                      <label htmlFor="currentPassword" className="block text-sm font-medium mb-1">
                        Current Password
                      </label>
                      <input
                        type="password"
                        id="currentPassword"
                        className="w-full bg-[var(--background)] text-[var(--foreground)] px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
                      />
                    </div>
                    <div>
                      <label htmlFor="newPassword" className="block text-sm font-medium mb-1">
                        New Password
                      </label>
                      <input
                        type="password"
                        id="newPassword"
                        className="w-full bg-[var(--background)] text-[var(--foreground)] px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
                      />
                    </div>
                    <div>
                      <label htmlFor="confirmPassword" className="block text-sm font-medium mb-1">
                        Confirm New Password
                      </label>
                      <input
                        type="password"
                        id="confirmPassword"
                        className="w-full bg-[var(--background)] text-[var(--foreground)] px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
                      />
                    </div>
                  </div>
                  <button className="bg-[var(--accent)] text-[var(--background)] px-4 py-2 rounded-lg">
                    Update Password
                  </button>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-4">Notification Preferences</h3>
                <div className="bg-[var(--card-darker)] p-4 rounded-lg">
                  <div className="space-y-3 mb-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Order Updates</p>
                        <p className="text-sm text-[var(--muted-foreground)]">
                          Receive notifications about your orders
                        </p>
                      </div>
                      <div className="relative inline-block w-12 h-6 rounded-full bg-[var(--background)]">
                        <input type="checkbox" id="orderUpdates" className="sr-only" defaultChecked />
                        <span className="block w-6 h-6 absolute left-0 top-0 rounded-full bg-[var(--accent)] transition-transform transform translate-x-6"></span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Promotions</p>
                        <p className="text-sm text-[var(--muted-foreground)]">
                          Receive emails about sales and special offers
                        </p>
                      </div>
                      <div className="relative inline-block w-12 h-6 rounded-full bg-[var(--background)]">
                        <input type="checkbox" id="promotions" className="sr-only" defaultChecked />
                        <span className="block w-6 h-6 absolute left-0 top-0 rounded-full bg-[var(--accent)] transition-transform transform translate-x-6"></span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Plant Care Reminders</p>
                        <p className="text-sm text-[var(--muted-foreground)]">
                          Receive reminders to water and care for your plants
                        </p>
                      </div>
                      <div className="relative inline-block w-12 h-6 rounded-full bg-[var(--background)]">
                        <input type="checkbox" id="careReminders" className="sr-only" />
                        <span className="block w-6 h-6 absolute left-0 top-0 rounded-full bg-[var(--background)] border border-[var(--muted-foreground)] transition-transform"></span>
                      </div>
                    </div>
                  </div>
                  <button className="bg-[var(--accent)] text-[var(--background)] px-4 py-2 rounded-lg">
                    Save Preferences
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
