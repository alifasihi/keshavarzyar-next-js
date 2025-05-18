"use client"

import Image from "next/image"
import Link from "next/link"
import { Star } from "lucide-react"
import "./globals.css"

import PistachioCard from "@/components/pistachio-card"
import { pistachios as rawpistachios } from "@/lib/data"

// Ensure all pistachio prices are numbers
const pistachios = rawpistachios.map((pistachio) => ({
  ...pistachio,
  price: typeof pistachio.price === "string" ? parseFloat(pistachio.price) : pistachio.price,
}));
import mainPic from "/public/image/main-pic.jpg"
import AkbariPistachio from "/public/image/RawPistachioImages/Akbari.png"
import RandomUser from "@/components/ui/random-user"

export default function Home() {
  // Featured pistachios
  const featuredpistachios = pistachios.slice(0, 3)
  // Top selling pistachios
  const topSellingpistachios = pistachios.slice(3, 9)

  return (
    <div>
      <section className="container py-12">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="space-y-6">
            <h1 className="text-4xl md:text-5xl font-bold">پستاک</h1>
            <p className="text-gray-500 max-w-md">
              پسته‌ای که دنبالش بودید همین‌جاست؛ با تنوعی از طعم‌ها و قیمت‌ها، برای هر سلیقه و بودجه‌ای.
            </p>
            <div className="flex gap-4">
              <Link
                href="/shop"
                className="bg-[#48da4b] text-[#1b2316] px-4 py-2 rounded-full font-medium hover:opacity-90 transition-opacity"
              >
                خرید کنید
              </Link>
              <Link
                href="/pistachio-care"
                className="border border-[#48da4b] text-[#48da4b] px-4 py-2 rounded-full font-medium hover:bg-[#48da4b]/10 transition-colors"
              >
                بیشتر بدانید
              </Link>
            </div>
            <div className="flex items-center gap-2">
              {[...Array(3)].map((_, index) => (
                <RandomUser key={index} />
              ))}
              <div>
                <p className="text-sm font-medium">۲.۵ هزار+ نفر</p>
                <p className="text-xs text-gray-400">مشتریان راضی</p>
              </div>
            </div>
          </div>
          <div className="relative h-[600px] rounded-2xl overflow-hidden">
            <Image
              src={mainPic}
              alt="گیاهان آپارتمانی"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>

      <section className="container py-12">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold">محصولات ویژه</h2>
          <Link
            href="/shop"
            className="text-[#48da4b] hover:underline"
          >
            مشاهده همه
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {featuredpistachios.map((pistachio) => (
            <PistachioCard key={pistachio.id} pistachio={pistachio} />
          ))}
        </div>
      </section>

      <section className="container py-12">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold">پرفروش‌ترین‌ها</h2>
          <Link
            href="/shop"
            className="text-[#48da4b] hover:underline"
          >
            مشاهده همه
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {topSellingpistachios.map((pistachio) => (
            <PistachioCard key={pistachio.id} pistachio={pistachio} />
          ))}
        </div>
      </section>

      <section className="container py-12">
        <div className="bg-[#222c1d] rounded-2xl overflow-hidden p-8">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="relative h-[300px] w-full">
              <Image
                src={AkbariPistachio}
                alt="گیاه تزئینی بزرگ"
                fill
                className="object-contain"
              />
            </div>
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-[#48da4b]">ما رشد می‌کنیم، رشد می‌دهیم و بهترین گیاهان را داریم</h3>
              <p className="text-gray-300">
                گیاهان ما با دقت انتخاب و پرورش داده می‌شوند تا در خانه شما رشد کنند. ما دستورالعمل‌های مراقبت دقیق و پشتیبانی مداوم ارائه می‌دهیم تا به شما در نگهداری از دوستان سبزتان کمک کنیم.
              </p>
              <p className="text-gray-300">
                با سال‌ها تجربه در کشت گیاهان، ما می‌دانیم چه چیزی هر گونه را منحصر به فرد می‌کند و چگونه به آنها در محیط‌های مختلف کمک کنیم تا رشد کنند.
              </p>
              <Link
                href="/about"
                className="inline-block bg-[#48da4b] text-[#1b2316] px-4 py-2 rounded-full font-medium hover:opacity-90 transition-opacity"
              >
                بیشتر بدانید
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
