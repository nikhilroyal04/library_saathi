'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

const GallerySection = () => {
  const galleryItems = [
    {
      id: 1,
      title: 'Modern Library Space',
      description: 'Spacious reading areas with comfortable seating',
      gradient: 'from-blue-500 to-cyan-500'
    },
    {
      id: 2,
      title: 'Digital Catalog System',
      description: 'Easy book search and management interface',
      gradient: 'from-purple-500 to-pink-500'
    },
    {
      id: 3,
      title: 'Member Services',
      description: 'Dedicated help desk for member assistance',
      gradient: 'from-green-500 to-emerald-500'
    },
    {
      id: 4,
      title: 'Study Zones',
      description: 'Quiet study areas for focused learning',
      gradient: 'from-orange-500 to-amber-500'
    },
    {
      id: 5,
      title: 'Tech Integration',
      description: 'Modern technology for seamless operations',
      gradient: 'from-indigo-500 to-blue-500'
    },
    {
      id: 6,
      title: 'Community Events',
      description: 'Regular workshops and community gatherings',
      gradient: 'from-rose-500 to-pink-500'
    }
  ]

  return (
    <section className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 mb-4 rounded-full bg-blue-100 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800">
            <span className="text-sm font-medium text-blue-700 dark:text-blue-300">
              📸 Library Gallery
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Explore Our{' '}
            <span className="bg-gradient-to-r from-blue-600 via-cyan-600 to-sky-600 bg-clip-text text-transparent">
              Library Spaces
            </span>
          </h2>
          <p className="text-sm sm:text-base lg:text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Take a virtual tour of our modern library facilities and see how we create the perfect learning environment
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryItems.map((item, index) => (
            <div
              key={item.id}
              className="group relative overflow-hidden rounded-2xl aspect-[4/3] bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 border border-gray-200 dark:border-gray-700 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
            >
              {/* Placeholder Image Area */}
              <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-80 group-hover:opacity-100 transition-opacity duration-300`}>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-6xl opacity-50 group-hover:opacity-70 transition-opacity">
                    📚
                  </div>
                </div>
              </div>

              {/* Overlay Content */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-xl font-bold text-white mb-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-200 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75">
                    {item.description}
                  </p>
                </div>
              </div>

              {/* Badge */}
              <div className="absolute top-4 right-4 px-3 py-1 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm rounded-full text-xs font-semibold text-gray-900 dark:text-white opacity-0 group-hover:opacity-100 transform scale-0 group-hover:scale-100 transition-all duration-300">
                View Details
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <Link
            href="/gallery"
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
          >
            View More
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  )
}

export default GallerySection
