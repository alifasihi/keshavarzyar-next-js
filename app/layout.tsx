import type React from "react"
import type { Metadata } from "next"
import localFont from 'next/font/local'
import "../styles/globals.css"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { CartProvider } from "@/context/cart-context"
import { SearchProvider } from "@/context/search-context"
import { Suspense } from "react"
import { ThemeProvider } from "@/context/theme-context"
import { ProfileProvider } from "@/context/profile-context"


export const metadata: Metadata = {
  title: "پستاک – فروشگاه آنلاین پسته‌ی تازه و خوش‌طعم",
  description: "گیاهان آپارتمانی مناسب برای خانه‌تان را پیدا کنید",
  generator: 'https://alifasihi.vercel.app',
  icons: {
    icon: [
      { url: "/logo.png", type: "image/x-icon" },
      { url: "/logo.png", type: "image/png+xml" },
    ],
  },
  openGraph: {
    title: "پستاک - فروشگاه گیاهان آپارتمانی",
    description: "گیاهان آپارتمانی مناسب برای خانه‌تان را پیدا کنید",
    url: 'https://alifasihi.vercel.app',
    siteName: 'پستاک',
    images: [
      {
        url: "/logo.png", // Direct string path
        width: 1200,
        height: 630,
        alt: 'پستاک - گیاهان آپارتمانی',
      },
    ],
    locale: 'fa_IR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "پستاک - فروشگاه گیاهان آپارتمانی",
    description: "گیاهان آپارتمانی مناسب برای خانه‌تان را پیدا کنید",
    images: ['/og-image.jpg'],
  },
}



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fa" className="font-yekanbakh">
      <body className={`font-yekanbakh flex flex-col min-h-screen theme-transition`}>
        <SearchProvider>
          <CartProvider>
            <ThemeProvider>
              <ProfileProvider>
                <Header />
                <Suspense fallback={`Loading...`}>
                  <main className="flex-1">{children}</main>
                </Suspense>
                <Footer />
              </ProfileProvider>
            </ThemeProvider>
          </CartProvider>
        </SearchProvider>
      </body>
    </html>
  )
}
