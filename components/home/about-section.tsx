'use client'

import React from 'react'
import Link from 'next/link'

const AboutSection = () => {
  const stats = [
    { number: '1000+', label: 'Libraries Served', icon: '🏛️' },
    { number: '50K+', label: 'Active Members', icon: '👥' },
    { number: '99.9%', label: 'Uptime', icon: '⚡' },
    { number: '24/7', label: 'Support', icon: '🛟' }
  ]

  const values = [
    {
      icon: '🔒',
      title: 'Security First',
      description: 'Your data stays local. No cloud dependency, zero risk of breaches.'
    },
    {
      icon: '⚡',
      title: 'Lightning Fast',
      description: 'Optimized performance for instant access to all your library data.'
    },
    {
      icon: '🎯',
      title: 'User Centric',
      description: 'Designed with librarians and members in mind for intuitive experience.'
    },
    {
      icon: '🚀',
      title: 'Always Evolving',
      description: 'Regular updates and new features based on your feedback.'
    }
  ]

  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 via-cyan-50 to-sky-50 dark:from-gray-900 dark:via-blue-900 dark:to-slate-800 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 right-10 w-96 h-96 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-cyan-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 mb-4 rounded-full bg-blue-100 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800">
            <span className="text-sm font-medium text-blue-700 dark:text-blue-300">
              📖 About Library Saathi
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Empowering Libraries{' '}
            <span className="bg-gradient-to-r from-blue-600 via-cyan-600 to-sky-600 bg-clip-text text-transparent">
              Since Day One
            </span>
          </h2>
          <p className="text-sm sm:text-base lg:text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            We're on a mission to revolutionize library management with secure, efficient, and user-friendly solutions that put your data privacy first
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="p-6 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl border border-gray-200 dark:border-gray-700 text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className="text-4xl mb-3">{stat.icon}</div>
              <div className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-2">
                {stat.number}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-6">
              Why Choose Library Saathi?
            </h3>
            <p className="text-base text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
              Library Saathi is a comprehensive library management system designed specifically for modern libraries. 
              We understand that your data is sensitive, which is why we built a solution that runs entirely on your local system.
            </p>
            <p className="text-base text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
              No cloud storage means no data breaches, no privacy concerns, and complete control over your information. 
              Our intuitive interface makes it easy for staff to manage members, fees, seating, shifts, and more.
            </p>
            <Link
              href="/about"
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
            >
              Learn More
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {values.map((value, index) => (
              <div
                key={index}
                className="p-6 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-xl border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-300"
              >
                <div className="text-4xl mb-3">{value.icon}</div>
                <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                  {value.title}
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default AboutSection
