import Image from "next/image"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { careGuides } from "@/lib/data"

export default function CareGuidePage({ params }: { params: { id: string } }) {
  const guideId = Number.parseInt(params.id)
  const guide = careGuides.find((g) => g.id === guideId)

  if (!guide) {
    return (
      <div className="container py-12 text-center">
        <h1 className="text-2xl font-bold mb-4">Guide not found</h1>
        <p className="mb-6">Sorry, we couldn't find the care guide you're looking for.</p>
        <Link
          href="/pistachio-care"
          className="inline-block bg-[#48da4b] text-[#1b2316] px-4 py-2 rounded-full font-medium hover:opacity-90 transition-opacity"
        >
          Back to Pistachio Care
        </Link>
      </div>
    )
  }

  return (
    <div className="container py-8">
      <Link href="/pistachio-care" className="inline-flex items-center text-gray-400 hover:text-white mb-6">
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Pistachio Care
      </Link>

      <div className="text-center">
        <article className="max-w-3xl mx-auto">
          <div className="relative h-[300px] rounded-xl overflow-hidden mb-8">
            <Image src={guide.image || "/placeholder.svg"} alt={guide.title} fill className="object-cover" />
          </div>

          <div className="flex items-center gap-2 mb-4">
            <span className="bg-[#222c1d] text-xs px-3 py-1 rounded-full">{guide.category}</span>
          </div>

          <h1 className="text-3xl font-bold mb-6">{guide.title}</h1>

          <div className="prose prose-invert max-w-none">
            <p className="text-gray-300 text-lg mb-6">{guide.description}</p>

            {guide.content.split(". ").map((sentence, index) => {
              // Check if the sentence contains a section title (e.g., "Watering:")
              if (sentence.includes(":")) {
                const [title, content] = sentence.split(":")
                return (
                  <div key={index} className="mb-6">
                    <h3 className="text-xl font-bold mb-2">{title.trim()}</h3>
                    <p className="text-gray-300">{content.trim()}</p>
                  </div>
                )
              }
              return (
                <p key={index} className="text-gray-300 mb-4">
                  {sentence.trim()}.
                </p>
              )
            })}
          </div>

          <div className="mt-12 bg-[#222c1d] rounded-xl p-6">
            <h3 className="text-xl font-bold mb-4">Was this guide helpful?</h3>
            <div className="flex gap-4">
              <button className="bg-[#48da4b] text-[#1b2316] px-4 py-2 rounded-full font-medium hover:opacity-90 transition-opacity">
                Yes, it helped!
              </button>
              <button className="border border-[#48da4b] text-[#48da4b] px-4 py-2 rounded-full font-medium hover:bg-[#48da4b]/10 transition-colors">
                I need more help
              </button>
            </div>
          </div>
        </article>
      </div>
    </div>
  )
}
