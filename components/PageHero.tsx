'use client'

import React from 'react'

interface PageHeroProps {
  badge?: string
  title: string
  description: string
  gradient?: 'blue' | 'purple' | 'green' | 'orange'
}

const PageHero = ({ badge, title, description, gradient = 'blue' }: PageHeroProps) => {
  const gradientClasses = {
    blue: 'from-blue-600 via-cyan-600 to-sky-600',
    purple: 'from-purple-600 via-pink-600 to-rose-600',
    green: 'from-green-600 via-emerald-600 to-teal-600',
    orange: 'from-orange-600 via-amber-600 to-yellow-600'
  }

  return (
    <section className={`py-20 bg-gradient-to-br ${gradientClasses[gradient]} relative overflow-hidden`}>
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-white/10 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-white/10 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-white/10 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        {badge && (
          <div className="inline-flex items-center px-4 py-2 mb-6 rounded-full bg-white/20 backdrop-blur-sm border border-white/30">
            <span className="text-sm sm:text-base font-medium text-white">
              {badge}
            </span>
          </div>
        )}
        <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold text-white mb-4">
          {title}
        </h1>
        <p className="text-sm sm:text-base lg:text-lg text-white/90 max-w-3xl mx-auto">
          {description}
        </p>
      </div>
    </section>
  )
}

export default PageHero

