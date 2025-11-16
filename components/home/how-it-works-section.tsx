'use client'

import React from 'react'

const HowItWorksSection = () => {
  const getColorClasses = (color: string) => {
    const colorMap: { [key: string]: { badge: string; hover: string; arrow: string } } = {
      blue: {
        badge: 'from-blue-500 to-blue-600',
        hover: 'from-blue-500/5',
        arrow: 'text-blue-400 dark:text-blue-500'
      },
      cyan: {
        badge: 'from-cyan-500 to-cyan-600',
        hover: 'from-cyan-500/5',
        arrow: 'text-cyan-400 dark:text-cyan-500'
      },
      sky: {
        badge: 'from-sky-500 to-sky-600',
        hover: 'from-sky-500/5',
        arrow: 'text-sky-400 dark:text-sky-500'
      },
      indigo: {
        badge: 'from-indigo-500 to-indigo-600',
        hover: 'from-indigo-500/5',
        arrow: 'text-indigo-400 dark:text-indigo-500'
      }
    }
    return colorMap[color] || colorMap.blue
  }

  const steps = [
    {
      number: '01',
      title: 'Register Your Library',
      description: 'Sign up and create your library profile. Add basic information, configure settings, and set up your local database.',
      icon: '🏛️',
      color: 'blue'
    },
    {
      number: '02',
      title: 'Add Members & Setup',
      description: 'Register members, configure shift plans, design seat layouts, and set up fee structures and billing rules.',
      icon: '📝',
      color: 'cyan'
    },
    {
      number: '03',
      title: 'Configure Features',
      description: 'Set up ID card templates, enquiry system, expense categories, support ticket workflows, and backup schedules.',
      icon: '⚙️',
      color: 'sky'
    },
    {
      number: '04',
      title: 'Start Managing',
      description: 'Begin managing members, collecting fees, handling enquiries, tracking expenses, and operating your library seamlessly.',
      icon: '🚀',
      color: 'indigo'
    }
  ]

  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 via-cyan-50 to-sky-50 dark:from-gray-900 dark:via-blue-900 dark:to-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 mb-4 rounded-full bg-blue-100 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800">
            <span className="text-sm font-medium text-blue-700 dark:text-blue-300">
              🎯 Simple Process
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            How{' '}
            <span className="bg-gradient-to-r from-blue-600 via-cyan-600 to-sky-600 bg-clip-text text-transparent">
              Library Saathi
            </span>{' '}
            Works
          </h2>
          <p className="text-sm sm:text-base lg:text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Get started in minutes and transform your library management experience
          </p>
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Connection Line (Desktop) */}
          <div className="hidden lg:block absolute top-24 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-200 via-cyan-200 to-sky-200 dark:from-blue-800 dark:via-cyan-800 dark:to-sky-800"></div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div
                key={index}
                className="relative group"
              >
                {/* Step Card */}
                <div className="relative bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-gray-200 dark:border-gray-700">
                  {/* Number Badge */}
                  <div className={`absolute -top-4 -left-4 w-14 h-14 rounded-full bg-gradient-to-br ${getColorClasses(step.color).badge} flex items-center justify-center text-white font-bold text-base shadow-lg transform group-hover:scale-110 transition-transform duration-300`}>
                    {step.number}
                  </div>

                  {/* Icon */}
                  <div className="text-5xl mb-4 mt-2 transform group-hover:scale-110 transition-transform duration-300">
                    {step.icon}
                  </div>

                  {/* Content */}
                  <h3 className="text-base sm:text-lg lg:text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-xs sm:text-sm lg:text-base text-gray-600 dark:text-gray-400 leading-relaxed">
                    {step.description}
                  </p>

                  {/* Hover Gradient */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${getColorClasses(step.color).hover} to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
                </div>

                {/* Arrow (Desktop, between steps) */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-24 right-0 transform translate-x-1/2 -translate-y-1/2 z-10">
                    <svg
                      className={`w-8 h-8 ${getColorClasses(step.color).arrow}`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default HowItWorksSection

