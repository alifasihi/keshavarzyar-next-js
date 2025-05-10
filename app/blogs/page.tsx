"use client";
import Image from "next/image"
import Link from "next/link"
import { blogs } from "@/lib/data"

import blogMainPic from "/public/blogImages/blog-pic-main.jpg"
import blogPic1 from "/public/blogImages/blogPic-1.jpg"
import blogPic2 from "/public/blogImages/blogPic-2.jpg"
import blogPic3 from "/public/blogImages/blogPic-3.jpg"
import blogPic4 from "/public/blogImages/blogPic-4.jpg"

import { Pistachio, useCart } from "@/context/cart-context"
import { useState } from "react"

type BlogCardProps = {
  pistachio: Pistachio
  size?: "small" | "medium" | "large"
  index?: number
}

const images = [blogPic1,blogPic2,blogPic3,blogPic4]



export default function BlogsPage({ pistachio, size = "medium", index = 0 }: BlogCardProps) {
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
    const imageSrc = imageError ? "/public/blogImages/blog-pic-main.jpg" : (pistachio?.image || fallbackImage)

  return (
    <div className="text-center">
      <div className="container py-8 px-4 sm:px-6">
        <h1 className="text-3xl font-bold mb-8 text-center sm:text-left">وبلاگ گیاهان</h1>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-center sm:text-left">آخرین نکات و الهام‌های گیاهی</h2>
            <p className="text-gray-500 text-center sm:text-left">
              آخرین روندها در باغبانی داخلی، نکات مراقبت از مزارع پسته توسط متخصصان و ایده‌های الهام‌بخش برای دگرگونی فضای خود با گیاهان را کشف کنید.
            </p>
            <p className="text-gray-500 text-center sm:text-left">
              وبلاگ ما به طور منظم با محتوای متخصصان و علاقه‌مندان به گیاهان به‌روزرسانی می‌شود تا در سفر گیاهی شما کمک کند.
            </p>
          </div>
          <div className="relative h-[200px] sm:h-[300px] rounded-xl overflow-hidden">
            <Image src={blogMainPic} alt="وبلاگ گیاهان" fill className="object-cover" />
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-8">
          {blogs.map((blog) => (
            <div key={blog.id} className="bg-[#222c1d] rounded-xl overflow-hidden">
              <div className="relative h-[150px] sm:h-[200px]">
                <Image src={blog.image.startsWith('/public') ? blog.image.replace('/public', '') : blog.image || blogMainPic} alt={blog.title} fill className="object-cover" />
              </div>
              <div className="p-4 sm:p-6 space-y-4">
                <div className="flex justify-between items-start">
                  <span className="text-sm text-gray-400">{blog.date}</span>
                  <span className="bg-[#48da4b] text-xs px-3 py-1 rounded-full">{blog.category}</span>
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-[#48da4b]">{blog.title}</h3>
                <p className="text-gray-300 text-sm sm:text-base">{blog.excerpt}</p>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-400">نویسنده: {blog.author}</span>
                  <Link
                    href={`/blogs/${blog.id}`}
                    className="inline-block border border-[#48da4b] text-[#48da4b] px-4 py-2 rounded-full font-medium hover:bg-[#48da4b]/10 transition-colors"
                  >
                    ادامه مطلب
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 bg-[#171f12] rounded-xl p-6 sm:p-8">
          <h2 className="text-xl sm:text-2xl font-bold mb-4 text-center sm:text-left">عضویت در خبرنامه ما</h2>
          <p className="text-gray-300 mb-6 text-center sm:text-left">
            آخرین نکات مراقبت از مزارع پسته، به‌روزرسانی‌های وبلاگ و پیشنهادات ویژه را مستقیماً در صندوق ورودی خود دریافت کنید.
          </p>
          <form className="flex flex-col sm:flex-row gap-4">
            <input
              type="email"
              placeholder="آدرس ایمیل شما"
              className="flex-1 bg-[#222c1d] text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#48da4b]"
            />
            <button
              type="submit"
              className="bg-[#48da4b] text-[#1b2316] px-6 py-2 rounded-full font-medium hover:opacity-90 transition-opacity whitespace-nowrap"
            >
              عضویت
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
