import Image from "next/image"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { blogs } from "@/lib/data"

export default function BlogPostPage({ params }: { params: { id: string } }) {
  const blogId = Number.parseInt(params.id)
  const blog = blogs.find((b) => b.id === blogId)

  if (!blog) {
    return (
      <div className="container py-12 text-center">
        <h1 className="text-2xl font-bold mb-4">Blog post not found</h1>
        <p className="mb-6">Sorry, we couldn't find the blog post you're looking for.</p>
        <Link
          href="/blogs"
          className="inline-block bg-[#fff84e] text-[#1b2316] px-4 py-2 rounded-full font-medium hover:opacity-90 transition-opacity"
        >
          Back to Blogs
        </Link>
      </div>
    )
  }

  // Get related blog posts (same category)
  const relatedBlogs = blogs.filter((b) => b.category === blog.category && b.id !== blog.id).slice(0, 2)

  return (
    <div className="container py-8">
      <Link href="/blogs" className="inline-flex items-center text-gray-400 hover:text-white mb-6">
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Blogs
      </Link>

      <div className="text-center">
        <article className="max-w-3xl mx-auto">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-sm text-gray-400">{blog.date}</span>
            <span className="bg-[#222c1d] text-xs px-3 py-1 rounded-full">{blog.category}</span>
          </div>

          <h1 className="text-3xl font-bold mb-6">{blog.title}</h1>

          <div className="flex items-center gap-2 mb-8">
            <div className="w-8 h-8 rounded-full bg-gray-600"></div>
            <span className="text-sm">By {blog.author}</span>
          </div>

          <div className="relative h-[400px] rounded-xl overflow-hidden mb-8">
            <Image src={blog.image.startsWith('/public') ? blog.image.replace('/public', '') : blog.image || "/placeholder.svg"} alt={blog.title} fill className="object-cover" />
          </div>

          <div className="prose prose-invert max-w-none">
            {blog.content.split(". ").map((sentence, index) => {
              // Check if the sentence contains a number followed by a period (like "1.")
              if (/^\d+\./.test(sentence.trim())) {
                return (
                  <div key={index} className="flex gap-2 mb-4">
                    <div className="font-bold">{sentence.trim().split(" ")[0]}</div>
                    <div className="text-gray-300">{sentence.trim().split(" ").slice(1).join(" ")}.</div>
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

          <div className="flex items-center justify-between mt-8 pt-8 border-t border-[#222c1d]">
            <div className="flex gap-2">
              <button className="bg-[#222c1d] px-3 py-1 rounded-full text-sm">Plants</button>
              <button className="bg-[#222c1d] px-3 py-1 rounded-full text-sm">Care</button>
              <button className="bg-[#222c1d] px-3 py-1 rounded-full text-sm">Tips</button>
            </div>
            <div className="flex gap-2">
              <button className="w-8 h-8 rounded-full bg-[#222c1d] flex items-center justify-center">
                <span className="text-xs">FB</span>
              </button>
              <button className="w-8 h-8 rounded-full bg-[#222c1d] flex items-center justify-center">
                <span className="text-xs">TW</span>
              </button>
              <button className="w-8 h-8 rounded-full bg-[#222c1d] flex items-center justify-center">
                <span className="text-xs">IG</span>
              </button>
            </div>
          </div>
        </article>
      </div>

      {relatedBlogs.length > 0 && (
        <section className="max-w-3xl mx-auto mt-12">
          <h2 className="text-2xl font-bold mb-6">Related Articles</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {relatedBlogs.map((blog) => (
              <div key={blog.id} className="bg-[#222c1d] rounded-xl overflow-hidden">
                <div className="relative h-[160px]">
                  <Image src={blog.image.startsWith('/public') ? blog.image.replace('/public', '') : blog.image || "/placeholder.svg"} alt={blog.title} fill className="object-cover" />
                </div>
                <div className="p-4 space-y-2">
                  <span className="text-xs text-gray-400">{blog.date}</span>
                  <h3 className="font-bold">{blog.title}</h3>
                  <Link href={`/blogs/${blog.id}`} className="inline-block text-[#fff84e] text-sm hover:underline">
                    Read More
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
