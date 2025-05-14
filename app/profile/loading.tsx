export default function Loading() {
  return (
    <div className="container py-8">
      <div className="h-8 w-48 bg-[var(--card)] rounded animate-pulse mb-8"></div>

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="lg:w-64 space-y-2">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item) => (
            <div key={item} className="h-12 bg-[var(--card)] rounded animate-pulse"></div>
          ))}
        </div>

        <div className="flex-1 h-[600px] bg-[var(--card)] rounded animate-pulse"></div>
      </div>
    </div>
  )
}
