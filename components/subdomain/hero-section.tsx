'use client';

import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BookOpen, Phone, Calendar, Clock, User, CheckCircle } from 'lucide-react';
import { toast } from 'sonner';
import { createLead, selectLoading, selectError } from '@/lib/store/leadSlice';

type LibraryDetails = {
  name?: string;
  description?: string;
  logo?: string;
  email?: string;
  phone?: string;
  address?: string;
  website?: string;
  timings?: string;
};

type HeroSectionProps = {
  libraryDetails?: LibraryDetails;
  subdomain: string;
  emoji?: string;
};

const HeroSection = ({ libraryDetails, subdomain, emoji }: HeroSectionProps) => {
  const dispatch = useDispatch();
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    startDate: '',
    additionalInformation: ''
  });

  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Auto-hide success message after 3 seconds
  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => {
        setSuccessMessage(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [successMessage]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // Get default product ID (you can configure this or fetch from API)
      // For now, using a default - you may want to fetch from library's license
      const defaultProductId = process.env.NEXT_PUBLIC_DEFAULT_PRODUCT_ID || '';
      
      if (!defaultProductId) {
        toast.error('Product configuration missing. Please contact support.');
        console.error('NEXT_PUBLIC_DEFAULT_PRODUCT_ID is not set in environment variables');
        return;
      }

      // Validate required fields
      if (!formData.name || !formData.phone || !formData.startDate) {
        toast.error('Please fill in all required fields');
        return;
      }

      // Prepare lead data with all dynamic fields
      const leadData = {
        subdomain: subdomain,
        product: defaultProductId,
        // All form fields as dynamic fields
        name: formData.name,
        email: formData.email || undefined,
        phone: formData.phone,
        startDate: formData.startDate,
        additionalInformation: formData.additionalInformation || undefined,
        formType: 'booking', // To identify which form this came from
        source: 'hero-section'
      };

      console.log('Submitting lead data:', leadData);

      // Submit using Redux dispatch
      const result = await dispatch(createLead(leadData) as any);

      console.log('Lead creation result:', result);

      if (result && result.success) {
        setSuccessMessage('Thank you for your booking request! We will contact you shortly.');
      setFormData({
        name: '',
        email: '',
        phone: '',
        startDate: '',
        additionalInformation: ''
      });
      } else {
        const errorMsg = result?.error || error || 'Failed to submit booking request';
        toast.error(errorMsg);
        console.error('Lead creation failed:', errorMsg);
      }
    } catch (error: any) {
      console.error('Error submitting form:', error);
      const errorMsg = error?.response?.data?.message || error?.message || 'Failed to submit booking request. Please try again.';
      toast.error(errorMsg);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };


  const libraryName = libraryDetails?.name || `${subdomain} Library`;
  const libraryDescription = libraryDetails?.description || 'Your trusted community library. Discover a world of knowledge, peaceful reading spaces, and excellent service for all book lovers.';

  return (
    <section className="relative py-12 md:py-16 overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 -left-20 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute bottom-20 -right-20 w-96 h-96 bg-cyan-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 items-center">
          {/* Left Column - Text and Image */}
          <div className="space-y-6">
            {/* Logo/Emoji */}
            <div className="flex items-center gap-4">
              <div>
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 leading-tight mb-1">
                  {libraryName}
                </h1>
                <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider">
                  Knowledge Hub
                </p>
              </div>
            </div>

            {/* Description */}
            <div className="space-y-3">
              <p className="text-lg md:text-xl text-gray-700 leading-relaxed font-medium">
                {libraryDescription}
              </p>
            </div>

            {/* Key Features */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <div className="flex items-center gap-2 p-3 bg-white/80 backdrop-blur-sm rounded-lg shadow-md border border-gray-100">
                <div className="p-1.5 bg-blue-100 rounded-lg">
                  <BookOpen className="w-4 h-4 text-blue-600" />
                </div>
                <div>
                  <p className="font-bold text-gray-900 text-xs">Wide Collection</p>
                  <p className="text-xs text-gray-600">1000+ Books</p>
                </div>
              </div>
              <div className="flex items-center gap-2 p-3 bg-white/80 backdrop-blur-sm rounded-lg shadow-md border border-gray-100">
                <div className="p-1.5 bg-green-100 rounded-lg">
                  <Clock className="w-4 h-4 text-green-600" />
                </div>
                <div>
                  <p className="font-bold text-gray-900 text-xs">24/7 Access</p>
                  <p className="text-xs text-gray-600">Always Open</p>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column - Booking Form */}
          <div className="lg:sticky lg:top-20 max-w-md w-full mx-auto">
            <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
              <div className="mb-5">
                <h2 className="text-2xl font-extrabold text-gray-900 mb-1">
                  Reserve Your Study Space
                </h2>
                <p className="text-sm text-gray-600 font-medium">
                  Book your preferred time slot at our library
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-xs font-bold text-gray-700 mb-1.5">
                    <User className="w-3.5 h-3.5 inline mr-1" />
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-3 py-2.5 rounded-lg border-2 border-gray-200 bg-gray-50 text-gray-900 text-sm font-medium focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                    placeholder="John Doe"
                  />
                </div>

                <div>
                  <div>
                    <label htmlFor="phone" className="block text-xs font-bold text-gray-700 mb-1.5">
                      <Phone className="w-3.5 h-3.5 inline mr-1" />
                      Mobile Number *
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-3 py-2.5 rounded-lg border-2 border-gray-200 bg-gray-50 text-gray-900 text-sm font-medium focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                      placeholder="+91 1234567890"
                    />
                  </div>
                </div>

                <div>
                  <div>
                    <label htmlFor="startDate" className="block text-xs font-bold text-gray-700 mb-1.5">
                      <Calendar className="w-3.5 h-3.5 inline mr-1" />
                      Start Date *
                    </label>
                    <input
                      type="date"
                      id="startDate"
                      name="startDate"
                      required
                      value={formData.startDate}
                      onChange={handleChange}
                      min={new Date().toISOString().split('T')[0]}
                      className="w-full px-3 py-2.5 rounded-lg border-2 border-gray-200 bg-gray-50 text-gray-900 text-sm font-medium focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="additionalInformation" className="block text-xs font-bold text-gray-700 mb-1.5">
                    Any Questions? (Optional)
                  </label>
                  <textarea
                    id="additionalInformation"
                    name="additionalInformation"
                    rows={3}
                    value={formData.additionalInformation}
                    onChange={handleChange}
                    className="w-full px-3 py-2.5 rounded-lg border-2 border-gray-200 bg-gray-50 text-gray-900 text-sm font-medium focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all resize-none"
                    placeholder="Any questions..."
                  />
                </div>

                {/* Success Message */}
                {successMessage && (
                  <div className="p-3 bg-green-50 border border-green-200 rounded-lg flex items-center gap-2 text-green-700 text-sm">
                    <CheckCircle className="w-5 h-5 flex-shrink-0" />
                    <span>{successMessage}</span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold py-3 px-5 rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed text-sm flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Submitting...
                    </>
                  ) : (
                    'Book Now'
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;