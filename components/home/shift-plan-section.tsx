'use client'

import React from 'react'

const ShiftPlanSection = () => {
  const shifts = [
    {
      name: 'Morning Shift',
      time: '8:00 AM - 12:00 PM',
      icon: '🌅',
      color: 'from-orange-400 to-amber-500',
      bgColor: 'bg-orange-50 dark:bg-orange-900/20',
      borderColor: 'border-orange-200 dark:border-orange-800'
    },
    {
      name: 'Afternoon Shift',
      time: '12:00 PM - 4:00 PM',
      icon: '☀️',
      color: 'from-yellow-400 to-orange-500',
      bgColor: 'bg-yellow-50 dark:bg-yellow-900/20',
      borderColor: 'border-yellow-200 dark:border-yellow-800'
    },
    {
      name: 'Evening Shift',
      time: '4:00 PM - 8:00 PM',
      icon: '🌆',
      color: 'from-purple-400 to-pink-500',
      bgColor: 'bg-purple-50 dark:bg-purple-900/20',
      borderColor: 'border-purple-200 dark:border-purple-800'
    },
    {
      name: 'Night Shift',
      time: '8:00 PM - 12:00 AM',
      icon: '🌙',
      color: 'from-indigo-400 to-blue-500',
      bgColor: 'bg-indigo-50 dark:bg-indigo-900/20',
      borderColor: 'border-indigo-200 dark:border-indigo-800'
    }
  ]

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 via-blue-50 to-cyan-50 dark:from-gray-900 dark:via-blue-900 dark:to-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 mb-4 rounded-full bg-blue-100 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800">
            <span className="text-sm font-medium text-blue-700 dark:text-blue-300">
              ⏰ Flexible Shift Management
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Plan Your{' '}
            <span className="bg-gradient-to-r from-blue-600 via-cyan-600 to-sky-600 bg-clip-text text-transparent">
              Library Shifts
            </span>
          </h2>
          <p className="text-sm sm:text-base lg:text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Manage multiple shifts, assign staff schedules, and optimize your library operations with our intelligent shift planning system
          </p>
        </div>

        {/* Shifts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {shifts.map((shift, index) => (
            <div
              key={index}
              className={`group relative p-6 ${shift.bgColor} rounded-2xl border-2 ${shift.borderColor} hover:shadow-xl transition-all duration-300 hover:-translate-y-2`}
            >
              {/* Gradient overlay on hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${shift.color} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-300`}></div>
              
              <div className="relative z-10">
                <div className="text-5xl mb-4 transform group-hover:scale-110 transition-transform duration-300">
                  {shift.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  {shift.name}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                  {shift.time}
                </p>
              </div>

              {/* Decorative element */}
              <div className={`absolute top-4 right-4 w-16 h-16 bg-gradient-to-br ${shift.color} opacity-0 group-hover:opacity-20 rounded-full blur-xl transition-opacity duration-300`}></div>
            </div>
          ))}
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-xl border border-gray-200 dark:border-gray-700">
            <div className="text-3xl mb-3">👥</div>
            <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Staff Assignment</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Easily assign staff members to different shifts with drag-and-drop interface
            </p>
          </div>
          <div className="p-6 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-xl border border-gray-200 dark:border-gray-700">
            <div className="text-3xl mb-3">📅</div>
            <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Calendar View</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Visual calendar to see all shifts at a glance and manage schedules efficiently
            </p>
          </div>
          <div className="p-6 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-xl border border-gray-200 dark:border-gray-700">
            <div className="text-3xl mb-3">🔄</div>
            <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Auto Rotation</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Automatic shift rotation to ensure fair distribution of work hours
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ShiftPlanSection
