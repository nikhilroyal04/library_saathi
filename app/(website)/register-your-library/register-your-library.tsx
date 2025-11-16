'use client'

import React, { useState } from 'react'

const RegisterYourLibrary = () => {
  const [formData, setFormData] = useState({
    libraryName: '',
    ownerName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    libraryType: '',
    memberCount: '',
    description: ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Registration submitted:', formData)
    alert('Thank you for registering! We will contact you soon to set up your library.')
    setFormData({
      libraryName: '',
      ownerName: '',
      email: '',
      phone: '',
      address: '',
      city: '',
      state: '',
      pincode: '',
      libraryType: '',
      memberCount: '',
      description: ''
    })
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-cyan-50 dark:from-gray-900 dark:via-slate-900 dark:to-gray-800">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-blue-600 via-cyan-600 to-sky-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center px-4 py-2 mb-6 rounded-full bg-white/20 backdrop-blur-sm border border-white/30">
            <span className="text-sm sm:text-base font-medium text-white">
              🏛️ Get Started Today
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold text-white mb-4">
            Register Your Library
          </h1>
          <p className="text-sm sm:text-base lg:text-lg text-blue-50 max-w-3xl mx-auto">
            Join hundreds of libraries using Library Saathi. Fill out the form below and we&apos;ll help you get started.
          </p>
        </div>
      </section>

      {/* Registration Form */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Library Information
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="libraryName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Library Name *
                </label>
                <input
                  type="text"
                  id="libraryName"
                  name="libraryName"
                  required
                  value={formData.libraryName}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="Enter your library name"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="ownerName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Owner/Manager Name *
                  </label>
                  <input
                    type="text"
                    id="ownerName"
                    name="ownerName"
                    required
                    value={formData.ownerName}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="Full name"
                  />
                </div>
                <div>
                  <label htmlFor="libraryType" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Library Type *
                  </label>
                  <select
                    id="libraryType"
                    name="libraryType"
                    required
                    value={formData.libraryType}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  >
                    <option value="">Select type</option>
                    <option value="public">Public Library</option>
                    <option value="private">Private Library</option>
                    <option value="academic">Academic Library</option>
                    <option value="corporate">Corporate Library</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="library@example.com"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="+91 1234567890"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="address" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Address *
                </label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  required
                  value={formData.address}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="Street address"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div>
                  <label htmlFor="city" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    City *
                  </label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    required
                    value={formData.city}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="City"
                  />
                </div>
                <div>
                  <label htmlFor="state" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    State *
                  </label>
                  <input
                    type="text"
                    id="state"
                    name="state"
                    required
                    value={formData.state}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="State"
                  />
                </div>
                <div>
                  <label htmlFor="pincode" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Pincode *
                  </label>
                  <input
                    type="text"
                    id="pincode"
                    name="pincode"
                    required
                    value={formData.pincode}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="110001"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="memberCount" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Expected Member Count
                </label>
                <input
                  type="number"
                  id="memberCount"
                  name="memberCount"
                  value={formData.memberCount}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="Approximate number of members"
                />
              </div>

              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Additional Information
                </label>
                <textarea
                  id="description"
                  name="description"
                  rows={4}
                  value={formData.description}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                  placeholder="Tell us more about your library..."
                />
              </div>

              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  id="terms"
                  required
                  className="mt-1 w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <label htmlFor="terms" className="text-sm text-gray-600 dark:text-gray-400">
                  I agree to the <a href="/terms" className="text-blue-600 dark:text-blue-400 hover:underline">Terms and Conditions</a> and <a href="/privacy" className="text-blue-600 dark:text-blue-400 hover:underline">Privacy Policy</a> *
                </label>
              </div>

              <button
                type="submit"
                className="w-full px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
              >
                Register Library
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  )
}

export default RegisterYourLibrary

