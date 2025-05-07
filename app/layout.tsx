import type React from "react"
import type { Metadata } from "next"
import localFont from 'next/font/local'
import "./globals.css"
import ClientHeader from "@/components/client-header"
import Footer from "@/components/footer"
import { CartProvider } from "@/context/cart-context"
import { SearchProvider } from "@/context/search-context"
import { Suspense } from "react"
import { ThemeProvider } from "@/context/theme-context"
import logo from "/public/logo.png";


const YekanBakh = localFont({
  src: [
    {
      path: '../public/fonts/woff/YekanBakhNoEn-Regular.woff',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../public/fonts/woff/YekanBakhNoEn-Bold.woff',
      weight: '700',
      style: 'normal',
    }
  ],
  variable: '--font-yekanbakh'
})

export const metadata: Metadata = {
  title: "نفس طبیعی - فروشگاه گیاهان آپارتمانی",
  description: "گیاهان آپارتمانی مناسب برای خانه‌تان را پیدا کنید",
  generator: 'https://alifasihi.vercel.app',
  icons: {
    icon: [
      { url: "/logo.png", type: "image/x-icon" },
      { url: "/logo.png", type: "image/png+xml" },
    ],
  },
  openGraph: {
    title: "نفس طبیعی - فروشگاه گیاهان آپارتمانی",
    description: "گیاهان آپارتمانی مناسب برای خانه‌تان را پیدا کنید",
    url: 'https://alifasihi.vercel.app',
    siteName: 'نفس طبیعی',
    images: [
      {
        url: "/logo.png", // Direct string path
        width: 1200,
        height: 630,
        alt: 'نفس طبیعی - گیاهان آپارتمانی',
      },
    ],
    locale: 'fa_IR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "نفس طبیعی - فروشگاه گیاهان آپارتمانی",
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
    <html lang="en">
      <body className={YekanBakh.className}>
        <CartProvider>
          <ThemeProvider>
            <SearchProvider>
              <div className="flex flex-col min-h-screen theme-transition">
                <ClientHeader />
                <Suspense fallback={<div className="flex-1 flex items-center justify-center">Loading...</div>}>
                  <main className="flex-1 container mx-auto px-4 sm:px-6 py-8">{children}</main>
                </Suspense>
                <Footer />
              </div>
            </SearchProvider>
          </ThemeProvider>
        </CartProvider>
      </body>
    </html>
  )
}
