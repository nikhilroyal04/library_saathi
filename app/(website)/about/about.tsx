'use client'

import React from 'react'
import PageHero from '@/components/PageHero'

const About = () => {
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

  const team = [
    {
      name: 'Development Team',
      role: 'Building the Future',
      description: 'Our dedicated team of developers works tirelessly to bring you the best library management solution.'
    },
    {
      name: 'Support Team',
      role: 'Always Here for You',
      description: 'Our support team is available 24/7 to help you with any questions or issues you may have.'
    },
    {
      name: 'Design Team',
      role: 'Beautiful Experiences',
      description: 'We believe in creating beautiful, intuitive interfaces that make library management a joy.'
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-cyan-50 dark:from-gray-900 dark:via-slate-900 dark:to-gray-800">
      <PageHero
        badge="📖 About Library Saathi"
        title="Empowering Libraries Since Day One"
        description="We're on a mission to revolutionize library management with secure, efficient, and user-friendly solutions that put your data privacy first"
        gradient="blue"
      />

      {/* Stats Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
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
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
                Our Mission
              </h2>
              <p className="text-base text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                Library Saathi is a comprehensive library management system designed specifically for modern libraries. 
                We understand that your data is sensitive, which is why we built a solution that runs entirely on your local system.
              </p>
              <p className="text-base text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
                No cloud storage means no data breaches, no privacy concerns, and complete control over your information. 
                Our intuitive interface makes it easy for staff to manage members, fees, seating, shifts, and more.
              </p>
              <div className="flex flex-wrap gap-4">
                <span className="px-4 py-2 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 rounded-full text-sm font-medium">
                  Local Database
                </span>
                <span className="px-4 py-2 bg-cyan-50 dark:bg-cyan-900/20 text-cyan-700 dark:text-cyan-300 rounded-full text-sm font-medium">
                  Zero Breach Risk
                </span>
                <span className="px-4 py-2 bg-sky-50 dark:bg-sky-900/20 text-sky-700 dark:text-sky-300 rounded-full text-sm font-medium">
                  Complete Privacy
                </span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {values.map((value, index) => (
                <div
                  key={index}
                  className="p-6 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-300"
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

      {/* Team Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Our Team
            </h2>
            <p className="text-sm sm:text-base lg:text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Meet the passionate people behind Library Saathi
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <div
                key={index}
                className="p-8 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
              >
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  {member.name}
                </h3>
                <p className="text-sm text-blue-600 dark:text-blue-400 font-medium mb-4">
                  {member.role}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {member.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default About
