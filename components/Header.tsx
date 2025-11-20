'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

const navItems = [
  { href: '/', label: 'Home' },
  { href: '/features', label: 'Features' },
  { href: '/gallery', label: 'Gallery' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
]

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <header className="bg-white shadow-md sticky top-0 left-0 right-0 z-50 border border-gray-200">
      <nav className="max-w-7xl mx-auto h-16 p-3">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          {/* Logo/Brand */}
          <Link href="/" className="logo-link">
            <Image
              src="/logo.png"
              alt="Library Saathi Logo"
              width={100}
              height={100}
              className="logo-image"
            />
          </Link>

          {/* Navigation Links */}
          <div className="nav-links flex items-center space-x-4 flex-wrap">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="nav-link text-secondary hover:text-accent transition-colors"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/book-now"
              className="ml-2 bg-accent text-white px-5 py-2 rounded font-semibold hover:bg-accent/90 transition nav-link-cta"
            >
              Book Now
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="mobile-menu-button text-secondary hover:text-accent md:hidden"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <svg
                className="mobile-menu-icon"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            ) : (
              <svg
                className="mobile-menu-icon"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="mobile-menu bg-primary rounded shadow-lg mt-2 p-4 flex flex-col space-y-2 md:hidden">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="mobile-menu-link text-secondary hover:text-accent transition-colors"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/book-now"
              onClick={() => setIsMobileMenuOpen(false)}
              className="mobile-menu-link-cta bg-accent text-white px-4 py-2 rounded font-semibold hover:bg-accent/90 transition"
            >
              Book Now
            </Link>
          </div>
        )}
      </nav>
    </header>
  )
}

export default Header