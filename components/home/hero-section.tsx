'use client'

import React from 'react'
import Link from 'next/link'

const HeroSection = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-sky-50 via-blue-50 to-cyan-50 dark:from-slate-900 dark:via-blue-900 dark:to-slate-800">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-cyan-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-sky-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          {/* Badge */}
          <div className="inline-flex items-center px-4 py-2 mb-8 rounded-full bg-blue-100 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800">
            <span className="text-sm font-medium text-blue-700 dark:text-blue-300">
              🏛️ Your Complete Library Management System
            </span>
          </div>

          {/* Main Heading */}
          <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
            Welcome to{' '}
            <span className="bg-gradient-to-r from-blue-600 via-cyan-600 to-sky-600 bg-clip-text text-transparent">
              Library Saathi
            </span>
          </h1>

          {/* Subheading */}
          <p className="text-lg sm:text-xl lg:text-2xl text-gray-600 dark:text-gray-300 mb-4 max-w-3xl mx-auto leading-relaxed">
            Complete Library Management Solution for Modern Libraries
          </p>
          <p className="text-sm sm:text-base lg:text-lg text-gray-500 dark:text-gray-400 mb-12 max-w-3xl mx-auto">
            Manage members, fees, seating, shifts, enquiries, expenses, and more with our secure local database system
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <Link
              href="/your-library"
              className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 ease-in-out"
            >
              <span className="relative z-10 flex items-center gap-2">
                Get Started
                <svg
                  className="w-5 h-5 group-hover:translate-x-1 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-cyan-700 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </Link>

            <Link
              href="/features"
              className="px-8 py-4 bg-white dark:bg-gray-800 text-blue-600 dark:text-blue-400 font-semibold rounded-full border-2 border-blue-200 dark:border-blue-700 shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300 ease-in-out"
            >
              Learn More
            </Link>
          </div>

          {/* Stats or Features */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-4xl mx-auto mt-16">
            <div className="p-6 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl border border-blue-100 dark:border-blue-800 shadow-md hover:shadow-lg transition-shadow">
              <div className="text-4xl mb-3">🔒</div>
              <h3 className="text-base sm:text-lg lg:text-xl font-bold text-gray-900 dark:text-white mb-2">
                Local Database
              </h3>
              <p className="text-xs sm:text-sm lg:text-base text-gray-600 dark:text-gray-400">
                Your data stays secure on your local system
              </p>
            </div>

            <div className="p-6 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl border border-blue-100 dark:border-blue-800 shadow-md hover:shadow-lg transition-shadow">
              <div className="text-4xl mb-3">🛡️</div>
              <h3 className="text-base sm:text-lg lg:text-xl font-bold text-gray-900 dark:text-white mb-2">
                No Data Breach
              </h3>
              <p className="text-xs sm:text-sm lg:text-base text-gray-600 dark:text-gray-400">
                Zero risk of data leaks or security breaches
              </p>
            </div>

            <div className="p-6 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl border border-blue-100 dark:border-blue-800 shadow-md hover:shadow-lg transition-shadow">
              <div className="text-4xl mb-3">⚡</div>
              <h3 className="text-base sm:text-lg lg:text-xl font-bold text-gray-900 dark:text-white mb-2">
                Complete Solution
              </h3>
              <p className="text-xs sm:text-sm lg:text-base text-gray-600 dark:text-gray-400">
                All-in-one management system for your library
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <svg
          className="w-6 h-6 text-blue-600 dark:text-blue-400"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  )
}

export default HeroSection