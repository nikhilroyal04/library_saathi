'use client'

import React from 'react'
import PageHero from '@/components/PageHero'

const Gallery = () => {
  const galleryItems = [
    {
      id: 1,
      title: 'Modern Library Space',
      description: 'Spacious reading areas with comfortable seating',
      gradient: 'from-blue-500 to-cyan-500',
      category: 'Interior'
    },
    {
      id: 2,
      title: 'Digital Catalog System',
      description: 'Easy book search and management interface',
      gradient: 'from-purple-500 to-pink-500',
      category: 'Technology'
    },
    {
      id: 3,
      title: 'Member Services',
      description: 'Dedicated help desk for member assistance',
      gradient: 'from-green-500 to-emerald-500',
      category: 'Services'
    },
    {
      id: 4,
      title: 'Study Zones',
      description: 'Quiet study areas for focused learning',
      gradient: 'from-orange-500 to-amber-500',
      category: 'Interior'
    },
    {
      id: 5,
      title: 'Tech Integration',
      description: 'Modern technology for seamless operations',
      gradient: 'from-indigo-500 to-blue-500',
      category: 'Technology'
    },
    {
      id: 6,
      title: 'Community Events',
      description: 'Regular workshops and community gatherings',
      gradient: 'from-rose-500 to-pink-500',
      category: 'Events'
    },
    {
      id: 7,
      title: 'Reading Corners',
      description: 'Cozy reading nooks for quiet reading',
      gradient: 'from-teal-500 to-cyan-500',
      category: 'Interior'
    },
    {
      id: 8,
      title: 'Digital Resources',
      description: 'Access to e-books and digital materials',
      gradient: 'from-violet-500 to-purple-500',
      category: 'Technology'
    },
    {
      id: 9,
      title: 'Children Section',
      description: 'Dedicated area for young readers',
      gradient: 'from-yellow-500 to-orange-500',
      category: 'Interior'
    },
    {
      id: 10,
      title: 'Workshop Space',
      description: 'Area for educational workshops and seminars',
      gradient: 'from-emerald-500 to-green-500',
      category: 'Events'
    },
    {
      id: 11,
      title: 'Research Section',
      description: 'Quiet area for research and academic work',
      gradient: 'from-blue-500 to-indigo-500',
      category: 'Interior'
    },
    {
      id: 12,
      title: 'Outdoor Reading',
      description: 'Beautiful outdoor reading spaces',
      gradient: 'from-green-500 to-teal-500',
      category: 'Interior'
    }
  ]

  const categories = ['All', 'Interior', 'Technology', 'Services', 'Events']
  const [selectedCategory, setSelectedCategory] = React.useState('All')

  const filteredItems = selectedCategory === 'All' 
    ? galleryItems 
    : galleryItems.filter(item => item.category === selectedCategory)

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-cyan-50 dark:from-gray-900 dark:via-slate-900 dark:to-gray-800">
      <PageHero
        badge="📸 Library Gallery"
        title="Explore Our Library Spaces"
        description="Take a virtual tour of our modern library facilities and see how we create the perfect learning environment"
        gradient="blue"
      />

      {/* Category Filter */}
      <section className="py-8 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                  selectedCategory === category
                    ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-lg'
                    : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-700'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item) => (
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
                    <div className="mb-2">
                      <span className="px-2 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs font-semibold text-white">
                        {item.category}
                      </span>
                    </div>
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
        </div>
      </section>
    </div>
  )
}

export default Gallery
