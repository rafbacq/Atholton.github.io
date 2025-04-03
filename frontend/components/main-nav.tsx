"use client"

import Link from "next/link"
import { Home, Sun, Moon, Menu, X } from "lucide-react"
import { useState, useEffect } from "react"
import { useTheme } from "@/components/theme-provider"

interface MainNavProps {
  userType?: "student" | "teacher"
}

export function MainNav({ userType = "student" }: MainNavProps) {
  const [mounted, setMounted] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { theme, setTheme } = useTheme()

  // Avoid hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  return (
    <nav className="bg-gradient-to-r from-raider-green to-raider-lightgreen dark:from-raider-darkgray dark:to-black text-white py-4 px-6 transition-colors duration-300">
      <div className="container mx-auto">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <Link href={`/${userType}`} className="text-2xl font-bold">
              {userType === "teacher" ? "TEACHERS" : "STUDENTS"}
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-6">
              <Link href="/login/student" className="hover:opacity-80 transition-opacity">
                STUDENT LOGIN
              </Link>
              <Link href="/login/teacher" className="hover:opacity-80 transition-opacity">
                TEACHER LOGIN
              </Link>
              <Link href="/news" className="hover:opacity-80 transition-opacity">
                NEWS
              </Link>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <Link href="/" className="hover:opacity-80 transition-opacity">
              <Home className="size-6" />
            </Link>

            <button
              onClick={toggleTheme}
              className="hover:opacity-80 transition-opacity focus:outline-none"
              aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
            >
              {mounted && theme === "dark" ? <Sun className="size-6" /> : <Moon className="size-6" />}
            </button>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden hover:opacity-80 transition-opacity"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? <X className="size-6" /> : <Menu className="size-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 py-3 px-2 bg-white dark:bg-raider-darkgray text-raider-green dark:text-white rounded-md animate-in fade-in duration-300">
            <div className="flex flex-col space-y-4">
              <Link
                href="/login/student"
                className="px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                STUDENT LOGIN
              </Link>
              <Link
                href="/login/teacher"
                className="px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                TEACHER LOGIN
              </Link>
              <Link
                href="/news"
                className="px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                NEWS
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

