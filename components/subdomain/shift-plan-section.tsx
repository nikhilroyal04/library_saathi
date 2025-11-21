'use client';

import React from 'react';
import { Clock, Calendar, Users, RotateCcw, Sparkles } from 'lucide-react';

const ShiftPlanSection = () => {
  const shifts = [
    {
      name: 'Morning Shift',
      time: '8:00 AM - 12:00 PM',
      icon: '🌅',
      gradient: 'from-orange-400 via-amber-400 to-yellow-400',
      bgGradient: 'from-orange-50 to-amber-50',
      borderColor: 'border-orange-200',
      textColor: 'text-orange-700',
      iconBg: 'bg-orange-100',
      iconColor: 'text-orange-600',
      shadow: 'shadow-orange-200'
    },
    {
      name: 'Afternoon Shift',
      time: '12:00 PM - 4:00 PM',
      icon: '☀️',
      gradient: 'from-yellow-400 via-orange-400 to-amber-400',
      bgGradient: 'from-yellow-50 to-orange-50',
      borderColor: 'border-yellow-200',
      textColor: 'text-yellow-700',
      iconBg: 'bg-yellow-100',
      iconColor: 'text-yellow-600',
      shadow: 'shadow-yellow-200'
    },
    {
      name: 'Evening Shift',
      time: '4:00 PM - 8:00 PM',
      icon: '🌆',
      gradient: 'from-purple-400 via-pink-400 to-rose-400',
      bgGradient: 'from-purple-50 to-pink-50',
      borderColor: 'border-purple-200',
      textColor: 'text-purple-700',
      iconBg: 'bg-purple-100',
      iconColor: 'text-purple-600',
      shadow: 'shadow-purple-200'
    },
    {
      name: 'Night Shift',
      time: '8:00 PM - 12:00 AM',
      icon: '🌙',
      gradient: 'from-indigo-400 via-blue-400 to-cyan-400',
      bgGradient: 'from-indigo-50 to-blue-50',
      borderColor: 'border-indigo-200',
      textColor: 'text-indigo-700',
      iconBg: 'bg-indigo-100',
      iconColor: 'text-indigo-600',
      shadow: 'shadow-indigo-200'
    }
  ];

  return (
    <section className="py-12 bg-gradient-to-br from-gray-50 via-blue-50/30 to-cyan-50/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center px-3 py-1.5 mb-3 rounded-full bg-gradient-to-r from-blue-100 to-cyan-100 border-2 border-blue-200">
            <Sparkles className="w-4 h-4 text-blue-600 mr-2" />
            <span className="text-xs font-bold text-blue-700 uppercase tracking-wider">
              ⏰ Shift Management
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 mb-3">
            Plan Your{' '}
            <span className="bg-gradient-to-r from-blue-600 via-cyan-600 to-sky-600 bg-clip-text text-transparent">
              Library Shifts
            </span>
          </h2>
          <p className="text-base md:text-lg text-gray-600 max-w-3xl mx-auto font-medium">
            Manage multiple shifts, assign staff schedules, and optimize your library operations with our intelligent shift planning system
          </p>
        </div>

        {/* Shifts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {shifts.map((shift, index) => (
            <div
              key={index}
              className={`group relative overflow-hidden bg-gradient-to-br ${shift.bgGradient} rounded-xl border-2 ${shift.borderColor} hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer`}
            >
              {/* Gradient overlay on hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${shift.gradient} opacity-0 group-hover:opacity-10 rounded-xl transition-opacity duration-300`}></div>
              
              {/* Decorative corner */}
              <div className={`absolute top-0 right-0 w-20 h-20 bg-gradient-to-br ${shift.gradient} opacity-0 group-hover:opacity-20 rounded-bl-full transition-opacity duration-300`}></div>
              
              <div className="relative p-5">
                {/* Icon */}
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-xl ${shift.iconBg} group-hover:scale-110 transition-transform duration-300`}>
                    <span className="text-4xl">{shift.icon}</span>
                  </div>
                  <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${shift.gradient} opacity-60 group-hover:opacity-100 transition-opacity`}></div>
                </div>

                {/* Content */}
                <div>
                  <h3 className="text-lg font-extrabold text-gray-900 mb-2 group-hover:scale-105 transition-transform duration-300">
                    {shift.name}
                  </h3>
                  <div className="flex items-center gap-2">
                    <Clock className={`w-4 h-4 ${shift.iconColor}`} />
                    <span className={`text-sm font-bold ${shift.textColor}`}>
                      {shift.time}
                    </span>
                  </div>
                </div>

                {/* Bottom accent line */}
                <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${shift.gradient} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left`}></div>
              </div>
            </div>
          ))}
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="group p-6 bg-white rounded-xl border-2 border-gray-100 hover:border-blue-300 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
            <div className="w-14 h-14 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
              <Users className="w-7 h-7 text-blue-600" />
            </div>
            <h4 className="text-lg font-extrabold text-gray-900 mb-2">Staff Assignment</h4>
            <p className="text-sm text-gray-600 font-medium leading-relaxed">
              Easily assign staff members to different shifts with drag-and-drop interface
            </p>
          </div>
          
          <div className="group p-6 bg-white rounded-xl border-2 border-gray-100 hover:border-green-300 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
            <div className="w-14 h-14 bg-gradient-to-br from-green-100 to-emerald-100 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
              <Calendar className="w-7 h-7 text-green-600" />
            </div>
            <h4 className="text-lg font-extrabold text-gray-900 mb-2">Calendar View</h4>
            <p className="text-sm text-gray-600 font-medium leading-relaxed">
              Visual calendar to see all shifts at a glance and manage schedules efficiently
            </p>
          </div>
          
          <div className="group p-6 bg-white rounded-xl border-2 border-gray-100 hover:border-purple-300 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
            <div className="w-14 h-14 bg-gradient-to-br from-purple-100 to-pink-100 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
              <RotateCcw className="w-7 h-7 text-purple-600" />
            </div>
            <h4 className="text-lg font-extrabold text-gray-900 mb-2">Auto Rotation</h4>
            <p className="text-sm text-gray-600 font-medium leading-relaxed">
              Automatic shift rotation to ensure fair distribution of work hours
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ShiftPlanSection;