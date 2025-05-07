"use client"

import Image from "next/image"
import Link from "next/link"
import { Star } from "lucide-react"
import PlantCard from "@/components/plant-card"
import { plants } from "@/lib/data"
import mainPic from "/public/image/main-pic.svg"
import EpipremnumAureum from "/public/image/Epipremnum-aureum.svg"
import RandomUser from "@/components/ui/random-user"

export default function Home() {
  // Featured plants
  const featuredPlants = plants.slice(0, 3)
  // Top selling plants
  const topSellingPlants = plants.slice(3, 9)

  return (
    <div>
      <section className="container py-12">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="space-y-6">
            <h1 className="text-4xl md:text-5xl font-bold">نفس طبیعی</h1>
            <p className="text-gray-300 max-w-md">
              گیاه مناسب خانه خود را پیدا کنید. ما تنوع گسترده‌ای از گیاهان داریم که با سلیقه و بودجه شما سازگار هستند.
            </p>
            <div className="flex gap-4">
              <Link
                href="/shop"
                className="bg-[#fff84e] text-[#1b2316] px-4 py-2 rounded-full font-medium hover:opacity-90 transition-opacity"
              >
                خرید کنید
              </Link>
              <Link
                href="/plant-care"
                className="border border-[#fff84e] text-[#fff84e] px-4 py-2 rounded-full font-medium hover:bg-[#fff84e]/10 transition-colors"
              >
                بیشتر بدانید
              </Link>
            </div>
            <div className="flex items-center gap-2">
              <RandomUser />
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
          <h2 className="text-2xl font-bold">گیاهان ویژه</h2>
          <Link
            href="/shop"
            className="text-[#fff84e] hover:underline"
          >
            مشاهده همه
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {featuredPlants.map((plant) => (
            <PlantCard key={plant.id} plant={plant} />
          ))}
        </div>
      </section>

      <section className="container py-12">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold">پرفروش‌ترین‌ها</h2>
          <Link
            href="/shop"
            className="text-[#fff84e] hover:underline"
          >
            مشاهده همه
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {topSellingPlants.map((plant) => (
            <PlantCard key={plant.id} plant={plant} />
          ))}
        </div>
      </section>

      <section className="container py-12">
        <div className="bg-[#222c1d] rounded-2xl overflow-hidden p-8">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="relative h-[300px] w-full">
              <Image
                src={EpipremnumAureum}
                alt="گیاه تزئینی بزرگ"
                fill
                className="object-contain"
              />
            </div>
            <div className="space-y-4">
              <h3 className="text-xl font-bold">ما رشد می‌کنیم، رشد می‌دهیم و بهترین گیاهان را داریم</h3>
              <p className="text-gray-300">
                گیاهان ما با دقت انتخاب و پرورش داده می‌شوند تا در خانه شما رشد کنند. ما دستورالعمل‌های مراقبت دقیق و پشتیبانی مداوم ارائه می‌دهیم تا به شما در نگهداری از دوستان سبزتان کمک کنیم.
              </p>
              <p className="text-gray-300">
                با سال‌ها تجربه در کشت گیاهان، ما می‌دانیم چه چیزی هر گونه را منحصر به فرد می‌کند و چگونه به آنها در محیط‌های مختلف کمک کنیم تا رشد کنند.
              </p>
              <Link
                href="/about"
                className="inline-block bg-[#fff84e] text-[#1b2316] px-4 py-2 rounded-full font-medium hover:opacity-90 transition-opacity"
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
