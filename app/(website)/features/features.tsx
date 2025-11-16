'use client'

import React from 'react'

const Features = () => {
  const features = [
    {
      icon: '⏰',
      title: 'Shift Planning',
      description: 'Manage multiple shifts, assign staff schedules, and track shift timings efficiently for smooth library operations.',
      details: ['Create multiple shift schedules', 'Assign staff to specific shifts', 'Track shift attendance', 'Generate shift reports']
    },
    {
      icon: '🪑',
      title: 'Seat Layouts',
      description: 'Design and manage seat arrangements, track seat availability, and assign seats to members with visual layouts.',
      details: ['Visual seat arrangement designer', 'Real-time seat availability', 'Automatic seat assignment', 'Seat booking system']
    },
    {
      icon: '👥',
      title: 'Member Management',
      description: 'Complete member profiles, registrations, renewals, and member information management all in one place.',
      details: ['Member registration & profiles', 'Membership renewals', 'Member search & filters', 'Member history tracking']
    },
    {
      icon: '💰',
      title: 'Fees & Billing',
      description: 'Automated fee collection, payment tracking, receipts generation, outstanding balance management, and billing history.',
      details: ['Automated fee calculation', 'Payment tracking & receipts', 'Outstanding balance alerts', 'Billing history & reports']
    },
    {
      icon: '🆔',
      title: 'ID Card Management',
      description: 'Generate, print, and manage member ID cards with photos, barcodes, and all essential information.',
      details: ['ID card generation', 'Photo upload & management', 'Barcode integration', 'Bulk printing support']
    },
    {
      icon: '📝',
      title: 'Enquiry System',
      description: 'Handle member enquiries, track enquiry status, assign to staff, and maintain complete enquiry records.',
      details: ['Enquiry submission', 'Status tracking', 'Staff assignment', 'Enquiry history']
    },
    {
      icon: '💸',
      title: 'Expense Management',
      description: 'Track all library expenses, categorize spending, generate expense reports, and maintain financial records.',
      details: ['Expense tracking', 'Category management', 'Expense reports', 'Budget planning']
    },
    {
      icon: '🎫',
      title: 'Support Tickets',
      description: 'Admin support ticket system to handle member issues, track resolution status, and maintain support history.',
      details: ['Ticket creation & tracking', 'Priority management', 'Resolution tracking', 'Support history']
    },
    {
      icon: '📚',
      title: 'Tutorials & Guides',
      description: 'Built-in tutorials and guides to help staff and members understand system features and operations.',
      details: ['Interactive tutorials', 'Video guides', 'Step-by-step instructions', 'FAQ section']
    },
    {
      icon: '💬',
      title: 'Feedback System',
      description: 'Collect member feedback, suggestions, and reviews to improve library services and user experience.',
      details: ['Feedback collection', 'Rating system', 'Suggestion management', 'Feedback analytics']
    },
    {
      icon: '💾',
      title: 'Backup & Restore',
      description: 'Automated backup options, data export, restore functionality, and secure data management for peace of mind.',
      details: ['Automated backups', 'Manual backup options', 'Data export', 'Restore functionality']
    },
    {
      icon: '🔒',
      title: 'Local Database Security',
      description: 'All data stored locally on your system. No cloud dependency, zero risk of data leaks or security breaches.',
      details: ['Local data storage', 'No cloud dependency', 'Zero data breach risk', 'Complete privacy control']
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-cyan-50 dark:from-gray-900 dark:via-slate-900 dark:to-gray-800">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-blue-600 via-cyan-600 to-sky-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center px-4 py-2 mb-6 rounded-full bg-white/20 backdrop-blur-sm border border-white/30">
            <span className="text-sm sm:text-base font-medium text-white">
              ✨ Complete Library Solution
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold text-white mb-4">
            All Features
          </h1>
          <p className="text-sm sm:text-base lg:text-lg text-blue-50 max-w-3xl mx-auto">
            Discover all the powerful features that make Library Saathi the complete solution for modern library management
          </p>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group relative bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-gray-200 dark:border-gray-700"
              >
                <div className="text-5xl mb-4 transform group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                
                <h3 className="text-base sm:text-lg lg:text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {feature.title}
                </h3>
                
                <p className="text-xs sm:text-sm lg:text-base text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
                  {feature.description}
                </p>

                <ul className="space-y-2">
                  {feature.details.map((detail, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                      <svg className="w-4 h-4 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Ready to Experience These Features?
          </h2>
          <p className="text-sm sm:text-base lg:text-lg text-gray-600 dark:text-gray-400 mb-8">
            Start using Library Saathi today and transform your library management
          </p>
          <a
            href="/register-your-library"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
          >
            Get Started Free
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </a>
        </div>
      </section>
    </div>
  )
}

export default Features
