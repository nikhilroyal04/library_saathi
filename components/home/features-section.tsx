'use client'

import React from 'react'
import Link from 'next/link'

const FeaturesSection = () => {
  const features = [
    {
      icon: '⏰',
      title: 'Shift Planning',
      description: 'Manage multiple shifts, assign staff schedules, and track shift timings efficiently for smooth library operations.',
      gradient: 'from-blue-500 to-cyan-500'
    },
    {
      icon: '🪑',
      title: 'Seat Layouts',
      description: 'Design and manage seat arrangements, track seat availability, and assign seats to members with visual layouts.',
      gradient: 'from-cyan-500 to-sky-500'
    },
    {
      icon: '👥',
      title: 'Member Management',
      description: 'Complete member profiles, registrations, renewals, and member information management all in one place.',
      gradient: 'from-sky-500 to-blue-500'
    },
    {
      icon: '💰',
      title: 'Fees & Billing',
      description: 'Automated fee collection, payment tracking, receipts generation, outstanding balance management, and billing history.',
      gradient: 'from-blue-500 to-indigo-500'
    },
    {
      icon: '🆔',
      title: 'ID Card Management',
      description: 'Generate, print, and manage member ID cards with photos, barcodes, and all essential information.',
      gradient: 'from-indigo-500 to-purple-500'
    },
    {
      icon: '📝',
      title: 'Enquiry System',
      description: 'Handle member enquiries, track enquiry status, assign to staff, and maintain complete enquiry records.',
      gradient: 'from-purple-500 to-pink-500'
    },
    {
      icon: '💸',
      title: 'Expense Management',
      description: 'Track all library expenses, categorize spending, generate expense reports, and maintain financial records.',
      gradient: 'from-pink-500 to-rose-500'
    },
    {
      icon: '🎫',
      title: 'Support Tickets',
      description: 'Admin support ticket system to handle member issues, track resolution status, and maintain support history.',
      gradient: 'from-rose-500 to-orange-500'
    },
    {
      icon: '📚',
      title: 'Tutorials & Guides',
      description: 'Built-in tutorials and guides to help staff and members understand system features and operations.',
      gradient: 'from-orange-500 to-amber-500'
    },
    {
      icon: '💬',
      title: 'Feedback System',
      description: 'Collect member feedback, suggestions, and reviews to improve library services and user experience.',
      gradient: 'from-amber-500 to-yellow-500'
    },
    {
      icon: '💾',
      title: 'Backup & Restore',
      description: 'Automated backup options, data export, restore functionality, and secure data management for peace of mind.',
      gradient: 'from-yellow-500 to-green-500'
    },
    {
      icon: '🔒',
      title: 'Local Database Security',
      description: 'All data stored locally on your system. No cloud dependency, zero risk of data leaks or security breaches.',
      gradient: 'from-green-500 to-emerald-500'
    }
  ]

  return (
    <section className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 mb-4 rounded-full bg-blue-100 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800">
            <span className="text-sm font-medium text-blue-700 dark:text-blue-300">
              ✨ Complete Library Solution
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Everything You Need to{' '}
            <span className="bg-gradient-to-r from-blue-600 via-cyan-600 to-sky-600 bg-clip-text text-transparent">
              Manage Your Library
            </span>
          </h2>
          <p className="text-sm sm:text-base lg:text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            A comprehensive library management system with local database security - no data leaks, no breaches, complete privacy
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.slice(0, 6).map((feature, index) => (
            <div
              key={index}
              className="group relative p-8 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-2xl border border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600 transition-all duration-300 hover:shadow-xl hover:-translate-y-2"
            >
              {/* Gradient overlay on hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity duration-300`}></div>
              
              <div className="relative z-10">
                {/* Icon */}
                <div className="text-5xl mb-4 transform group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                
                {/* Title */}
                <h3 className="text-base sm:text-lg lg:text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {feature.title}
                </h3>
                
                {/* Description */}
                <p className="text-xs sm:text-sm lg:text-base text-gray-600 dark:text-gray-400 leading-relaxed">
                  {feature.description}
                </p>
              </div>

              {/* Decorative element */}
              <div className={`absolute top-4 right-4 w-20 h-20 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-10 rounded-full blur-2xl transition-opacity duration-300`}></div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <p className="text-sm sm:text-base lg:text-lg text-gray-600 dark:text-gray-400 mb-6">
            And many more features to streamline your library operations
          </p>
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <span className="px-4 py-2 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 rounded-full text-sm font-medium">
              Local Database
            </span>
            <span className="px-4 py-2 bg-cyan-50 dark:bg-cyan-900/20 text-cyan-700 dark:text-cyan-300 rounded-full text-sm font-medium">
              No Data Leak
            </span>
            <span className="px-4 py-2 bg-sky-50 dark:bg-sky-900/20 text-sky-700 dark:text-sky-300 rounded-full text-sm font-medium">
              Zero Breach Risk
            </span>
            <span className="px-4 py-2 bg-indigo-50 dark:bg-indigo-900/20 text-indigo-700 dark:text-indigo-300 rounded-full text-sm font-medium">
              Complete Privacy
            </span>
          </div>
          <Link
            href="/features"
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
          >
            View More Features
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  )
}

export default FeaturesSection

