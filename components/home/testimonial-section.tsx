'use client'

import React from 'react'

const TestimonialSection = () => {
  const testimonials = [
    {
      name: 'Dr. Priya Sharma',
      role: 'Head Librarian',
      library: 'City Central Library',
      image: '👩‍💼',
      rating: 5,
      text: 'Library Saathi has transformed how we manage our library. The local database gives us complete control, and the interface is so intuitive that our staff learned it in minutes.',
      gradient: 'from-blue-500 to-cyan-500'
    },
    {
      name: 'Rajesh Kumar',
      role: 'Library Administrator',
      library: 'University Library',
      image: '👨‍💼',
      rating: 5,
      text: 'The shift planning feature is a game-changer! We can now manage multiple shifts effortlessly. The security aspect of local storage was the deciding factor for us.',
      gradient: 'from-purple-500 to-pink-500'
    },
    {
      name: 'Anita Desai',
      role: 'Library Manager',
      library: 'Community Library',
      image: '👩‍💻',
      rating: 5,
      text: 'We love how comprehensive this system is. From member management to expense tracking, everything we need is in one place. Highly recommended!',
      gradient: 'from-green-500 to-emerald-500'
    },
    {
      name: 'Mohammed Ali',
      role: 'IT Coordinator',
      library: 'Tech Institute Library',
      image: '👨‍💻',
      rating: 5,
      text: 'As someone who values data security, Library Saathi is perfect. No cloud dependency means no worries about data breaches. The performance is excellent too!',
      gradient: 'from-orange-500 to-amber-500'
    }
  ]

  return (
    <section className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 mb-4 rounded-full bg-blue-100 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800">
            <span className="text-sm font-medium text-blue-700 dark:text-blue-300">
              💬 What Our Users Say
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Trusted by{' '}
            <span className="bg-gradient-to-r from-blue-600 via-cyan-600 to-sky-600 bg-clip-text text-transparent">
              Librarians Everywhere
            </span>
          </h2>
          <p className="text-sm sm:text-base lg:text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Don't just take our word for it - hear from librarians who have transformed their operations with Library Saathi
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="group relative p-8 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-2xl border border-gray-200 dark:border-gray-700 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
            >
              {/* Gradient overlay on hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${testimonial.gradient} opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity duration-300`}></div>
              
              <div className="relative z-10">
                {/* Rating */}
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <svg
                      key={i}
                      className="w-5 h-5 text-yellow-400 fill-current"
                      viewBox="0 0 20 20"
                    >
                      <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                    </svg>
                  ))}
                </div>

                {/* Testimonial Text */}
                <p className="text-base text-gray-700 dark:text-gray-300 mb-6 leading-relaxed italic">
                  "{testimonial.text}"
                </p>

                {/* Author Info */}
                <div className="flex items-center gap-4">
                  <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${testimonial.gradient} flex items-center justify-center text-3xl shadow-lg`}>
                    {testimonial.image}
                  </div>
                  <div>
                    <div className="font-bold text-gray-900 dark:text-white">
                      {testimonial.name}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      {testimonial.role}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-500">
                      {testimonial.library}
                    </div>
                  </div>
                </div>
              </div>

              {/* Decorative quote */}
              <div className="absolute top-4 right-4 text-6xl text-gray-200 dark:text-gray-700 opacity-50 font-serif">
                "
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default TestimonialSection
