'use client'

import React, { useState } from 'react'
import PageHero from '@/components/PageHero'

const Faqs = () => {
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
    },
    {
      question: 'How much does Library Saathi cost?',
      answer: 'Library Saathi offers flexible pricing plans to suit libraries of all sizes. Please contact us for detailed pricing information and to find the plan that best fits your needs.'
    },
    {
      question: 'Can I try Library Saathi before purchasing?',
      answer: 'Yes! We offer a free trial period so you can explore all features and see how Library Saathi can benefit your library. Contact us to get started with your free trial.'
    },
    {
      question: 'What are the system requirements?',
      answer: 'Library Saathi runs on Windows, macOS, and Linux systems. It requires minimal system resources and works on most modern computers. Contact us for specific system requirements.'
    },
    {
      question: 'How do I migrate my existing library data?',
      answer: 'We provide data migration tools and support to help you import your existing library data into Library Saathi. Our team can assist you with the migration process to ensure a smooth transition.'
    }
  ]

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-cyan-50 dark:from-gray-900 dark:via-slate-900 dark:to-gray-800">
      <PageHero
        badge="❓ Frequently Asked Questions"
        title="Got Questions?"
        description="Find answers to common questions about Library Saathi and how it can help transform your library management"
        gradient="blue"
      />

      {/* FAQ Items */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-4">
            {faqs.map((faq, index) => (
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
            <p className="text-base text-gray-600 dark:text-gray-400 mb-4">
              Still have questions?
            </p>
            <a
              href="/contact"
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
            >
              Contact Us
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Faqs
