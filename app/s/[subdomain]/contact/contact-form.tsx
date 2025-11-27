'use client';

import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Mail, Phone, MessageSquare, Send, User, CheckCircle } from 'lucide-react';
import { useSubdomainParams } from '@/lib/hooks/useSubdomainParams';
import { toast } from 'sonner';
import { createLead, selectLoading, selectError } from '@/lib/store/leadSlice';

interface ContactFormProps {
  params?: Promise<{ subdomain: string }> | { subdomain: string };
}

export default function ContactForm({ params }: ContactFormProps) {
  const { subdomain } = params ? useSubdomainParams(params) : { subdomain: '' };
  const dispatch = useDispatch();
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
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
      if (!formData.name || !formData.email || !formData.subject || !formData.message) {
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
        phone: formData.phone || undefined,
        subject: formData.subject,
        message: formData.message,
        formType: 'contact', // To identify which form this came from
        source: 'contact-page'
      };

      console.log('Submitting lead data:', leadData);

      // Submit using Redux dispatch
      const result = await dispatch(createLead(leadData) as any);

      console.log('Lead creation result:', result);

      if (result && result.success) {
        setSuccessMessage('Thank you for contacting us! We will get back to you soon.');
        setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
      } else {
        const errorMsg = result?.error || error || 'Failed to submit contact form';
        toast.error(errorMsg);
        console.error('Lead creation failed:', errorMsg);
      }
    } catch (error: any) {
      console.error('Error submitting form:', error);
      const errorMsg = error?.response?.data?.message || error?.message || 'Failed to submit contact form. Please try again.';
      toast.error(errorMsg);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
      <h2 className="text-2xl font-extrabold text-gray-900 mb-6 flex items-center gap-3">
        <MessageSquare className="w-6 h-6 text-blue-600" />
        Send us a Message
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label htmlFor="name" className="block text-xs font-bold text-gray-700 mb-2">
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
            <label htmlFor="email" className="block text-xs font-bold text-gray-700 mb-2">
              <Mail className="w-3.5 h-3.5 inline mr-1" />
              Email *
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

        <div>
          <label htmlFor="phone" className="block text-xs font-bold text-gray-700 mb-2">
            <Phone className="w-3.5 h-3.5 inline mr-1" />
            Phone
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 bg-gray-50 text-gray-900 font-medium focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
            placeholder="+91 1234567890"
          />
        </div>

        <div>
          <label htmlFor="subject" className="block text-xs font-bold text-gray-700 mb-2">
            Subject *
          </label>
          <input
            type="text"
            id="subject"
            name="subject"
            required
            value={formData.subject}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 bg-gray-50 text-gray-900 font-medium focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
            placeholder="How can we help you?"
          />
        </div>

        <div>
          <label htmlFor="message" className="block text-xs font-bold text-gray-700 mb-2">
            <MessageSquare className="w-3.5 h-3.5 inline mr-1" />
            Message *
          </label>
          <textarea
            id="message"
            name="message"
            required
            rows={5}
            value={formData.message}
            onChange={handleChange}
            className="w-full px-3 py-2.5 rounded-lg border-2 border-gray-200 bg-gray-50 text-gray-900 text-sm font-medium focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all resize-none"
            placeholder="Tell us more about your inquiry..."
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
          className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-bold py-3 px-5 rounded-lg hover:from-blue-700 hover:to-cyan-700 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm"
        >
          {loading ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              Sending...
            </>
          ) : (
            <>
              <Send className="w-5 h-5" />
              Send Message
            </>
          )}
        </button>
      </form>
    </div>
  );
}

