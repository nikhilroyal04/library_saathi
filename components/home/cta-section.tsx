'use client'

import React from 'react'
import Link from 'next/link'

const CTASection = () => {
  return (
    <section className="relative py-20 bg-gradient-to-br from-gray-50 via-blue-50 to-cyan-50 dark:from-gray-900 dark:via-slate-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative bg-gradient-to-br from-blue-600 via-cyan-600 to-sky-600 rounded-3xl p-8 sm:p-10 lg:p-16 shadow-2xl overflow-hidden">
          {/* Animated Background Elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-blob"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-300/20 rounded-full blur-3xl animate-blob animation-delay-2000"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-sky-300/20 rounded-full blur-3xl animate-blob animation-delay-4000"></div>
          </div>

          <div className="relative z-10">
            {/* Badge */}
            <div className="text-center mb-6">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 mb-6">
                <span className="text-sm sm:text-base font-medium text-white">
                  🚀 Start Your Journey Today
                </span>
              </div>
            </div>

            {/* Heading */}
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 text-center">
              Ready to Transform Your Library?
            </h2>
            <p className="text-sm sm:text-base lg:text-lg text-blue-50 mb-8 max-w-3xl mx-auto text-center leading-relaxed">
              Join hundreds of libraries already using Library Saathi. Experience secure, efficient, and complete library management with local database security.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-10">
              <Link
                href="/your-library"
                className="group relative px-8 py-4 bg-white text-blue-600 font-semibold rounded-full shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 flex items-center gap-2 text-base sm:text-lg"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Get Started Free
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
                <div className="absolute inset-0 bg-gradient-to-r from-gray-50 to-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </Link>

              <Link
                href="/contact"
                className="px-8 py-4 bg-transparent text-white font-semibold rounded-full border-2 border-white/60 hover:bg-white/20 hover:border-white transition-all duration-300 backdrop-blur-sm text-base sm:text-lg"
              >
                Contact Sales
              </Link>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl mx-auto">
              <div className="flex items-center justify-center gap-2 text-white/90 bg-white/10 backdrop-blur-sm rounded-xl px-4 py-3 border border-white/20">
                <svg className="w-5 h-5 text-yellow-300" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span className="text-sm sm:text-base font-medium">4.9/5 Rating</span>
              </div>
              <div className="flex items-center justify-center gap-2 text-white/90 bg-white/10 backdrop-blur-sm rounded-xl px-4 py-3 border border-white/20">
                <svg className="w-5 h-5 text-yellow-300" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
                </svg>
                <span className="text-sm sm:text-base font-medium">500+ Libraries</span>
              </div>
              <div className="flex items-center justify-center gap-2 text-white/90 bg-white/10 backdrop-blur-sm rounded-xl px-4 py-3 border border-white/20">
                <svg className="w-5 h-5 text-yellow-300" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-sm sm:text-base font-medium">99.9% Uptime</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CTASection

