"use client"

import { Sun, Moon } from "lucide-react"
import { useTheme } from "@/context/theme-context"

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()

  return (
    <button
      onClick={toggleTheme}
      className="w-10 h-10 rounded-full bg-[var(--card)] flex items-center justify-center theme-transition border border-[var(--border)]"
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
    >
      {theme === "dark" ? (
        <Sun className="w-5 h-5 text-[var(--accent)]" />
      ) : (
        <Moon className="w-5 h-5 text-[var(--accent)]" />
      )}
    </button>
  )
}
