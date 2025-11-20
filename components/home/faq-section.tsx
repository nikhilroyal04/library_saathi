'use client'

import React, { useState } from 'react'
import Link from 'next/link'

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  const faqs = [
    {
      question: 'Is my data stored securely?',
      answer: 'Yes! Library Saathi uses a local database system, meaning all your data is stored on your own system. There\'s no cloud storage, no external servers, and zero risk of data breaches. Your information stays completely private and under your control.'
    },
    {
      question: 'Can I use Library Saathi offline?',
      answer: 'Absolutely! Since all data is stored locally on your system, Library Saathi works completely offline. You don\'t need an internet connection to access your library data, manage members, or perform any operations.'
    },
    {
      question: 'How do I backup my data?',
      answer: 'Library Saathi includes built-in backup and restore functionality. You can easily export your data, create backups, and restore from backups whenever needed. We recommend regular backups to ensure your data is always safe.'
    },
    {
      question: 'Can multiple staff members use it simultaneously?',
      answer: 'Yes! Library Saathi supports multiple users with role-based access control. You can assign different permissions to staff members, track who made what changes, and ensure secure access to your library management system.'
    },
    {
      question: 'What features are included?',
      answer: 'Library Saathi includes comprehensive features: member management, fee collection, seat layouts, shift planning, ID card generation, enquiry system, expense tracking, support tickets, tutorials, feedback system, and much more. It\'s a complete all-in-one solution.'
    },
    {
      question: 'Is there a learning curve?',
      answer: 'Not at all! Library Saathi is designed with user-friendliness in mind. The interface is intuitive, and we provide built-in tutorials and guides. Most users find it easy to navigate and start using immediately.'
    },
    {
      question: 'Can I customize the system for my library?',
      answer: 'Yes, Library Saathi offers various customization options. You can configure settings, customize member fields, set up your own fee structures, design seat layouts, and adapt the system to match your library\'s specific needs.'
    },
    {
      question: 'What kind of support do you provide?',
      answer: 'We provide comprehensive support including documentation, tutorials, and a support ticket system. Our team is committed to helping you get the most out of Library Saathi and ensuring smooth operations.'
    }
  ]

  // Show only first 4 FAQs on homepage
  const displayedFaqs = faqs.slice(0, 4)

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 via-blue-50 to-cyan-50 dark:from-gray-900 dark:via-blue-900 dark:to-slate-800">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 mb-4 rounded-full bg-blue-100 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800">
            <span className="text-sm font-medium text-blue-700 dark:text-blue-300">
              ❓ Frequently Asked Questions
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Got{' '}
            <span className="bg-gradient-to-r from-blue-600 via-cyan-600 to-sky-600 bg-clip-text text-transparent">
              Questions?
            </span>
          </h2>
          <p className="text-sm sm:text-base lg:text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Find answers to common questions about Library Saathi and how it can help transform your library management
          </p>
        </div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {displayedFaqs.map((faq, index) => (
            <div
              key={index}
              className={`group bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-xl border-2 transition-all duration-300 ${
                openIndex === index
                  ? 'border-blue-400 dark:border-blue-600 shadow-xl'
                  : 'border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-700 hover:shadow-lg'
              }`}
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-6 py-5 text-left flex items-center justify-between focus:outline-none"
              >
                <span className={`text-base sm:text-lg font-semibold pr-8 transition-colors ${
                  openIndex === index
                    ? 'text-blue-600 dark:text-blue-400'
                    : 'text-gray-900 dark:text-white'
                }`}>
                  {faq.question}
                </span>
                <svg
                  className={`w-6 h-6 flex-shrink-0 transform transition-transform duration-300 ${
                    openIndex === index ? 'rotate-180 text-blue-600 dark:text-blue-400' : 'text-gray-500 dark:text-gray-400'
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="px-6 pb-5">
                  <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <Link
            href="/faqs"
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
          >
            View More FAQs
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  )
}

export default FAQSection
