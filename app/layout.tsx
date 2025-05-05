import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { CartProvider } from "@/context/cart-context"
import { SearchProvider } from "@/context/search-context"
import { Suspense } from "react"
import { ThemeProvider } from "@/context/theme-context"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Breath Natural - Indoor Plants Shop",
  description: "Find the perfect indoor plants for your home",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SearchProvider>
          <CartProvider>
            <ThemeProvider>
              <div className="flex flex-col min-h-screen theme-transition">
                <Header />
                <Suspense fallback={`Loading...`}>
                  <main className="flex-1">{children}</main>
                </Suspense>
                <Footer />
              </div>
            </ThemeProvider>
          </CartProvider>
        </SearchProvider>
      </body>
    </html>
  )
}
