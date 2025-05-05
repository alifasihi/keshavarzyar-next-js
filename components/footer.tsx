import Link from "next/link"

export default function Footer() {
  return (
    <footer className="bg-[var(--card-darker)] py-12 mt-12 theme-transition">
      <div className="container">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-[var(--accent)] rounded-full flex items-center justify-center">
                <span className="text-[var(--background)] font-bold">P</span>
              </div>
              <span className="font-bold text-lg">Plantio.</span>
            </div>
            <p className="text-sm text-[var(--muted-foreground)] mb-4">
              گیاه مناسب خانه خود را پیدا کنید. ما تنوع گسترده‌ای از گیاهان داریم که با سلیقه و بودجه شما سازگار هستند.
            </p>
            <div className="flex gap-2">
              <button className="w-8 h-8 rounded-full bg-[var(--card)] flex items-center justify-center">
                <span className="text-xs">FB</span>
              </button>
              <button className="w-8 h-8 rounded-full bg-[var(--card)] flex items-center justify-center">
                <span className="text-xs">IG</span>
              </button>
              <button className="w-8 h-8 rounded-full bg-[var(--card)] flex items-center justify-center">
                <span className="text-xs">TW</span>
              </button>
            </div>
          </div>

          <div>
            <h4 className="font-bold mb-4">دسترسی سریع</h4>
            <ul className="space-y-2 text-sm text-[var(--muted-foreground)]">
              <li>
                <Link href="/" className="hover:text-[var(--accent)]">
                  خانه
                </Link>
              </li>
              <li>
                <Link href="/shop" className="hover:text-[var(--accent)]">
                  فروشگاه
                </Link>
              </li>
              <li>
                <Link href="/plant-care" className="hover:text-[var(--accent)]">
                  مراقبت از گیاهان
                </Link>
              </li>
              <li>
                <Link href="/blogs" className="hover:text-[var(--accent)]">
                  وبلاگ
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4">تماس با ما</h4>
            <ul className="space-y-2 text-sm text-[var(--muted-foreground)]">
              <li>ایمیل: hello@plantio.com</li>
              <li>تلفن: +۱ ۲۳۴ ۵۶۷ ۸۹۰</li>
              <li>آدرس: خیابان سبز ۱۲۳، شهر گیاهان</li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4">خبرنامه</h4>
            <p className="text-sm text-[var(--muted-foreground)] mb-4">
              برای دریافت نکات و محصولات جدید در خبرنامه ما عضو شوید.
            </p>
            <div className="flex">
              <input
                type="email"
                placeholder="ایمیل شما"
                className="bg-[var(--card)] text-white px-4 py-2 rounded-l-lg focus:outline-none text-sm flex-1"
              />
              <button className="bg-[var(--accent)] text-[var(--background)] px-4 py-2 rounded-r-lg font-medium text-sm">
                عضویت
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-[var(--card)] mt-8 pt-8 text-center text-sm text-[var(--muted-foreground)]">
          <p>© ۱۴۰۲ پلانتیو. تمامی حقوق محفوظ است.</p>
        </div>
      </div>
    </footer>
  )
}
