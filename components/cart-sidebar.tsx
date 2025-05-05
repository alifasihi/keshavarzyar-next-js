"use client"

import { X, Minus, Plus, Trash2 } from "lucide-react"
import Image from "next/image"
import { useCart } from "@/context/cart-context"
import Link from "next/link"

type CartSidebarProps = {
  isOpen: boolean
  onClose: () => void
}

export default function CartSidebar({ isOpen, onClose }: CartSidebarProps) {
  const { cart, updateQuantity, removeFromCart } = useCart()

  const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0)

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div className="fixed inset-0 bg-black bg-opacity-50" onClick={onClose}></div>
      <div className="relative w-full max-w-md bg-[var(--background)] h-full overflow-auto shadow-xl theme-transition">
        <div className="p-4 border-b border-[var(--border)] flex justify-between items-center">
          <h2 className="text-xl font-bold">سبد خرید شما ({cart.length})</h2>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-[var(--card)]">
            <X className="w-5 h-5" />
          </button>
        </div>

        {cart.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64">
            <p className="text-gray-400 mb-4">سبد خرید شما خالی است</p>
            <Link
              href="/shop"
              onClick={onClose}
              className="bg-[#fff84e] text-[#1b2316] px-4 py-2 rounded-full font-medium hover:opacity-90 transition-opacity"
            >
              ادامه خرید
            </Link>
          </div>
        ) : (
          <>
            <div className="p-4 space-y-4">
              {cart.map((item) => (
                <div key={item.id} className="flex gap-4 p-3 bg-[var(--card)] rounded-lg theme-transition">
                  <div className="relative w-20 h-20 rounded-md overflow-hidden bg-[var(--card-darker)]">
                    <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <h3 className="font-medium">{item.name}</h3>
                      <button onClick={() => removeFromCart(item.id)} className="text-gray-400 hover:text-red-500">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    <p className="text-sm text-gray-400">{item.description.substring(0, 30)}...</p>
                    <div className="flex justify-between items-center mt-2">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-6 h-6 rounded-full bg-[var(--card-darker)] flex items-center justify-center"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-sm">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-6 h-6 rounded-full bg-[var(--card-darker)] flex items-center justify-center"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                      <p className="font-bold">Rs. {item.price}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-4 border-t border-[#222c1d]">
              <div className="flex justify-between mb-2">
                <span className="text-gray-400">جمع کل</span>
                <span className="font-bold">ریال {totalPrice}</span>
              </div>
              <div className="flex justify-between mb-4">
                <span className="text-gray-400">هزینه ارسال</span>
                <span className="font-bold">ریال ۱۵۰</span>
              </div>
              <div className="flex justify-between mb-6 text-lg">
                <span>مبلغ قابل پرداخت</span>
                <span className="font-bold">ریال {totalPrice + 150}</span>
              </div>
              <Link
                href="/checkout"
                onClick={onClose}
                className="block w-full bg-[var(--accent)] text-[var(--background)] px-4 py-3 rounded-full font-medium hover:opacity-90 transition-opacity text-center"
              >
                تسویه حساب
              </Link>
              <button
                onClick={onClose}
                className="block w-full mt-2 border border-[var(--accent)] text-[var(--accent)] px-4 py-3 rounded-full font-medium hover:bg-opacity-10 transition-colors text-center"
              >
                ادامه خرید
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
