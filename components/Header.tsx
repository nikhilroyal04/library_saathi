'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <header className="bg-white shadow-md fixed top-0 left-0 right-0 z-50">
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
          <div className="nav-links flex space-x-4 flex-wrap">
            <Link href="/" className="nav-link text-secondary hover:text-accent transition-colors">
              Home
            </Link>
            <Link href="/features" className="nav-link text-secondary hover:text-accent transition-colors">
              Features
            </Link>
            <Link href="/contact" className="nav-link text-secondary hover:text-accent transition-colors">
              Contact
            </Link>
            <Link
              href="/register-your-library"
              className="nav-link text-secondary hover:text-accent transition-colors"
            >
              Register Your Library
            </Link>
            <Link
              href="/dashboard"
              className="nav-link text-secondary hover:text-accent transition-colors"
            >
              Dashboard
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="mobile-menu-button text-secondary hover:text-accent"
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
          <div className="mobile-menu bg-primary rounded shadow-lg mt-2 p-4 flex flex-col space-y-2">
            <Link
              href="/"
              onClick={() => setIsMobileMenuOpen(false)}
              className="mobile-menu-link text-secondary hover:text-accent"
            >
              Home
            </Link>
            <Link
              href="/features"
              onClick={() => setIsMobileMenuOpen(false)}
              className="mobile-menu-link text-secondary hover:text-accent"
            >
              Features
            </Link>
            <Link
              href="/contact"
              onClick={() => setIsMobileMenuOpen(false)}
              className="mobile-menu-link text-secondary hover:text-accent"
            >
              Contact
            </Link>
            <Link
              href="/register"
              onClick={() => setIsMobileMenuOpen(false)}
              className="mobile-menu-link text-secondary hover:text-accent"
            >
              Register
            </Link>
            <Link
              href="/register-your-library"
              onClick={() => setIsMobileMenuOpen(false)}
              className="mobile-menu-link-cta bg-accent text-white px-4 py-2 rounded hover:bg-accent/90 transition"
            >
              Your Library
            </Link>
          </div>
        )}
      </nav>
    </header>
  )
}

export default Header