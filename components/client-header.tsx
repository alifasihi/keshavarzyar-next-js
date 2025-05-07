"use client"

import { useEffect, useState } from "react"
import Header from "./header"

export default function ClientHeader() {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return null
  }

  return <Header />
}
