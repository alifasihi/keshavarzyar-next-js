import Image from "next/image"
import Link from "next/link"
import { careGuides } from "@/lib/data"

export default function PistachioCarePage() {
  return (
    <div className="container py-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-8">راهنمای مراقبت از مزارع پسته</h1>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">درختان پسته خود را سرزنده نگه دارید</h2>
            <p className="text-gray-300">
              مراقبت صحیح از گیاهان برای حفظ گیاهان سالم و سرزنده ضروری است. راهنماهای جامع ما همه چیز را پوشش می‌دهد،
              از آبیاری و نیازهای نوری گرفته تا مدیریت آفات و مراقبت فصلی.
            </p>
            <p className="text-gray-300">
              چه مبتدی باشید و چه یک والد گیاه با تجربه، نکات متخصص ما به دوستان سبز شما کمک می‌کند تا رشد کنند.
            </p>
            <Link
              href="/shop"
              className="inline-block bg-[#48da4b] text-[#1b2316] px-4 py-2 rounded-full font-medium hover:opacity-90 transition-opacity mt-2"
            >
              خرید گیاهان
            </Link>
          </div>
          <div className="relative h-[300px] rounded-xl overflow-hidden">
            <Image src="/placeholder.svg?height=300&width=600" alt="مراقبت از مزارع پسته" fill className="object-cover" />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {careGuides.map((guide) => (
            <Link key={guide.id} href={`/pistachio-care/${guide.id}`}>
              <div className="bg-[#222c1d] rounded-xl overflow-hidden hover:opacity-90 transition-opacity">
                <div className="relative h-[200px]">
                  <Image src={guide.image} alt={guide.title} fill className="object-cover" />
                </div>
                <div className="p-6 space-y-4">
                  <div className="flex items-center gap-2">
                    <span className="bg-[#1b2316] text-xs px-3 py-1 rounded-full">{guide.category}</span>
                  </div>
                  <h3 className="text-xl font-bold">{guide.title}</h3>
                  <p className="text-gray-300">{guide.description}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-12 bg-[#171f12] rounded-xl p-8">
          <h2 className="text-2xl font-bold mb-4">سوالی در مورد مراقبت از مزارع پسته دارید؟</h2>
          <p className="text-gray-300 mb-6">
            متخصصان گیاهان ما اینجا هستند تا کمک کنند. سوالات خود را برای ما ارسال کنید و ما با راهنمایی شخصی‌سازی شده به شما پاسخ خواهیم داد.
          </p>
          <form className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-1">
                  نام
                </label>
                <input
                  type="text"
                  id="name"
                  className="w-full bg-[#222c1d] text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#48da4b]"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-1">
                  ایمیل
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full bg-[#222c1d] text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#48da4b]"
                />
              </div>
            </div>
            <div>
              <label htmlFor="question" className="block text-sm font-medium mb-1">
                سوال شما
              </label>
              <textarea
                id="question"
                rows={4}
                className="w-full bg-[#222c1d] text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#48da4b]"
              ></textarea>
            </div>
            <button
              type="submit"
              className="bg-[#48da4b] text-[#1b2316] px-6 py-2 rounded-full font-medium hover:opacity-90 transition-opacity"
            >
              ارسال سوال
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
