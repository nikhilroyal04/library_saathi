'use client';

import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Calendar, Clock, User, Mail, Phone, MessageSquare, Send, CheckCircle } from 'lucide-react';
import { useSubdomainParams } from '@/lib/hooks/useSubdomainParams';
import { toast } from 'sonner';
import { createLead, selectLoading, selectError } from '@/lib/store/leadSlice';

interface BookNowFormProps {
  libraryName: string;
  params?: Promise<{ subdomain: string }> | { subdomain: string };
}

export default function BookNowForm({ libraryName, params }: BookNowFormProps) {
  const { subdomain } = params ? useSubdomainParams(params) : { subdomain: '' };
  const dispatch = useDispatch();
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    preferredDate: '',
    preferredTime: '',
    purpose: '',
    message: ''
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
    
    if (!subdomain) {
      toast.error('Subdomain not found. Please refresh the page.');
      return;
    }
    
    try {
      // Get default product ID
      const defaultProductId = process.env.NEXT_PUBLIC_DEFAULT_PRODUCT_ID || '';
      
      if (!defaultProductId) {
        toast.error('Product configuration missing. Please contact support.');
        console.error('NEXT_PUBLIC_DEFAULT_PRODUCT_ID is not set in environment variables');
        return;
      }

      // Validate required fields
      if (!formData.name || !formData.email || !formData.phone || !formData.preferredDate || !formData.preferredTime || !formData.purpose) {
        toast.error('Please fill in all required fields');
        return;
      }

      // Prepare lead data with all dynamic fields
      const leadData = {
        subdomain: subdomain,
        product: defaultProductId,
        // All form fields as dynamic fields
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        preferredDate: formData.preferredDate,
        preferredTime: formData.preferredTime,
        purpose: formData.purpose,
        message: formData.message || undefined,
        formType: 'book-now', // To identify which form this came from
        source: 'book-now-page'
      };

      console.log('Submitting lead data:', leadData);

      // Submit using Redux dispatch
      const result = await dispatch(createLead(leadData) as any);

      console.log('Lead creation result:', result);

      if (result && result.success) {
        setSuccessMessage('Thank you for booking! We will confirm your appointment via email shortly.');
        setFormData({
          name: '',
          email: '',
          phone: '',
          preferredDate: '',
          preferredTime: '',
          purpose: '',
          message: ''
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

  const timeSlots = [
    '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM',
    '11:00 AM', '11:30 AM', '12:00 PM', '12:30 PM',
    '01:00 PM', '01:30 PM', '02:00 PM', '02:30 PM',
    '03:00 PM', '03:30 PM', '04:00 PM', '04:30 PM',
    '05:00 PM', '05:30 PM', '06:00 PM'
  ];

  const purposes = [
    'Library Tour',
    'Membership Inquiry',
    'Book Consultation',
    'Research Assistance',
    'Facility Visit',
    'Other'
  ];

  return (
    <div className="bg-white rounded-2xl p-8 border-2 border-gray-100 shadow-lg">
      <div className="mb-6">
        <h2 className="text-2xl font-extrabold text-gray-900 mb-2">
          Schedule Your Visit
        </h2>
        <p className="text-sm text-gray-600 font-medium">
          Fill out the form below and we'll get back to you soon
        </p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label htmlFor="name" className="flex items-center gap-2 text-xs font-bold text-gray-700 mb-2">
              <User className="w-3.5 h-3.5 text-blue-600" />
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
            <label htmlFor="email" className="flex items-center gap-2 text-xs font-bold text-gray-700 mb-2">
              <Mail className="w-3.5 h-3.5 text-blue-600" />
              Email Address *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full px-3 py-2.5 rounded-lg border-2 border-gray-200 bg-gray-50 text-gray-900 text-sm font-medium focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              placeholder="john@example.com"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label htmlFor="phone" className="flex items-center gap-2 text-xs font-bold text-gray-700 mb-2">
              <Phone className="w-3.5 h-3.5 text-blue-600" />
              Phone Number *
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
          <div>
            <label htmlFor="preferredDate" className="flex items-center gap-2 text-xs font-bold text-gray-700 mb-2">
              <Calendar className="w-3.5 h-3.5 text-blue-600" />
              Preferred Date *
            </label>
            <input
              type="date"
              id="preferredDate"
              name="preferredDate"
              required
              value={formData.preferredDate}
              onChange={handleChange}
              min={new Date().toISOString().split('T')[0]}
              className="w-full px-3 py-2.5 rounded-lg border-2 border-gray-200 bg-gray-50 text-gray-900 text-sm font-medium focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label htmlFor="preferredTime" className="flex items-center gap-2 text-xs font-bold text-gray-700 mb-2">
              <Clock className="w-3.5 h-3.5 text-blue-600" />
              Preferred Time *
            </label>
            <select
              id="preferredTime"
              name="preferredTime"
              required
              value={formData.preferredTime}
              onChange={handleChange}
              className="w-full px-3 py-2.5 rounded-lg border-2 border-gray-200 bg-gray-50 text-gray-900 text-sm font-medium focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
            >
              <option value="">Select time</option>
              {timeSlots.map((time) => (
                <option key={time} value={time}>
                  {time}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="purpose" className="flex items-center gap-2 text-xs font-bold text-gray-700 mb-2">
              <MessageSquare className="w-3.5 h-3.5 text-blue-600" />
              Purpose of Visit *
            </label>
            <select
              id="purpose"
              name="purpose"
              required
              value={formData.purpose}
              onChange={handleChange}
              className="w-full px-3 py-2.5 rounded-lg border-2 border-gray-200 bg-gray-50 text-gray-900 text-sm font-medium focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
            >
              <option value="">Select purpose</option>
              {purposes.map((purpose) => (
                <option key={purpose} value={purpose}>
                  {purpose}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label htmlFor="message" className="flex items-center gap-2 text-xs font-bold text-gray-700 mb-2">
            <MessageSquare className="w-3.5 h-3.5 text-blue-600" />
            Additional Message
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows={4}
            className="w-full px-3 py-2.5 rounded-lg border-2 border-gray-200 bg-gray-50 text-gray-900 text-sm font-medium focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all resize-none"
            placeholder="Any specific requirements or questions..."
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
          className="w-full px-5 py-3 bg-gradient-to-r from-blue-600 via-cyan-600 to-sky-600 text-white font-bold rounded-lg shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm"
        >
          {loading ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              Submitting...
            </>
          ) : (
            <>
              <Send className="w-5 h-5" />
              Book Appointment
            </>
          )}
        </button>
      </form>
    </div>
  );
}

